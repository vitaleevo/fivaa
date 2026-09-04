export const contactEmail = "geral@fivaaforum.com";

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
    purchaseUrl: process.env.NEXT_PUBLIC_TICKET_URL_FORUMS ?? "",
  },
  {
    id: "concerts",
    name: "Acesso Concertos",
    period: "1.º ou 2.º dia",
    price: "5.000 AKZ",
    description: "Acesso a todas as apresentações musicais programadas para o dia escolhido.",
    purchaseUrl: process.env.NEXT_PUBLIC_TICKET_URL_CONCERTS ?? "",
  },
  {
    id: "total",
    name: "Acesso Total",
    period: "1.º e 2.º dia",
    price: "14.000 AKZ",
    description: "Acesso a todos os workshops, showcases, palestras, exposições, masterclasses e apresentações musicais dos dois dias do evento.",
    purchaseUrl: process.env.NEXT_PUBLIC_TICKET_URL_TOTAL ?? "",
  },
] as const;
