import type {Route} from "./+types/senior-form";
import {useState, useMemo, useEffect} from "react";
import {Link} from "react-router";

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

    // --- Mécanique pour les signes astros de la pire manière ---

    const SIGNES = [
        "Bélier", "Taureau", "Gémeaux", "Cancer", "Lion", "Vierge",
        "Balance", "Scorpion", "Sagittaire", "Capricorne", "Verseau", "Poissons"
    ];

    const ZODIAC_RULES: Record<string, {
        matches: string[],
        start: { m: number, d: number },
        end: { m: number, d: number }
    }> = {
        "Bélier": {
            matches: ["Gémeaux", "Lion", "Balance", "Sagittaire", "Verseau", "Poissons"],
            start: {m: 3, d: 21}, end: {m: 4, d: 19}
        },
        "Taureau": {
            matches: ["Taureau", "Cancer", "Vierge", "Scorpion", "Capricorne", "Poissons"],
            start: {m: 4, d: 20}, end: {m: 5, d: 20}
        },
        "Gémeaux": {
            matches: ["Bélier", "Gémeaux", "Lion", "Balance", "Sagittaire", "Verseau"],
            start: {m: 5, d: 21}, end: {m: 6, d: 20}
        },
        "Cancer": {
            matches: ["Taureau", "Cancer", "Vierge", "Scorpion", "Capricorne", "Poissons"],
            start: {m: 6, d: 21}, end: {m: 7, d: 22}
        },
        "Lion": {
            matches: ["Bélier", "Gémeaux", "Balance", "Sagittaire", "Verseau"],
            start: {m: 7, d: 23}, end: {m: 8, d: 22}
        },
        "Vierge": {
            matches: ["Taureau", "Cancer", "Capricorne", "Poissons"],
            start: {m: 8, d: 23}, end: {m: 9, d: 22}
        },
        "Balance": {
            matches: ["Bélier", "Gémeaux", "Lion", "Balance", "Sagittaire", "Verseau"],
            start: {m: 9, d: 23}, end: {m: 10, d: 22}
        },
        "Scorpion": {
            matches: ["Taureau", "Cancer", "Capricorne", "Poissons"],
            start: {m: 10, d: 23}, end: {m: 11, d: 21}
        },
        "Sagittaire": {
            matches: ["Bélier", "Gémeaux", "Lion", "Balance", "Verseau"],
            start: {m: 11, d: 22}, end: {m: 12, d: 21}
        },
        "Capricorne": {
            matches: ["Taureau", "Cancer", "Vierge", "Scorpion", "Capricorne"],
            start: {m: 12, d: 22}, end: {m: 1, d: 19}
        },
        "Verseau": {
            matches: ["Bélier", "Gémeaux", "Lion", "Balance", "Sagittaire"],
            start: {m: 1, d: 20}, end: {m: 2, d: 18}
        },
        "Poissons": {
            matches: ["Bélier", "Taureau", "Cancer", "Vierge", "Scorpion", "Poissons"],
            start: {m: 2, d: 19}, end: {m: 3, d: 20}
        }
    };

    // --- LOGIQUE ASTRO (Compatibilité) ---
    const [selectedCompatibilities, setSelectedCompatibilities] = useState<string[]>([]);
    const [detectedSign, setDetectedSign] = useState<string | null>(null);

    const toggleCompatibility = (signe: string) => {
        setSelectedCompatibilities(prev => {
            const isSelected = prev.includes(signe);
            return isSelected ? prev.filter(s => s !== signe) : [...prev, signe];
        });
    };

    // Détection automatique : Si la liste cochée correspond EXACTEMENT à la liste requise
    useEffect(() => {
        const userSelection = [...selectedCompatibilities].sort().join(",");
        let foundSign = null;

        for (const [sign, rules] of Object.entries(ZODIAC_RULES)) {
            const requiredSelection = [...rules.matches].sort().join(",");
            if (userSelection === requiredSelection) {
                foundSign = sign;
                break;
            }
        }

        setDetectedSign(foundSign);

        // Si on perd le signe, on reset la date car elle n'est plus valide
        if (!foundSign) {
            setFormData(prev => ({...prev, dateNaissanceMonth: "", dateNaissanceDay: ""}));
        }
    }, [selectedCompatibilities]);

    // Filtrer les mois affichés selon le signe
    const availableMonths = useMemo(() => {
        if (!detectedSign) return [];
        const {start, end} = ZODIAC_RULES[detectedSign];
        // Gère le cas normal et le cas chevauchant l'année (Capricorne)
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter(m => {
            if (start.m < end.m) return m >= start.m && m <= end.m;
            return m >= start.m || m <= end.m;
        });
    }, [detectedSign]);

    // Filtrer les jours affichés selon le mois choisi
    const availableDays = useMemo(() => {
        if (!detectedSign || !formData.dateNaissanceMonth) return [];
        const month = parseInt(formData.dateNaissanceMonth);
        const {start, end} = ZODIAC_RULES[detectedSign];

        let minDay = 1;
        let maxDay = 31;
        if (month === start.m) minDay = start.d;
        if (month === end.m) maxDay = end.d;

        return Array.from({length: maxDay - minDay + 1}, (_, i) => minDay + i);
    }, [detectedSign, formData.dateNaissanceMonth]);

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
                        {/* --- REMPLACER L'ANCIEN BLOC DATE DE NAISSANCE PAR CECI --- */}
                        <div
                            className="p-5 border border-purple-200 dark:border-purple-900 rounded-xl bg-purple-50 dark:bg-purple-900/10">
                            <label className="block text-sm font-medium text-purple-900 dark:text-purple-200 mb-4">
                                Identification Astrologique de votre date de naissance
                                <br/>
                                <span className="text-xs font-normal opacity-80">
                  Identifiez votre signe astro en cochant tous les signes compatibles avec celui-ci.
                </span>
                                <p>
                                    <Link
                                        to={"https://cdn0.mariages.net/article/2847/original/960/jpg/57482-zodiac-compatibility-chart-1x1-fr.webp"}>
                                        [Cliquez] Image d'aide Astrologique
                                    </Link>

                                </p>
                            </label>

                            {/* Grille de cases à cocher */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                                {SIGNES.map(signe => (
                                    <label key={signe}
                                           className="flex items-center space-x-2 cursor-pointer p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 hover:border-purple-400 transition-all select-none">
                                        <input
                                            type="checkbox"
                                            checked={selectedCompatibilities.includes(signe)}
                                            onChange={() => toggleCompatibility(signe)}
                                            className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                                        />
                                        <span
                                            className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{signe}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Feedback utilisateur */}
                            {detectedSign ? (
                                <div
                                    className="mb-4 text-center p-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium animate-pulse">
                                    Signe identifié : {detectedSign} ✨
                                </div>
                            ) : (
                                <div
                                    className="mb-4 text-center p-2 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg text-xs italic">
                                    En attente d'une combinaison de compatibilité parfaite...
                                </div>
                            )}

                            {/* Les champs Date qui ne s'affichent/activent que si le signe est trouvé */}
                            <div
                                className={`grid grid-cols-3 gap-4 transition-opacity duration-300 ${detectedSign ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                                <div>
                                    <select
                                        name="dateNaissanceMonth"
                                        value={formData.dateNaissanceMonth}
                                        onChange={handleChange}
                                        disabled={!detectedSign}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Mois</option>
                                        {availableMonths.map(m => (
                                            <option key={m} value={String(m).padStart(2, "0")}>
                                                {new Date(0, m - 1).toLocaleString('fr-FR', {month: 'long'})}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <select
                                        name="dateNaissanceDay"
                                        value={formData.dateNaissanceDay}
                                        onChange={handleChange}
                                        disabled={!detectedSign || !formData.dateNaissanceMonth}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Jour</option>
                                        {availableDays.map(d => (
                                            <option key={d} value={String(d).padStart(2, "0")}>
                                                {d}
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
                                        disabled={!detectedSign}
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