export const contactEmail = "geral@fivaaforum.com";

export function ticketDestination(configuredUrl: string | undefined, name: string) {
  try {
    const url = new URL(configuredUrl?.trim() ?? "");
    if (url.protocol === "https:" && !url.username && !url.password) {
      return { purchaseUrl: url.href, isOnlinePurchase: true };
    }
  } catch {
    // A missing or invalid ticket URL must still leave visitors a way to contact us.
  }
  return {
    purchaseUrl: `mailto:${contactEmail}?subject=${encodeURIComponent(`FIVAA 2026 — ${name}`)}&body=${encodeURIComponent(`Olá! Gostaria de obter informações para adquirir ${name} para o FIVAA 2026.`)}`,
    isOnlinePurchase: false,
  };
}

export const socialLinks = [
  { network: "Instagram", href: "https://www.instagram.com/fivaaforum" },
  { network: "Facebook", href: "https://www.facebook.com/fivaaforum" },
  { network: "LinkedIn", href: "https://www.linkedin.com/company/fivaa" },
] as const;

export const ticketModes = [
  {
    id: "forums",
    name: "Acesso Fóruns",
    period: "1.º ou 2.º dia",
    price: "3.000 AKZ",
    description: "Acesso a todos os workshops, showcases, palestras, exposições e masterclasses programados para o dia escolhido.",
    ...ticketDestination(process.env.NEXT_PUBLIC_TICKET_URL_FORUMS, "Acesso Fóruns"),
  },
  {
    id: "concerts",
    name: "Acesso Concertos",
    period: "1.º ou 2.º dia",
    price: "5.000 AKZ",
    description: "Acesso a todas as apresentações musicais programadas para o dia escolhido.",
    ...ticketDestination(process.env.NEXT_PUBLIC_TICKET_URL_CONCERTS, "Acesso Concertos"),
  },
  {
    id: "total",
    name: "Acesso Total",
    period: "1.º e 2.º dia",
    price: "14.000 AKZ",
    description: "Acesso a todos os workshops, showcases, palestras, exposições, masterclasses e apresentações musicais dos dois dias do evento.",
    ...ticketDestination(process.env.NEXT_PUBLIC_TICKET_URL_TOTAL, "Acesso Total"),
  },
] as const;
