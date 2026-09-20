"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translatePublicCopy } from "@/lib/i18n/public-copy";

const ignoredElements = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"]);
const translatedAttributes = ["placeholder", "title", "aria-label"] as const;

export function PublicContentTranslator() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const textSources = useRef(new WeakMap<Text, string>());
  const attributeSources = useRef(new WeakMap<Element, Map<string, string>>());
  const titleSource = useRef<{ pathname: string; value: string } | null>(null);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-public-content]");
    if (!root) return;

    const translateText = (node: Text, source?: string) => {
      const parent = node.parentElement;
      if (!parent || ignoredElements.has(parent.tagName) || parent.closest("[data-no-translate]")) return;
      const original = source ?? textSources.current.get(node) ?? node.data;
      textSources.current.set(node, original);
      const leading = original.match(/^\s*/)?.[0] ?? "";
      const trailing = original.match(/\s*$/)?.[0] ?? "";
      const end = trailing.length ? original.length - trailing.length : original.length;
      const core = original.slice(leading.length, end);
      const translated = translatePublicCopy(core, language);
      if (node.data !== `${leading}${translated}${trailing}`) node.data = `${leading}${translated}${trailing}`;
    };

    const translateElement = (element: Element) => {
      let stored = attributeSources.current.get(element);
      if (!stored) {
        stored = new Map();
        attributeSources.current.set(element, stored);
      }
      for (const attribute of translatedAttributes) {
        const current = element.getAttribute(attribute);
        if (current === null) continue;
        const original = stored.get(attribute) ?? current;
        stored.set(attribute, original);
        element.setAttribute(attribute, translatePublicCopy(original, language));
      }
    };

    const translateTree = (start: Node) => {
      if (start.nodeType === Node.TEXT_NODE) {
        translateText(start as Text);
        return;
      }
      if (start.nodeType !== Node.ELEMENT_NODE) return;
      const element = start as Element;
      if (ignoredElements.has(element.tagName) || element.closest("[data-no-translate]")) return;
      translateElement(element);
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        if (node.nodeType === Node.TEXT_NODE) translateText(node as Text);
        else translateElement(node as Element);
        node = walker.nextNode();
      }
    };

    document.documentElement.lang = language;
    if (titleSource.current?.pathname !== pathname) {
      titleSource.current = { pathname, value: document.title };
    }
    document.title = translatePublicCopy(titleSource.current.value, language);
    translateTree(root);

    const observer = new MutationObserver((mutations) => {
      observer.disconnect();
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          const text = mutation.target as Text;
          translateText(text, text.data);
        } else {
          mutation.addedNodes.forEach(translateTree);
        }
      }
      observer.observe(root, { childList: true, characterData: true, subtree: true });
    });
    observer.observe(root, { childList: true, characterData: true, subtree: true });

    return () => observer.disconnect();
  }, [language, pathname]);

  return null;
}
