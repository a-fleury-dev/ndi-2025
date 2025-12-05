import type { Route } from "./+types/senior-page";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Senior Page" },
        { name: "description", content: "Senior information page" },
    ];
}

export default function SeniorPage() {
    return (
        <main className="flex items-center justify-center min-h-screen pt-20 pb-10 bg-gray-50 dark:bg-gray-950">
            <div className="flex-1 flex flex-col items-center gap-14 max-w-3xl px-6">

                {/* Header */}
                <header className="flex flex-col items-center gap-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Page Senior
                    </h1>
                    <div className="h-1 w-20 bg-blue-600 rounded-full" />
                </header>

                {/* Content */}
                <section className="w-full">
                    <article className="rounded-3xl border border-gray-200 dark:border-gray-800 p-10 bg-white dark:bg-gray-900 shadow-sm">
                        <div className="prose dark:prose-invert max-w-none leading-relaxed text-gray-700 dark:text-gray-300 space-y-6">
                            <p>
                                L'article 2 de la loi n° 2005-102 du 11 février 2005 dispose :
                            </p>
                            <p>
                                « Constitue un handicap [...] toute limitation d'activité ou restriction de participation à la vie en société subie dans son environnement par une personne en raison d'une altération substantielle, durable ou définitive d'une ou plusieurs fonctions physiques, sensorielles, mentales, cognitives ou psychiques [...]. »
                            </p>

                            <p>
                                La situation de handicap est alors liée à un contexte et non à un individu.
                            </p>

                            <p>
                                Dans le domaine du numérique, de nombreuses solutions existent pour inclure les personnes en situation de handicap : synthèse vocale, liseuses braille, logiciels de lecture d’écran, polices adaptées aux personnes dyslexiques, réglages de contraste ou de taille des textes, commandes vocales, etc.
                            </p>

                            <p>
                                Pourtant, l’accessibilité destinée aux personnes âgées reste souvent absente des discussions sur l’inclusivité numérique.
                            </p>

                            <p>
                                Cette difficulté renforce l’isolement de certains séniors et constitue un risque dans un contexte de dématérialisation croissante.
                            </p>
                        </div>
                    </article>
                </section>

                {/* CTA */}
                <div className="flex justify-center">
                    <Link
                        to="/elderly_form"
                        className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow transition-colors"
                    >
                        Remplissez-ce formulaire pour envoyer un peu d'amour ❤
                    </Link>
                </div>
            </div>
        </main>
    );
}
