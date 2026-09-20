import type { Metadata } from "next";
import ContactosContent from "./ContactosContent";

export const metadata: Metadata = {
  title: "Contactos — FIVAA",
  description:
    "Entre em contacto com a equipa do FIVAA. Estamos em Luanda, Angola.",
};

export default function Contactos() {
  return <ContactosContent />;
}
