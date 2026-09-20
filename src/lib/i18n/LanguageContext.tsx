"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { commonTranslations, type CommonTranslations } from "./sections/common";
import { homeTranslations, type HomeTranslations } from "./sections/home";
import { oradoresTranslations, type OradoresTranslations } from "./sections/oradores";
import { formsTranslations, type FormsTranslations } from "./sections/forms";
import { contactosTranslations, type ContactosTranslations } from "./sections/contactos";

export type Language = "pt" | "en" | "fr";

export interface Translations {
  nav: {
    home: string;
    about: string;
    aboutOverview: string;
    aboutObjectives: string;
    aboutImpact: string;
    aboutHistory: string;
    schedule: string;
    workshops: string;
    lectures: string;
    exhibitions: string;
    mentorship: string;
    courses: string;
    challenges: string;
    feedback: string;
    festival: string;
    education: string;
    resources: string;
    certifications: string;
    speakers: string;
    partners: string;
    partnerBenefits: string;
    howToBePartner: string;
    testimonials: string;
    contacts: string;
    register: string;
  };
  home: HomeTranslations;
  oradores: OradoresTranslations;
  common: CommonTranslations;
  forms: FormsTranslations;
  contactos: ContactosTranslations;
  cookies: {
    title: string;
    text: string;
    acceptAll: string;
    necessaryOnly: string;
    privacyPolicy: string;
  };
  footer: {
    desc: string;
    links: string;
    contact: string;
    social: string;
    socialText: string;
    privacy: string;
    terms: string;
    rights: string;
  };
}

