import type { Route } from "./+types/senior-form";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Formulaire Senior" },
    { name: "description", content: "Senior information form" },
  ];
}

export default function SeniorForm() {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    age: "",
    dateNaissanceMonth: "",
    dateNaissanceDay: "",
    dateNaissanceYear: "",
    sexe: "",
    email: "",
    telephone: "",
    domicile: "",
    villeDNaissance: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <main className="flex items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-2xl px-4">
        <div className="rounded-3xl border border-gray-200 dark:border-gray-700 p-8 bg-white dark:bg-gray-900">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Formulaire d&apos;Information
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Âge
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="150"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sexe
                </label>
                <select
                  name="sexe"
                  value={formData.sexe}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date de Naissance
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <select
                    name="dateNaissanceMonth"
                    value={formData.dateNaissanceMonth}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Mois</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                        {String(i + 1).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    name="dateNaissanceDay"
                    value={formData.dateNaissanceDay}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Jour</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                        {String(i + 1).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <input
                    type="number"
                    name="dateNaissanceYear"
                    value={formData.dateNaissanceYear}
                    onChange={handleChange}
                    placeholder="Année"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1900"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Adresse email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Domicile
              </label>
              <input
                type="text"
                name="domicile"
                value={formData.domicile}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ville de naissance
              </label>
              <input
                type="text"
                name="villeDNaissance"
                value={formData.villeDNaissance}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Soumettre
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
