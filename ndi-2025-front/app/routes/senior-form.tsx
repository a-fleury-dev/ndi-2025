import type {Route} from "./+types/senior-form";
import {useState, useMemo} from "react";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Formulaire Senior"},
        {name: "description", content: "Senior information form"},
    ];
}

export default function SeniorForm() {
    const [formData, setFormData] = useState({
        prenom: "",
        nom: "",
        age: "0",
        dateNaissanceMonth: "",
        dateNaissanceDay: "",
        dateNaissanceYear: "",
        sexe: "",
        email: "",
        telephone: "",
        domicile: "",
        villeDNaissance: "",
    });

    const [lastRoll, setLastRoll] = useState<number | null>(null);

    // Génération des options horribles pour le téléphone (Memoizé pour ne pas changer à chaque render)
    const phoneOptions = useMemo(() => {
        return Array.from({length: 5}, () => {
            // Crée 00-99
            const numbers = Array.from({length: 110}, (_, i) =>
                String(i).padStart(2, "0")
            );
            // Mélange aléatoire diabolique
            return numbers.sort(() => Math.random() - 0.5);
        });
    }, []);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Logique pour le téléphone (5 morceaux de 2 chiffres)
    const handlePhoneChange = (index: number, value: string) => {
        const currentPhone = formData.telephone || "";
        // On split en paires, on remplit avec des underscores si vide
        const parts = [0, 1, 2, 3, 4].map(i => currentPhone.substr(i * 2, 2).padEnd(2, "_"));
        parts[index] = value;
        // On recolle
        const newPhone = parts.join("").replace(/_/g, "");

        setFormData((prev) => ({
            ...prev,
            telephone: newPhone,
        }));
    };

    const getPhonePartValue = (index: number) => {
        if (!formData.telephone) return "";
        const val = formData.telephone.substr(index * 2, 2);
        return val.length === 2 ? val : "";
    };

    // --- Mécanique horrible pour l'âge (Dés) ---
    const handleRollDice = () => {
        const roll = Math.floor(Math.random() * 10) + 1;
        setLastRoll(roll);
        setFormData((prev) => ({
            ...prev,
            age: String((parseInt(prev.age) || 0) + roll),
        }));
    };

    const handleResetAge = () => {
        setLastRoll(null);
        setFormData((prev) => ({...prev, age: "0"}));
    };
    // -------------------------------------

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <main className="flex items-center justify-center min-h-screen py-8 bg-gray-50 dark:bg-gray-950">
            <div className="w-full max-w-2xl px-4">
                <div
                    className="rounded-3xl border border-gray-200 dark:border-gray-700 p-8 bg-white dark:bg-gray-900 shadow-xl">
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
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* SECTION AGE D6 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Âge
                                </label>
                                <div
                                    className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                    <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            {formData.age} ans
                        </span>
                                        {lastRoll && (
                                            <span
                                                className="text-sm font-medium text-blue-600 dark:text-blue-400 animate-bounce">
                                + {lastRoll} 🎲
                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={handleRollDice}
                                            className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded transition-colors flex items-center justify-center gap-2 active:scale-95"
                                        >
                                            <span>Lancer le dé</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleResetAge}
                                            className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded transition-colors text-sm"
                                            title="Recommencer à 0 (Si vous avez dépassé votre âge)"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                    {/* Input caché pour garder la valeur dans le formData */}
                                    <input
                                        type="hidden"
                                        name="age"
                                        value={formData.age}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Sexe
                                </label>
                                <select
                                    name="sexe"
                                    value={formData.sexe}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        required
                                    >
                                        <option value="">Mois</option>
                                        {Array.from({length: 12}, (_, i) => (
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
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        required
                                    >
                                        <option value="">Jour</option>
                                        {Array.from({length: 31}, (_, i) => (
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
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    required
                                />
                            </div>

                            {/* SECTION TÉLÉPHONE HORRIBLE */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Numéro de téléphone
                                </label>
                                <div className="flex gap-1 md:gap-2">
                                    {phoneOptions.map((options, index) => (
                                        <div key={index} className="flex-1 min-w-0">
                                            <select
                                                value={getPhonePartValue(index)}
                                                onChange={(e) => handlePhoneChange(index, e.target.value)}
                                                className="w-full px-1 md:px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-center"
                                                required
                                                title={`Chiffres ${index * 2 + 1} et ${index * 2 + 2}`}
                                            >
                                                <option value="">..</option>
                                                {options.map((num) => (
                                                    <option key={num} value={num}>
                                                        {num}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                                {/* Champ caché pour validation */}
                                <input
                                    type="hidden"
                                    name="telephone"
                                    value={formData.telephone}
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
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                required
                            />
                        </div>

                        <div className="flex gap-4 pt-6">
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
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