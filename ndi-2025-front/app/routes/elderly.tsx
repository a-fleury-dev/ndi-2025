import type { Route } from "./+types/elderly";
import { PageLayout } from "../components/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Inclusion des Personnes Âgées - NIRD" },
    { name: "description", content: "Inclusion numérique des personnes âgées" },
  ];
}

export default function Elderly() {
  return (
    <PageLayout
      title="Inclusion des Personnes Âgées"
      gradientFrom="from-[#9F33E6]"
      gradientVia="via-[#C084FC]"
      titleColor="text-[#9F33E6]"
    >
      <p>
        Cette section est dédiée à l'inclusion numérique des personnes âgées.
      </p>
      <p className="text-gray-500 text-center mt-8">
        🚧 Contenu à développer par votre équipe 🚧
      </p>
    </PageLayout>
  );
}

