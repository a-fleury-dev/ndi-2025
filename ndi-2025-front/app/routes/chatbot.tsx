import type { Route } from "./+types/chatbot";
import { PageLayout } from "../components/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chatbot Trompe - NIRD" },
    { name: "description", content: "Chatbot de sensibilisation" },
  ];
}

export default function Chatbot() {
  return (
    <PageLayout
      title="Chatbot Trompe"
      gradientFrom="from-[#FFD700]"
      gradientVia="via-[#FDE68A]"
      titleColor="text-[#F59E0B]"
    >
      <p>
        Cette section est dédiée au chatbot de sensibilisation.
      </p>
      <p className="text-gray-500 text-center mt-8">
        🚧 Contenu à développer par votre équipe 🚧
      </p>
    </PageLayout>
  );
}

