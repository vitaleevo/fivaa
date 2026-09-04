export function EventJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "FIVAA 2026 — Fórum Internacional da Valorização da Arte Africana",
    alternateName: "FIVAA Luanda 2026",
    description:
      "Fórum Internacional dedicado à promoção, valorização e desenvolvimento das indústrias criativas e da arte africana no emblemático Palácio de Ferro em Luanda, Angola.",
    startDate: "2026-11-20T09:00:00+01:00",
    endDate: "2026-11-21T21:00:00+01:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    location: [
      {
        "@type": "Place",
        name: "Palácio de Ferro",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Rua Major Kanhangulo",
          addressLocality: "Luanda",
          addressRegion: "Luanda",
          addressCountry: "AO",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -8.8149,
          longitude: 13.2302,
        },
      },
    ],
    image: [
      "https://fivaa.com/images/hero/fivaa-forum-hero.webp",
      "https://fivaa.com/images/hero/fivaa-junte-se.webp",
      "https://fivaa.com/images/logo-fivaa-principal.png",
    ],
    organizer: {
      "@type": "Organization",
      name: "FIVAA — Fórum Internacional para a Valorização da Arte Africana",
      url: "https://fivaa.com",
      logo: "https://fivaa.com/images/logo-fivaa-principal.png",
      sameAs: [
        "https://www.instagram.com/fivaaforum",
        "https://www.facebook.com/fivaaforum",
        "https://www.linkedin.com/company/fivaa",
      ],
    },
    offers: [
      {
        "@type": "Offer",
        name: "Acesso Fóruns",
        url: "https://fivaa.com/inscricao",
        price: "3000",
        priceCurrency: "AOA",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01T00:00:00+01:00",
      },
      {
        "@type": "Offer",
        name: "Acesso Concertos",
        url: "https://fivaa.com/inscricao",
        price: "5000",
        priceCurrency: "AOA",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01T00:00:00+01:00",
      },
      {
        "@type": "Offer",
        name: "Acesso Total",
        url: "https://fivaa.com/inscricao",
        price: "14000",
        priceCurrency: "AOA",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01T00:00:00+01:00",
      },
    ],
    performer: {
      "@type": "PerformingGroup",
      name: "Artistas, Palestrantes e Criadores Africanos",
    },
    inLanguage: ["pt-AO", "pt", "en", "fr"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FIVAA",
    legalName: "Fórum Internacional para a Valorização da Arte Africana",
    url: "https://fivaa.com",
    logo: "https://fivaa.com/images/logo-fivaa-principal.png",
    description:
      "Organização dedicada à promoção, preservação e desenvolvimento da arte e cultura africana a nível global.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Luanda",
      addressCountry: "AO",
    },
    sameAs: [
      "https://www.instagram.com/fivaaforum",
      "https://www.facebook.com/fivaaforum",
      "https://www.linkedin.com/company/fivaa",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: "https://fivaa.com/contactos",
      availableLanguage: ["Portuguese", "English", "French"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
