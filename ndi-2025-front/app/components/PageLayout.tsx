import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  gradientFrom: string;
  gradientVia: string;
  titleColor: string;
  hideTitle?: boolean;
  liquidGlassHeader?: boolean;
  transparentContent?: boolean;
}

export function PageLayout({ children, title, gradientFrom, gradientVia, titleColor, hideTitle = false, liquidGlassHeader = false, transparentContent = false }: PageLayoutProps) {
  return (
    <div className={`min-h-screen ${transparentContent ? 'bg-gradient-to-br' : 'bg-gradient-to-br'} ${gradientFrom} ${gradientVia} ${transparentContent ? 'to-[#7C3AED]' : 'to-white'} flex flex-col relative overflow-hidden`}>
      {/* Gradient overlay moderne pour le mode transparent */}
      {transparentContent && (
        <>
          <style>{`
            @keyframes float-slow {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(50px, -50px) scale(1.1); }
            }
            @keyframes float-medium {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(-40px, 40px) scale(0.95); }
            }
            @keyframes float-fast {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(30px, 30px) scale(1.05); }
            }
          `}</style>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/30 rounded-full blur-3xl" style={{ animation: 'float-slow 20s ease-in-out infinite' }}></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-600/35 rounded-full blur-3xl" style={{ animation: 'float-medium 15s ease-in-out infinite' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/25 rounded-full blur-3xl" style={{ animation: 'float-fast 18s ease-in-out infinite' }}></div>
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl" style={{ animation: 'float-medium 22s ease-in-out infinite reverse' }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-fuchsia-500/25 rounded-full blur-3xl" style={{ animation: 'float-slow 17s ease-in-out infinite reverse' }}></div>
          </div>
        </>
      )}
      {/* Header avec effet liquid glass si activé */}
      <div className={`${liquidGlassHeader ? 'fixed top-0 left-0 right-0 z-40' : 'p-8 pl-4'} ${liquidGlassHeader ? 'p-4 px-8' : ''}`}>
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:text-[#3A36C3] transition-colors duration-300 group"
        >
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          <span>Retour</span>
        </Link>
      </div>

      {/* Spacer si header fixe */}
      {liquidGlassHeader && <div className="h-16"></div>}

      <div className={`flex-1 flex items-center justify-center ${transparentContent ? 'px-8' : 'px-8 pl-64'}`}>
        <div className={`${transparentContent ? '' : 'bg-white/90 backdrop-blur-lg rounded-2xl p-16 border border-gray-200 shadow-2xl'} max-w-7xl w-full`}>
          {!hideTitle && <h1 className={`${titleColor} text-center mb-8 text-4xl font-bold`}>{title}</h1>}
          <div className={transparentContent ? '' : 'space-y-6 text-gray-700'}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

