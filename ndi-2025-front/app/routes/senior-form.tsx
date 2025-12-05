import type {Route} from "./+types/senior-form";
import {useState, useMemo, useEffect} from "react";

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

    const CLAVIER_CHARS = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z", "É", "È", "À", "-", " "
    ];

    const GENRE_SPECTRUM = [
        "Néant", "Particule", "Atome", "Molécule", "Cellule", "Amibe",
        "Têtard", "Poisson", "Lézard", "Dinosaure", "Poule", "Oeuf",
        "Hameçon", "Hamac", "Hammam", "Hamster", "Hologramme",
        "Homme",
        "Homogène", "Homonyme", "Homologue", "Immeuble",
        "Fauteuil", "Faucon", "Faux", "Farniente", "Fantôme",
        "Ferme", "Ferment", "Fermoir",
        "Femme",
        "Flemme", "Flamme", "Flamant", "Flan",
        "Loutre", "Lutin", "Licorne", "Cyborg", "Robot", "Android",
        "Gazeux", "Liquide", "Solide", "Plasma", "Introuvable"
    ];

    const EMAIL_WARNINGS = [
        "ÊTES-VOUS SÛR DE VOULOIR NOUS DONNER ÇA ?",
        "ATTENTION : Êtes-vous sûr de céder votre âme à nos partenaires tiers ?",
        "CONFIRMATION : Acceptez-vous de recevoir 145 spams/heure ?",
        "ALERTE : Votre vie privée est sur le point d'être vendue.",
        "DANGER : Donner votre email pourrait vous être fatal.",
        "QUESTION : Avez-vous lu les 800 pages des CGU ?",
        "SÉCURITÉ : Êtes-vous vraiment qui vous prétendez être ?",
        "STOP : Réfléchissez bien. Vraiment bien.",
        "MONDIALISATION : Cette adresse sera stockée sur un serveur douteux.",
        "HÉRITAGE : En tapant ceci, vous renoncez à vos droits successoraux."
    ];

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
            matches: ["Bélier", "Gémeaux", "Lion"],
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

    // --- AJOUTER LA LISTE HISTORIQUE ---
    const HISTORIQUE = [
        {year: 1925, event: "Publication de Gatsby le Magnifique"},
        {year: 1926, event: "Première démonstration de télévision"},
        {year: 1927, event: "Lindbergh traverse l'Atlantique (avion)"},
        {year: 1928, event: "Découverte de la pénicilline"},
        {year: 1929, event: "Krach boursier de Wall Street"},
        {year: 1930, event: "Première Coupe du monde (football)"},
        {year: 1931, event: "Inauguration de l'Empire State Building"},
        {year: 1932, event: "Découverte du neutron"},
        {year: 1933, event: "Hitler devient chancelier"},
        {year: 1934, event: "La Longue Marche (Chine)"},
        {year: 1935, event: "Invention du radar"},
        {year: 1936, event: "Guerre civile espagnole / Front populaire"},
        {year: 1937, event: "Bombardement de Guernica"},
        {year: 1938, event: "La Nuit de Cristal"},
        {year: 1939, event: "Début de la Seconde Guerre mondiale"},
        {year: 1940, event: "Appel du 18 Juin (De Gaulle)"},
        {year: 1941, event: "Attaque de Pearl Harbor"},
        {year: 1942, event: "Rafle du Vélodrome d'Hiver"},
        {year: 1943, event: "Arrestation de Jean Moulin"},
        {year: 1944, event: "Débarquement en Normandie"},
        {year: 1945, event: "Bombes atomiques, fin de la guerre"},
        {year: 1946, event: "Première assemblée de l'ONU"},
        {year: 1947, event: "Indépendance de l'Inde"},
        {year: 1948, event: "Déclaration universelle droits de l'homme"},
        {year: 1949, event: "Création de l'OTAN"},
        {year: 1950, event: "Début de la guerre de Corée"},
        {year: 1951, event: "Première centrale nucléaire électrique"},
        {year: 1952, event: "Élisabeth II devient reine"},
        {year: 1953, event: "Découverte de la structure de l'ADN"},
        {year: 1954, event: "Guerre d'Algérie / Diên Biên Phu"},
        {year: 1955, event: "Rosa Parks refuse de céder sa place"},
        {year: 1956, event: "Indépendance du Maroc et Tunisie"},
        {year: 1957, event: "Spoutnik 1 dans l'espace"},
        {year: 1958, event: "Naissance de la Ve République"},
        {year: 1959, event: "Révolution cubaine (Fidel Castro)"},
        {year: 1960, event: "Indépendance de 17 pays africains"},
        {year: 1961, event: "Youri Gagarine, premier homme (espace)"},
        {year: 1962, event: "Indépendance de l'Algérie"},
        {year: 1963, event: "Assassinat de John F. Kennedy"},
        {year: 1964, event: "Arrestation de Nelson Mandela"},
        {year: 1965, event: "Escalade militaire au Vietnam"},
        {year: 1966, event: "Révolution culturelle en Chine"},
        {year: 1967, event: "Première greffe du cœur"},
        {year: 1968, event: "Mouvements sociaux de Mai 68"},
        {year: 1969, event: "L'Homme marche sur la Lune"},
        {year: 1970, event: "Séparation des Beatles"},
        {year: 1971, event: "Premier microprocesseur (Intel 4004)"},
        {year: 1972, event: "Attentat des Jeux de Munich"},
        {year: 1973, event: "Premier choc pétrolier"},
        {year: 1974, event: "Démission de Richard Nixon"},
        {year: 1975, event: "Fin de la guerre du Vietnam"},
        {year: 1976, event: "Premier vol commercial du Concorde"},
        {year: 1977, event: "Sortie de Star Wars"},
        {year: 1978, event: "Naissance du premier bébé-éprouvette"},
        {year: 1979, event: "Révolution islamique en Iran"},
        {year: 1980, event: "Sortie du jeu Pac-Man"},
        {year: 1981, event: "Abolition peine de mort (France)"},
        {year: 1982, event: "Guerre des Malouines"},
        {year: 1983, event: "Découverte du virus du Sida"},
        {year: 1984, event: "Catastrophe industrielle de Bhopal"},
        {year: 1985, event: "Accords de Schengen signés"},
        {year: 1986, event: "Catastrophe nucléaire de Tchernobyl"},
        {year: 1987, event: "Krach boursier d'octobre"},
        {year: 1988, event: "Création du GIEC (climat)"},
        {year: 1989, event: "Chute du mur de Berlin"},
        {year: 1990, event: "Libération de Nelson Mandela"},
        {year: 1991, event: "Dissolution de l'URSS"},
        {year: 1992, event: "Traité de Maastricht (UE)"},
        {year: 1993, event: "Le Web devient public (CERN)"},
        {year: 1994, event: "Génocide des Tutsis au Rwanda"},
        {year: 1995, event: "Attentats dans le métro (France)"},
        {year: 1996, event: "Clonage de la brebis Dolly"},
        {year: 1997, event: "Mort de la princesse Diana"},
        {year: 1998, event: "France championne du monde (football)"},
        {year: 1999, event: "Création de la monnaie Euro"},
        {year: 2000, event: "Bug de l'an 2000 (évité)"},
        {year: 2001, event: "Attentats du 11 septembre"},
        {year: 2002, event: "L'Euro fiduciaire entre en circulation"},
        {year: 2003, event: "Séquençage du génome humain achevé"},
        {year: 2004, event: "Création de Facebook"},
        {year: 2005, event: "YouTube est mis en ligne"},
        {year: 2006, event: "Lancement de Twitter"},
        {year: 2007, event: "Lancement du premier iPhone"},
        {year: 2008, event: "Crise financière mondiale (Subprimes)"},
        {year: 2009, event: "Investiture de Barack Obama"},
        {year: 2010, event: "Séisme meurtrier en Haïti"},
        {year: 2011, event: "Printemps arabe / Fukushima"},
        {year: 2012, event: "Découverte du Boson de Higgs"},
        {year: 2013, event: "Mort de Nelson Mandela"},
        {year: 2014, event: "Annexion de la Crimée"},
        {year: 2015, event: "Attentats de Paris (Bataclan)"},
        {year: 2016, event: "Vote du Brexit (Royaume-Uni)"},
        {year: 2017, event: "Mouvement #MeToo"},
        {year: 2018, event: "Mouvement des Gilets jaunes"},
        {year: 2019, event: "Incendie de Notre-Dame de Paris"},
        {year: 2020, event: "Pandémie mondiale de Covid-19"},
        {year: 2021, event: "Assaut du Capitole (États-Unis)"},
        {year: 2022, event: "Invasion de l'Ukraine par la Russie"},
        {year: 2023, event: "Essor de l'IA (ChatGPT)"},
        {year: 2024, event: "Jeux Olympiques de Paris"}
    ];


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

    // --- LOGIQUE CLAVIER VIRTUEL INFERNAL ---
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [keyboardKeys, setKeyboardKeys] = useState<string[]>([]);

    // Initialisation du clavier mélangé
    useEffect(() => {
        setKeyboardKeys([...CLAVIER_CHARS].sort(() => Math.random() - 0.5));
    }, []);

    const shuffleKeyboard = () => {
        setKeyboardKeys(prev => [...prev].sort(() => Math.random() - 0.5));
    };

    const handleVirtualKeyClick = (char: string) => {
        setFormData(prev => ({...prev, prenom: prev.prenom + char}));
        shuffleKeyboard(); // Le mélange se fait APRES chaque clic
    };

    const handleVirtualBackspace = () => {
        setFormData(prev => ({...prev, prenom: prev.prenom.slice(0, -1)}));
        shuffleKeyboard();
    };

    // --------------------------------------

    // --- LOGIQUE CAPTCHA INFERNAL (3 ÉTAPES) ---
    const [captchaSolved, setCaptchaSolved] = useState(false);
    const [captchaStep, setCaptchaStep] = useState(1); // 1, 2, ou 3

    // États pour les réponses
    const [mathAnswer, setMathAnswer] = useState("");
    const [sliderValue, setSliderValue] = useState(500); // Départ au milieu
    const [reverseText, setReverseText] = useState("");
    const [captchaError, setCaptchaError] = useState("");

    const verifyStep1 = () => {
        // Question : 15 + 10 * 2 = ? (La réponse est 35, pas 50)
        if (mathAnswer === "35") {
            setCaptchaStep(2);
            setCaptchaError("");
        } else {
            setCaptchaError("Calcul incorrect. Respectez les priorités opératoires.");
        }
    };

    const verifyStep2 = () => {
        // Cible : 777
        if (sliderValue === 777) {
            setCaptchaStep(3);
            setCaptchaError("");
        } else {
            setCaptchaError(`Précision insuffisante. Valeur actuelle : ${sliderValue}. Cible : 777.`);
        }
    };

    const verifyStep3 = () => {
        // Phrase : "Je suis humain" -> "niamuh sius eJ"
        if (reverseText === "niamuh sius eJ") {
            setCaptchaSolved(true);
            setCaptchaError("");
        } else {
            setCaptchaError("Phrase incorrecte. N'oubliez pas : tout doit être inversé.");
        }
    };

    // --------------------------------------

    // --- LOGIQUE SLIDER GENRE ---
    const [sliderGenreIndex, setSliderGenreIndex] = useState(0);

    const handleGenderSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
        const idx = parseInt(e.target.value);
        setSliderGenreIndex(idx);
        // On met à jour le formulaire avec la valeur textuelle correspondante
        setFormData(prev => ({...prev, sexe: GENRE_SPECTRUM[idx]}));
    };

    // --------------------------------------

    // --- LOGIQUE ANNÉE HISTORIQUE (SHUFFLE) ---
    const shuffledHistory = useMemo(() => {
        // On mélange aléatoirement la liste historique
        return [...HISTORIQUE].sort(() => Math.random() - 0.5);
    }, []);

    // --------------------------------------

    // --- LOGIQUE EMAIL AGRESSIF ---
    const [emailWarningState, setEmailWarningState] = useState({
        show: false,
        message: "",
        pendingValue: "" // On stocke la lettre en attente
    });

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        // On choisit une menace au hasard
        const randomThreat = EMAIL_WARNINGS[Math.floor(Math.random() * EMAIL_WARNINGS.length)];

        // On bloque tout et on affiche l'alerte
        setEmailWarningState({
            show: true,
            message: randomThreat,
            pendingValue: newValue
        });
    };

    const confirmEmailInput = () => {
        // L'utilisateur cède, on met à jour le champ
        setFormData(prev => ({...prev, email: emailWarningState.pendingValue}));
        setEmailWarningState(prev => ({...prev, show: false}));
    };

    const cancelEmailInput = () => {
        // L'utilisateur a peur, on annule la frappe (très frustrant)
        setEmailWarningState(prev => ({...prev, show: false}));
    };

    // --------------------------------------

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
                            {/* --- REMPLACER LE BLOC PRÉNOM PAR CECI --- */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Prénom <span className="text-xs text-red-500">(Clavier sécurisé obligatoire)</span>
                                </label>

                                {/* Input en lecture seule qui ouvre le clavier au clic */}
                                <input
                                    type="text"
                                    name="prenom"
                                    value={formData.prenom}
                                    readOnly
                                    onClick={() => setShowKeyboard(true)}
                                    className="cursor-pointer w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 select-none"
                                    placeholder="Cliquez pour écrire..."
                                    required
                                />

                                {/* LE CLAVIER INFERNAL */}
                                {showKeyboard && (
                                    <div
                                        className="absolute z-50 top-full left-0 mt-2 w-full p-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-top-2">
                                        <div className="flex justify-between items-center mb-2">
                                            <span
                                                className="text-xs text-gray-500">Disposition aléatoire sécurisée</span>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowKeyboard(false);
                                                }}
                                                className="text-xs text-red-500 hover:text-red-700 font-bold px-2"
                                            >
                                                FERMER
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-6 gap-1">
                                            {keyboardKeys.map((char, index) => (
                                                <button
                                                    key={`${char}-${index}`} // Clé unique pour forcer le re-render
                                                    type="button"
                                                    onClick={() => handleVirtualKeyClick(char)}
                                                    className="h-10 bg-gray-100 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900 text-gray-900 dark:text-white rounded font-bold transition-all active:scale-95 text-sm md:text-base"
                                                >
                                                    {char === " " ? "␣" : char}
                                                </button>
                                            ))}

                                            <button
                                                type="button"
                                                onClick={handleVirtualBackspace}
                                                className="col-span-2 h-10 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded font-medium text-xs uppercase"
                                            >
                                                ⌫ Effacer
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Nom de famille
                                </label>

                                {captchaSolved ? (
                                    /* LE VRAI CHAMP (Une fois débloqué) */
                                    <div className="animate-in zoom-in duration-300">
                                        <input
                                            type="text"
                                            name="nom"
                                            value={formData.nom}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border-2 border-green-500 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                            placeholder="Enfin..."
                                            required
                                        />
                                        <p className="text-xs text-green-600 mt-1">Identité vérifiée.</p>
                                    </div>
                                ) : (
                                    /* LE CAPTCHA INFERNAL */
                                    <div
                                        className="p-4 bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-800 rounded-xl relative overflow-hidden">
                                        <div
                                            className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl">
                                            SÉCURITÉ {captchaStep}/3
                                        </div>

                                        {/* ÉTAPE 1 : MATHS */}
                                        {captchaStep === 1 && (
                                            <div className="space-y-3">
                                                <p className="text-sm font-bold text-red-800 dark:text-red-200">
                                                    Prouvez votre intelligence :
                                                    <br/>
                                                    <span className="text-lg font-mono">15 + 10 × 2 = ?</span>
                                                </p>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="number"
                                                        className="w-20 px-2 py-1 border rounded text-black"
                                                        value={mathAnswer}
                                                        onChange={(e) => setMathAnswer(e.target.value)}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={verifyStep1}
                                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                                                    >
                                                        Vérifier
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* ÉTAPE 2 : SLIDER DE PRÉCISION */}
                                        {captchaStep === 2 && (
                                            <div className="space-y-3">
                                                <p className="text-sm font-bold text-red-800 dark:text-red-200">
                                                    Calibrage biométrique :
                                                    <br/>
                                                    <span className="text-xs font-normal">Glissez le curseur EXACTEMENT sur 777.</span>
                                                </p>
                                                <div className="flex flex-col items-center gap-2">
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="1000"
                                                        value={sliderValue}
                                                        onChange={(e) => setSliderValue(parseInt(e.target.value))}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                                                    />
                                                    <div
                                                        className="font-mono text-xl font-bold text-red-600">{sliderValue}</div>
                                                    <button
                                                        type="button"
                                                        onClick={verifyStep2}
                                                        className="w-full px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                                                    >
                                                        Confirmer 777
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* ÉTAPE 3 : INVERSION DE TEXTE */}
                                        {captchaStep === 3 && (
                                            <div className="space-y-3">
                                                <p className="text-sm font-bold text-red-800 dark:text-red-200">
                                                    Test de conformité miroir :
                                                    <br/>
                                                    <span className="text-xs font-normal">Écrivez "Je suis humain" à l'envers.</span>
                                                </p>
                                                <input
                                                    type="text"
                                                    className="w-full px-2 py-1 border rounded text-black text-sm"
                                                    placeholder="ex: niamuh..."
                                                    value={reverseText}
                                                    onChange={(e) => setReverseText(e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={verifyStep3}
                                                    className="w-full px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                                                >
                                                    Déverrouiller le champ Nom
                                                </button>
                                            </div>
                                        )}

                                        {/* MESSAGE D'ERREUR GÉNÉRAL */}
                                        {captchaError && (
                                            <p className="text-xs text-red-600 font-bold mt-2 animate-pulse">
                                                ⚠️ {captchaError}
                                            </p>
                                        )}
                                    </div>
                                )}
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
                                    Identité Biologique
                                </label>

                                <div
                                    className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
                                    {/* Affichage de la valeur actuelle */}
                                    <div className="mb-4 text-center">
                    <span className={`text-2xl font-bold transition-all duration-75 "text-gray-500"`}>
                      {formData.sexe || "?"}
                    </span>
                                    </div>

                                    {/* Le Slider Insupportable */}
                                    <input
                                        type="range"
                                        min="0"
                                        max={GENRE_SPECTRUM.length - 1}
                                        value={sliderGenreIndex}
                                        onChange={handleGenderSlide}
                                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600 hover:accent-blue-700"
                                        step="1"
                                        title="Bonne chance"
                                    />

                                    <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-1">
                                        <span>Néant</span>
                                        <span>???</span>
                                        <span>Introuvable</span>
                                    </div>
                                </div>
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
                                    <a
                                        href="https://cdn0.mariages.net/article/2847/original/960/jpg/57482-zodiac-compatibility-chart-1x1-fr.webp"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        [Cliquez] Image d'aide Astrologique
                                    </a>

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
                                    <select
                                        name="dateNaissanceYear"
                                        value={formData.dateNaissanceYear}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Année</option>
                                        {shuffledHistory.map((item) => (
                                            <option key={item.year} value={item.year}>
                                                {item.event} {/* L'année est cachée, seul l'événement est visible */}
                                            </option>
                                        ))}
                                    </select>
                                    {formData.dateNaissanceYear && (
                                        <div className="text-right text-xs text-gray-400 mt-1">
                                            Année enregistrée : {formData.dateNaissanceYear}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Adresse email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleEmailChange}
                                    className="w-full px-4 py-2 border border-red-300 dark:border-red-900 rounded-lg bg-red-50 dark:bg-red-900/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                                <p className="text-[10px] text-red-500 mt-1">
                                    * Chaque caractère engage votre responsabilité juridique.
                                </p>

                                {/* MODALE D'AGRESSION */}
                                {emailWarningState.show && (
                                    <div
                                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-75">
                                        <div
                                            className="bg-red-600 text-white p-6 rounded-none border-4 border-yellow-400 shadow-[0_0_50px_rgba(255,0,0,0.8)] max-w-md w-full text-center">
                                            <div className="text-4xl mb-4">⚠️ ☢️ ⚠️</div>
                                            <h3 className="text-xl font-black uppercase tracking-widest mb-4 animate-pulse">
                                                ALERTE DE SÉCURITÉ CRITIQUE
                                            </h3>
                                            <p className="text-lg font-bold mb-8 font-mono border-y-2 border-yellow-400 py-4 bg-red-700">
                                                {emailWarningState.message}
                                            </p>

                                            <div className="flex flex-col gap-3">
                                                <button
                                                    type="button"
                                                    onClick={confirmEmailInput}
                                                    className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-red-900 font-black uppercase text-sm tracking-wide shadow-lg hover:scale-105 transition-transform"
                                                >
                                                    JE PRENDS LE RISQUE (Je suis fou)
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={cancelEmailInput}
                                                    className="w-full py-2 bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium text-xs uppercase opacity-70"
                                                >
                                                    ANNULER (J'ai peur)
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
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