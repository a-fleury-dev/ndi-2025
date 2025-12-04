import type { Route } from "./+types/home";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { Footer } from "../components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NIRD - Numérique Inclusif Responsable Durable" },
    { name: "description", content: "Association dédiée à promouvoir un numérique plus inclusif, responsable et durable pour tous." },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <Footer />
    </div>
  );
}
