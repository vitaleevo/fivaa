import type { Metadata } from "next";
import EducacaoWorkshopsContent from "./EducacaoWorkshopsContent";

export const metadata: Metadata = {
  title: "Workshops Educacionais — FIVAA",
  description:
    "Workshops interativos do FIVAA para aprendizagem prática.",
};

export default function EducacaoWorkshops() {
  return <EducacaoWorkshopsContent />;
}
