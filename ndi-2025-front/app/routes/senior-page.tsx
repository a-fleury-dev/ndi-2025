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
        <main className="relative min-h-screen flex items-center justify-center pt-20 pb-10">
            {/* DÉCOR D'ARRIÈRE PLAN (Blobs colorés) */}
            <div className="absolute top-[-0%] left-[-0%] w-[1500px] h-[500px] bg-[#F12FFD] rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[1500px] h-[500px] bg-[#F7D438] rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-0%] left-[0%] w-[1600px] h-[600px] bg-[#0A83CE] rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob animation-delay-4000"></div>
            <div className="flex-1 flex flex-col items-center gap-14 max-w-3xl px-6">

                <Link
                    to="/"
                    className="fixed top-4 left-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                    ← Retour
                </Link>

                <header className="flex flex-col items-center gap-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Formulaire
                    </h1>
                    <div className="h-1 w-20 bg-blue-600 rounded-full" />
                </header>

                <section className="w-full">
                    <article className="rounded-3xl border border-gray-200 dark:border-gray-800 p-10 bg-white dark:bg-gray-900 shadow-sm">
                        <div className="prose dark:prose-invert max-w-none leading-relaxed text-gray-700 dark:text-gray-300 space-y-6">
                            <img src={memphis} alt="" />
                            <p>
                                L'article 2 de la loi n° 2005-102 du 11 février 2005 dispose :
                            </p>
                            <p>
                                <strong>« Constitue un handicap [...] toute limitation d'activité ou restriction de participation à la vie en société subie dans son environnement par une personne en raison d'une altération substantielle, durable ou définitive d'une ou plusieurs fonctions physiques, sensorielles, mentales, cognitives ou psychiques [...]. »</strong>
                            </p>
                            <p>
                                La situation de handicap est alors liée à un contexte et non à un individu.
                            </p>
                            <p>
                                Dans le domaine du numérique, <strong>de nombreuses solutions existent pour inclure les personnes en situation de handicap</strong> : synthèse vocale, liseuses braille, logiciels de lecture d’écran, polices adaptées aux personnes dyslexiques, réglages de contraste ou de taille des textes, commandes vocales, etc.
                            </p>
                            <p>
                                <strong>Pourtant, l’accessibilité destinée aux personnes âgées reste souvent absente des discussions sur l’inclusivité numérique.</strong>
                            </p>
                            <p>
                                Selon une étude des Petits Frères des Pauvres et de l’Institut CSA réalisée en 2018, <strong>27 % des personnes de 60 ans et plus n’utilisent jamais Internet</strong> soit 4 millions de personnes âgées ; <strong>14 % des 60-70 ans sont en situation d’exclusion numérique.</strong>
                            </p>
                            <p>
                                <strong>Cette difficulté renforce l’isolement de certains séniors</strong> et constitue un risque dans un contexte de dématérialisation croissante.
                            </p>
                            <p>
                                Nous avons choisit de relever le défi de Sopra Steria qui consiste à réaliser un champ de saisie peu ergonomique. En étendant ce défi à notre sujet, <strong>le formulaire entier va laisser dans un état émotionel confus, entre l'amusement, l'agacement et l'inquiétude.</strong>
                            </p>
                            <p>
                                Avec cette démarche, on espère ouvrir la réflexion sur <strong>des problématiques d'ergonomies et d'inclusion</strong> des personnes moins familières avec les technologies, qui semblent alors vivre quotidiennement ce type d'expérience frustrantes voire handicapantes.
                            </p>
                        </div>
                    </article>
                </section>

                <div className="flex justify-center">
                    <Link
                        to="/elderly_form"
                        className="fixed bottom-4  inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg transition"
                    >
                        REMPLIR LE FORMULAIRE
                    </Link>
                </div>
            </div>
        </main>
    );
}
