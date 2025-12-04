import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg">
      {/* Ligne de séparation avec gradient */}
      <div className="h-1 bg-gradient-to-r from-[#9F33E6] via-[#F12FFD] via-[#FFD700] to-[#0A83CE]"></div>

      <div className="py-6 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            to="/about"
            className="text-[#3A36C3] hover:text-[#9F33E6] transition-colors duration-300 underline underline-offset-4"
          >
            À propos
          </Link>

          <p className="text-gray-600 text-center">
            Site réalisé lors de la Nuit de l'Info 2025
          </p>

          <p className="text-gray-500">
            © 2025 NIRD
          </p>
        </div>
      </div>
    </footer>
  );
}

