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
    <main className="flex items-center justify-center min-h-screen pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0 max-w-2xl px-4">
        <header className="flex flex-col items-center gap-9">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Page Senior
          </h1>
        </header>

        <div className="w-full space-y-6">
          <div className="rounded-3xl border border-gray-200 dark:border-gray-700 p-8 bg-white dark:bg-gray-900">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Voici plein d'infos super intéressantes sur les vieux et les difficultés qu'ils ont avec Internet (ils sont probablement juste nuls)
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              to="/elderly_form"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Accéder au formulaire
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
