import type { Route } from "./+types/women";
import { PageLayout } from "../components/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Les Femmes dans l'Informatique - NIRD" },
    { name: "description", content: "Promotion des femmes dans l'informatique" },
  ];
}

export default function Women() {
  return (
    <PageLayout
      title="Les Femmes dans l'Informatique"
      gradientFrom="from-[#F12FFD]"
      gradientVia="via-[#F9A8D4]"
      titleColor="text-[#F12FFD]"
    >
      <p>
        Cette section est dédiée à la promotion des femmes dans l'informatique.
      </p>
      <p className="text-gray-500 text-center mt-8">
        🚧 Contenu à développer par votre équipe 🚧
      </p>
    </PageLayout>
  );
}

