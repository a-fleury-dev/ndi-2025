export function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 p-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 flex gap-4 items-center">
        <img
          src="/nuit_info_2025.png"
          alt="Nuit de l'Info 2025"
          className="h-12 w-auto object-contain"
        />
        <img
          src="/universite_mtp.png"
          alt="Université de Montpellier"
          className="h-12 w-auto object-contain"
        />
      </div>
    </header>
  );
}

