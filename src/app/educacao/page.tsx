import type { Metadata } from "next";
import EducacaoContent from "./EducacaoContent";

export const metadata: Metadata = {
  title: "Educação — FIVAA",
  description: "Programas educativos do FIVAA para desenvolvimento artístico.",
};

export default function EducacaoPage() {
  return <EducacaoContent />;
}
