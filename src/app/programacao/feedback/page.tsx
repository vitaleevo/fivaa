import type { Metadata } from "next";
import FeedbackContent from "./FeedbackContent";

export const metadata: Metadata = {
  title: "Sessões de Feedback — FIVAA",
  description:
    "Sessões de crítica construtiva semanais do FIVAA para crescimento artístico.",
};

export default function ProgramacaoFeedback() {
  return <FeedbackContent />;
}
