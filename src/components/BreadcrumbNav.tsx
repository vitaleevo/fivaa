"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbNavItem {
  label: string;
  href?: string;
}

export default function BreadcrumbNav({ items }: { items: BreadcrumbNavItem[] }) {
  const { t } = useLanguage();

  return (
    <Breadcrumb className="font-montserrat text-sm">
      <BreadcrumbList className="text-white/65">
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/" className="text-white/70 transition-colors hover:text-gold" />}>
            {t.nav.home}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((item) => (
          <React.Fragment key={item.label}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink render={<Link href={item.href} className="text-white/70 transition-colors hover:text-gold" />}>
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="font-bold text-white">
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
