import type { Route } from "./+types/senior-page";
import { Link } from "react-router";
import memphis from '../../public/corporate_menphis_1.png';

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Senior Page" },
        { name: "description", content: "Senior information page" },
    ];
}

export default function SeniorPage() {
    return (
        <main className="relative min-h-screen flex items-center justify-center pt-20 pb-10 bg-[#F0F4F8] font-sans selection:bg-[#F7D438] selection:text-black overflow-hidden">

            {/* DÉCOR D'ARRIÈRE PLAN (Blobs colorés) */}
            <div className="absolute top-[+20%] left-[-0%] w-[1500px] h-[500px] bg-[#F12FFD] rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[1500px] h-[500px] bg-[#F7D438] rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-20%] left-[0%] w-[1600px] h-[600px] bg-[#0A83CE] rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob animation-delay-4000"></div>

            <div className="flex-1 flex flex-col items-center gap-10 max-w-3xl px-6 relative z-10">

                <Link
                    to="/"
                    className="fixed top-6 left-6 bg-white border-2 border-[#3A36C3] text-[#3A36C3] px-6 py-2 rounded-xl shadow-[4px_4px_0px_0px_#3A36C3] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#3A36C3] hover:text-white transition-all font-bold uppercase text-sm z-50"
                >
                    ← Retour
                </Link>

                <header className="flex flex-col items-center gap-4 text-center mt-8">
                    <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0A83CE] via-[#F12FFD] to-[#F7D438] tracking-tighter uppercase drop-shadow-sm">
                        Contexte & Enjeux
                    </h1>
                    <div className="h-2 w-24 bg-[#F7D438] rounded-full border border-white shadow-sm" />
                </header>

                <section className="w-full mb-20">
                    <article className="rounded-3xl border-2 border-[#0A83CE] p-10 bg-white/95 backdrop-blur-xl shadow-[8px_8px_0px_0px_rgba(10,131,206,0.4)]">
                        <div className="prose max-w-none leading-relaxed text-gray-600 space-y-6 text-lg font-medium">

                            {/* Image stylisée */}
                            <div className="flex justify-center mb-6">
                                <img
                                    src={memphis}
                                    alt="Illustration"
                                    className="rounded-xl border-2 border-[#F12FFD] shadow-[6px_6px_0px_0px_#F12FFD] max-h-64 object-cover"
                                />
                            </div>

                            <p>
                                L'article 2 de la loi n° 2005-102 du 11 février 2005 dispose :
                            </p>
                            <p className="bg-[#F0F4F8] p-4 rounded-lg border-l-4 border-[#3A36C3] italic">
                                <strong className="text-[#3A36C3]">« Constitue un handicap [...] toute limitation d'activité ou restriction de participation à la vie en société subie dans son environnement par une personne en raison d'une altération substantielle, durable ou définitive d'une ou plusieurs fonctions physiques, sensorielles, mentales, cognitives ou psychiques [...]. »</strong>
                            </p>
                            <p>
                                La situation de handicap est alors liée à un contexte et non à un individu.
                            </p>
                            <p>
                                Dans le domaine du numérique, <strong className="text-[#0A83CE]">de nombreuses solutions existent pour inclure les personnes en situation de handicap</strong> : synthèse vocale, liseuses braille, logiciels de lecture d’écran, polices adaptées aux personnes dyslexiques, réglages de contraste ou de taille des textes, commandes vocales, etc.
                            </p>
                            <p>
                                <strong className="text-[#F12FFD]">Pourtant, l’accessibilité destinée aux personnes âgées reste souvent absente des discussions sur l’inclusivité numérique.</strong>
                            </p>
                            <p>
                                Selon une étude des Petits Frères des Pauvres et de l’Institut CSA réalisée en 2018, <strong className="bg-[#F7D438]/20 px-1 rounded text-black">27 % des personnes de 60 ans et plus n’utilisent jamais Internet</strong> soit 4 millions de personnes âgées ; <strong className="bg-[#F7D438]/20 px-1 rounded text-black">14 % des 60-70 ans sont en situation d’exclusion numérique.</strong>
                            </p>
                            <p>
                                <strong className="text-[#F12FFD]">Cette difficulté renforce l’isolement de certains séniors</strong> et constitue un risque dans un contexte de dématérialisation croissante.
                            </p>
                            <p>
                                Nous avons choisi de relever le défi de Sopra Steria qui consiste à réaliser un champ de saisie peu ergonomique. En étendant ce défi à notre sujet, <strong className="text-[#3A36C3]">le formulaire entier va laisser dans un état émotionel confus, entre l'amusement, l'agacement et l'inquiétude.</strong>
                            </p>
                            <p>
                                Avec cette démarche, on espère ouvrir la réflexion sur <strong className="text-[#0A83CE]">des problématiques d'ergonomies et d'inclusion</strong> des personnes moins familières avec les technologies, qui semblent alors vivre quotidiennement ce type d'expérience frustrantes voire handicapantes.
                            </p>
                        </div>
                    </article>
                </section>

                <div className="flex justify-center w-full">
                    <Link
                        to="/elderly_form"
                        className="fixed bottom-6 px-10 py-4 bg-gradient-to-r from-[#F7D438] to-[#F12FFD] hover:to-[#0A83CE] text-white text-xl font-black rounded-2xl shadow-[0_10px_20px_rgba(241,47,253,0.3)] hover:shadow-[0_15px_30px_rgba(241,47,253,0.5)] hover:-translate-y-1 transition-all uppercase tracking-widest z-50 border-2 border-white/20"
                        style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.1)' }}
                    >
                        REMPLIR LE FORMULAIRE
                    </Link>
                </div>
            </div>
        </main>
    );
}
