import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  gradientFrom: string;
  gradientVia: string;
  titleColor: string;
}

export function PageLayout({ children, title, gradientFrom, gradientVia, titleColor }: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradientFrom} ${gradientVia} to-white flex flex-col p-8`}>
      <Link
        to="/"
        className="flex items-center gap-2 text-white hover:text-[#3A36C3] transition-colors duration-300 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        <span>Retour</span>
      </Link>

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-16 border border-gray-200 max-w-7xl w-full mx-8 shadow-2xl">
          <h1 className={`${titleColor} text-center mb-8 text-4xl font-bold`}>{title}</h1>
          <div className="space-y-6 text-gray-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

