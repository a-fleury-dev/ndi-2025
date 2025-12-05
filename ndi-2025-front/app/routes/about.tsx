import type { Route } from "./+types/about";
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "À propos - NIRD" },
    { name: "description", content: "En savoir plus sur l'association NIRD" },
  ];
}

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3A36C3] via-[#9F33E6] to-[#F12FFD] flex flex-col p-8">
      <Link
        to="/"
        className="flex items-center gap-2 text-white hover:text-[#F7DA38] transition-colors duration-300 group mb-8"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        <span>Retour</span>
      </Link>

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/30 max-w-4xl">
          <div className="flex items-center gap-8 mb-8">
            <img src="/nird-logo.png" alt="NIRD" className="w-48 h-auto" />
            <div>
              <h1 className="text-white mb-4 text-4xl font-bold">À propos de NIRD</h1>
              <p className="text-[#F7DA38] text-xl">
                Numérique Inclusif, Responsable et Durable
              </p>
            </div>
          </div>

          <div className="space-y-6 text-white/90">
            <p>
              NIRD est une association dédiée à promouvoir un numérique plus inclusif,
              responsable et durable pour tous.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-[#F12FFD] mb-3 text-xl font-semibold">Inclusif</h3>
                <p className="text-white/80">
                  Rendre le numérique accessible à tous, sans exclusion.
                </p>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-[#0A83CE] mb-3 text-xl font-semibold">Responsable</h3>
                <p className="text-white/80">
                  Promouvoir une utilisation éthique et réfléchie des technologies.
                </p>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-[#F7DA38] mb-3 text-xl font-semibold">Durable</h3>
                <p className="text-white/80">
                  Réduire l'impact environnemental du numérique.
                </p>
              </div>

              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-[#9F33E6] mb-3 text-xl font-semibold">Nuit de l'Info 2025</h3>
                <p className="text-white/80">
                  Ce site a été créé dans le cadre de la Nuit de l'Info 2025.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

