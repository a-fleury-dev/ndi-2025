import type { Route } from "./+types/reconditioning";
import Page3D from "~/pages/Page3D";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Les Enjeux du Reconditionnement - NIRD" },
    { name: "description", content: "Enjeux environnementaux du reconditionnement" },
  ];
}

export default function Reconditioning() {
  return (
    <Page3D />
  );
}

