import { useState } from 'react';
import type { Route } from "./+types/women";
import { PageLayout } from "../components/PageLayout";
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Les Femmes dans l'Informatique - NIRD" },
    { name: "description", content: "Promotion des femmes dans l'informatique" },
  ];
}

export default function Women() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const flyers = Array.from({ length: 10 }, (_, i) => `/flyers/${i + 1}.png`);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % flyers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + flyers.length) % flyers.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <style>{`
        @keyframes gradient-animation {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .gradient-text {
          background: linear-gradient(90deg, #F12FFD, #9F33E6, #F12FFD, #9F33E6);
          background-size: 200% 200%;
          animation: gradient-animation 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 30px) scale(1.1); }
          66% { transform: translate(20px, -20px) scale(0.9); }
        }
      `}</style>

      {/* Menu de navigation - Dans la bande latérale gauche */}
      <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-50 bg-white/20 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white/30 w-48">
        <h3 className="text-xs font-semibold text-white mb-3 uppercase tracking-wide drop-shadow-lg">Sommaire</h3>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => scrollToSection('flyers')}
              className="text-sm text-white hover:text-white/80 transition-colors text-left w-full flex items-center gap-2 group"
            >
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform"></div>
                <div className="w-px h-4 bg-white/40"></div>
              </div>
              <span className="leading-tight drop-shadow">Flyers des chiffres clés</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('frise')}
              className="text-sm text-white hover:text-white/80 transition-colors text-left w-full flex items-center gap-2 group"
            >
              <div className="flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform"></div>
              </div>
              <span className="leading-tight drop-shadow">Frise chronologique</span>
            </button>
          </li>
        </ul>
      </nav>

      <PageLayout
        title="FEMMES & INFORMATIQUE"
        gradientFrom="from-[#FF1B8D]"
        gradientVia="via-[#C77DFF]"
        titleColor="text-[#F12FFD]"
        hideTitle={true}
        liquidGlassHeader={true}
        transparentContent={true}
      >
        {/* Bannière de titre sticky en haut */}
        <div className="sticky top-16 z-50 bg-white/20 backdrop-blur-md shadow-lg border border-white/30 -mx-8 px-8 py-6 mb-8 rounded-2xl mx-4">
          {/* Titre principal avec gradient animé */}
          <h1 className="text-5xl font-bold mb-2 text-center gradient-text">
            FEMMES & INFORMATIQUE
          </h1>

          {/* Sous-titre */}
          <p className="text-lg text-center text-white drop-shadow-lg italic font-semibold">
            Un héritage oublié : pourquoi les femmes ont disparu du numérique ?
          </p>
        </div>

        <div className="w-full mx-auto">

        {/* Carousel de flyers */}
        <div id="flyers" className="mb-16 flex flex-col items-center scroll-mt-24">
          <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">
            Quelques chiffres clés
          </h2>

          <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center px-8 py-6">
            {/* Image Container */}
            <div className="relative w-full rounded-lg shadow-2xl overflow-hidden flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20" style={{ height: '700px' }}>
              <img
                src={flyers[currentSlide]}
                alt={`Flyer ${currentSlide + 1}`}
                className="max-w-full max-h-full object-contain"
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 rounded-full p-3 shadow-lg transition-all hover:scale-110"
                aria-label="Flyer précédent"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 rounded-full p-3 shadow-lg transition-all hover:scale-110"
                aria-label="Flyer suivant"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-10 relative">
              {/* Rectangle avec bords arrondis en arrière-plan */}
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full -mx-4 -my-2"></div>
              {flyers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all relative z-10 ${
                    index === currentSlide
                      ? 'bg-white w-8'
                      : 'bg-white/40 w-3 hover:bg-white/60'
                  }`}
                  aria-label={`Aller au flyer ${index + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <p className="text-center mt-6 text-white font-semibold drop-shadow-lg">
              {currentSlide + 1} / {flyers.length}
            </p>
          </div>
        </div>

        {/* Frise chronologique interactive */}
        <div id="frise" className="mb-12 scroll-mt-24">
          <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">
            Petit point d'histoire : cliquez pour faire apparaître les noms de ces figures féminines
          </h2>

          <div className="w-full rounded-lg overflow-hidden shadow-2xl border border-[#F12FFD]/20">
            <div style={{ position: 'relative', paddingBottom: '75%', paddingTop: 0, height: 0 }}>
              <iframe
                title="1989 – … Grandes figures féminines de l'informatique"
                width="1200"
                height="675"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                src="https://view.genially.com/693207046c159accb7ecc690"
                allowFullScreen={true}
              />
            </div>
          </div>
        </div>
      </div>
      </PageLayout>
    </>
  );
}