export const translations: Record<Language, Translations> = {
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      aboutOverview: "Visão Geral",
      aboutObjectives: "Objetivos",
      aboutImpact: "Impacto",
      aboutHistory: "História",
      schedule: "Programação",
      workshops: "Workshops",
      lectures: "Palestras",
      exhibitions: "Exposições",
      mentorship: "Mentoria",
      courses: "Cursos",
      challenges: "Desafios",
      feedback: "Feedback",
      festival: "Festival",
      education: "Educação",
      resources: "Recursos",
      certifications: "Certificações",
      speakers: "Oradores",
      partners: "Parceiros",
      partnerBenefits: "Benefícios",
      howToBePartner: "Como Ser Parceiro",
      testimonials: "Testemunhos",
      contacts: "Contactos",
      register: "Bilhetes",
    },
    home: homeTranslations.pt,
    oradores: oradoresTranslations.pt,
    common: commonTranslations.pt,
    forms: formsTranslations.pt,
    contactos: contactosTranslations.pt,
    cookies: {
      title: "Privacidade e Gestão de Cookies",
      text: "Utilizamos cookies e tecnologias semelhantes em conformidade com a Lei de Proteção de Dados Pessoais de Angola (Lei n.º 22/11) e normas internacionais (GDPR/LGPD) para melhorar a sua experiência de navegação.",
      acceptAll: "Aceitar Todos",
      necessaryOnly: "Apenas Necessários",
      privacyPolicy: "Política de Privacidade",
    },
    footer: {
      desc: "Plataforma internacional dedicada à promoção, valorização e desenvolvimento das indústrias criativas africanas.",
      links: "Links",
      contact: "Contacto",
      social: "Redes Sociais",
      socialText: "Siga o FIVAA nas redes sociais.",
      privacy: "Política de Privacidade (Lei 22/11)",
      terms: "Termos de Uso",
      rights: "FIVAA — Fórum Internacional da Valorização da Arte Africana. Todos os direitos reservados.",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      aboutOverview: "Overview",
      aboutObjectives: "Objectives",
      aboutImpact: "Impact",
      aboutHistory: "History",
      schedule: "Schedule",
      workshops: "Workshops",
      lectures: "Lectures",
      exhibitions: "Exhibitions",
      mentorship: "Mentorship",
      courses: "Courses",
      challenges: "Challenges",
      feedback: "Feedback",
      festival: "Festival",
      education: "Education",
      resources: "Resources",
      certifications: "Certifications",
      speakers: "Speakers",
      partners: "Partners",
      partnerBenefits: "Benefits",
      howToBePartner: "Become a Partner",
      testimonials: "Testimonials",
      contacts: "Contact",
      register: "Tickets",
    },
    home: homeTranslations.en,
    oradores: oradoresTranslations.en,
    common: commonTranslations.en,
    forms: formsTranslations.en,
    contactos: contactosTranslations.en,
    cookies: {
      title: "Privacy & Cookie Management",
      text: "We use cookies and similar technologies in compliance with Angola's Personal Data Protection Law (Law No. 22/11) and international standards (GDPR/LGPD) to provide the best browsing experience.",
      acceptAll: "Accept All",
      necessaryOnly: "Necessary Only",
      privacyPolicy: "Privacy Policy",
    },
    footer: {
      desc: "International platform dedicated to the promotion, valorization, and development of African creative industries.",
      links: "Links",
      contact: "Contact",
      social: "Social Media",
      socialText: "Follow FIVAA on social networks.",
      privacy: "Privacy Policy (Law 22/11 & GDPR)",
      terms: "Terms of Use",
      rights: "FIVAA — International Forum for the Appreciation of African Art. All rights reserved.",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      aboutOverview: "Vue d'ensemble",
      aboutObjectives: "Objectifs",
      aboutImpact: "Impact",
      aboutHistory: "Histoire",
      schedule: "Programme",
      workshops: "Ateliers",
      lectures: "Conférences",
      exhibitions: "Expositions",
      mentorship: "Mentorat",
      courses: "Formations",
      challenges: "Défis",
      feedback: "Retours",
      festival: "Festival",
      education: "Éducation",
      resources: "Ressources",
      certifications: "Certifications",
      speakers: "Intervenants",
      partners: "Partenaires",
      partnerBenefits: "Avantages",
      howToBePartner: "Devenir Partenaire",
      testimonials: "Témoignages",
      contacts: "Contact",
      register: "Billets",
    },
    home: homeTranslations.fr,
    oradores: oradoresTranslations.fr,
    common: commonTranslations.fr,
    forms: formsTranslations.fr,
    contactos: contactosTranslations.fr,
    cookies: {
      title: "Confidentialité et Gestion des Cookies",
      text: "Nous utilisons des cookies conformément à la loi angolaise sur la protection des données (Loi n° 22/11) et aux normes internationales (RGPD/LGPD) pour améliorer votre expérience.",
      acceptAll: "Tout Accepter",
      necessaryOnly: "Uniquement Nécessaires",
      privacyPolicy: "Politique de Confidentialité",
    },
    footer: {
      desc: "Plateforme internationale dédiée à la promotion, valorisation et développement des industries créatives africaines.",
      links: "Liens",
      contact: "Contact",
      social: "Réseaux Sociaux",
      socialText: "Suivez le FIVAA sur les réseaux sociaux.",
      privacy: "Politique de Confidentialité (Loi 22/11 & RGPD)",
      terms: "Conditions d'Utilisation",
      rights: "FIVAA — Forum International de Valorisation de l'Art Africain. Tous droits réservés.",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "pt",
  setLanguage: () => {},
  t: translations.pt,
});

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "pt";
  try {
    const saved = localStorage.getItem("fivaa_lang") as Language | null;
    if (saved && (saved === "pt" || saved === "en" || saved === "fr")) {
      return saved;
    }
    const browserLanguages = navigator.languages || [navigator.language];
    for (const lang of browserLanguages) {
      const lower = lang.toLowerCase();
      if (lower.startsWith("pt")) return "pt";
      if (lower.startsWith("fr")) return "fr";
      if (lower.startsWith("en")) return "en";
    }
  } catch {
    // fallback
  }
  return "pt";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // The first client render must match the server render. Browser preferences
  // are applied only after hydration, otherwise React receives PT from the
  // server and a saved EN/FR value from the browser for the same tree.
  const [language, setLanguageState] = useState<Language>("pt");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLanguageState(getInitialLanguage());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      document.documentElement.lang = language === "pt" ? "pt-AO" : language;
    } catch {
      // ignore
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("fivaa_lang", lang);
      document.documentElement.lang = lang === "pt" ? "pt-AO" : lang;
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language] || translations.pt,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
