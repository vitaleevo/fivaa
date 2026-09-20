import type { Metadata } from "next";
import OradoresContent from "./OradoresContent";

export const metadata: Metadata = {
  title: "Oradores — FIVAA",
  description:
    "Conheça os oradores, artistas e palestrantes do FIVAA 2026.",
};

export default function Oradores() {
  return <OradoresContent />;
}
