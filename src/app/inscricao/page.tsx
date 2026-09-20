import type { Metadata } from "next";
import InscricaoClient from "./InscricaoClient";

export const metadata: Metadata = {
  title: "Bilhetes — FIVAA",
  description:
    "Consulte as modalidades e preços do FIVAA 2026. A venda será realizada na Ticket.ao; informações sobre a abertura disponíveis junto da equipa.",
};

export default function InscricaoPage() {
  return <InscricaoClient />;
}
