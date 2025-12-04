import type { Route } from "./+types/reconditioning";
import { PageLayout } from "../components/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Les Enjeux du Reconditionnement - NIRD" },
    { name: "description", content: "Enjeux environnementaux du reconditionnement" },
  ];
}

export default function Reconditioning() {
  return (
    <PageLayout
      title="Les Enjeux du Reconditionnement"
      gradientFrom="from-[#0A83CE]"
      gradientVia="via-[#7DD3FC]"
      titleColor="text-[#0A83CE]"
    >
      <p>
        Cette section est dédiée aux enjeux environnementaux du reconditionnement.
      </p>
      <p className="text-gray-500 text-center mt-8">
        🚧 Contenu à développer par votre équipe 🚧
      </p>
    </PageLayout>
  );
}

