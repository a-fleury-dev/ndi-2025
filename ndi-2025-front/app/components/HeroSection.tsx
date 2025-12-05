import { Link } from 'react-router';

interface Zone {
  id: string;
  label: string;
  position: string;
  hoverColor: string;
}

const zones: Zone[] = [
  {
    id: 'elderly',
    label: 'Inclusion\nPersonnes\nâgées',
    position: 'top-[15%] right-[10%]',
    hoverColor: 'hover:bg-[#F12FFD]/20'
  },
  {
    id: 'women',
    label: 'Femmes dans\nl\'informatique',
    position: 'top-[15%] left-[10%]',
    hoverColor: 'hover:bg-[#9F33E6]/20'
  },
  {
    id: 'chatbot',
    label: 'Chatbot\nTrompe',
    position: 'bottom-[25%] right-[10%]',
    hoverColor: 'hover:bg-[#FFD700]/20'
  },
  {
    id: 'reconditioning',
    label: 'Les enjeux du\nreconditionnement',
    position: 'bottom-[25%] left-[10%]',
    hoverColor: 'hover:bg-[#0A83CE]/20'
  }
];

export function HeroSection() {
  return (
    <main className="relative h-screen overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 600px at 50% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.3) 70%, transparent 100%),
            radial-gradient(ellipse at 20% 20%, #9F33E6 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, #F12FFD 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, #0A83CE 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, #FFD700 0%, transparent 50%),
            linear-gradient(135deg, #3A36C3 0%, #9F33E6 25%, #F12FFD 50%, #FFD700 75%, #0A83CE 100%)
          `
        }}
      />

      {/* Central Logo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <Link to="/nird">
        <img
          src="/nird-logo.png"
          alt="NIRD - Numérique Inclusif Responsable Durable"
          className="w-96 h-auto drop-shadow-2xl"
        />
      </Link>
      </div>

      {/* Interactive Zones */}
      {zones.map((zone) => (
        <Link
          key={zone.id}
          to={`/${zone.id}`}
          className={`absolute ${zone.position} ${zone.hoverColor} px-8 py-6 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/30 hover:border-white/60 cursor-pointer group`}
        >
          <p className="text-white text-center whitespace-pre-line group-hover:drop-shadow-lg transition-all">
            {zone.label}
          </p>
        </Link>
      ))}
    </main>
  );
}

