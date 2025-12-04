import type { Route } from "./+types/women";
import { PageLayout } from "../components/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Les Femmes dans l'Informatique - NIRD" },
    { name: "description", content: "Promotion des femmes dans l'informatique" },
  ];
}

export default function Women() {
  return (
    <PageLayout
      title="Les Femmes dans l'Informatique"
      gradientFrom="from-[#F12FFD]"
      gradientVia="via-[#F9A8D4]"
      titleColor="text-[#F12FFD]"
    >
      <div className="w-full mx-auto">
        <p className="text-lg mb-8 text-center">
          Cette section est dédiée à la promotion des femmes dans l'informatique.
        </p>

        {/* Frise chronologique interactive */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#F12FFD] mb-6 text-center">
            Frise chronologique interactive pour en apprendre plus sur les grandes figures féminines de l'informatique
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
  );
}

