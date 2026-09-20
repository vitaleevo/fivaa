import type { Metadata } from "next";
import ObjetivosContent from "./ObjetivosContent";

export const metadata: Metadata = {
  title: "Objetivos — FIVAA",
  description:
    "Objetivos principais e o que o FIVAA oferece aos artistas africanos.",
};

export default function SobreObjetivos() {
  return <ObjetivosContent />;
}
