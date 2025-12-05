// TypeScript
import type {Route} from "./+types/senior-form";
import {useState, useMemo, useEffect, useRef} from "react";
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

    const [submitCount, setSubmitCount] = useState(0);
    const SUBMIT_THRESHOLD = 50;
    const [submitted, setSubmitted] = useState(false);
    const [showSubmitPopup, setShowSubmitPopup] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmitClick = () => {
        if (submitted) return;

        // Bloquer le démarrage du compteur si le formulaire n'est pas complet
        if (!isFormComplete()) {
            setSubmitError("Veuillez remplir tous les champs obligatoires et valider le captcha avant de commencer la soumission.");
            return;
        }

        setSubmitCount(prev => {
            const next = prev + 1;
            if (next >= SUBMIT_THRESHOLD) {
                setSubmitted(true);
                console.log("Form finally submitted:", formData);
                setShowSubmitPopup(true);
                setSubmitError(null);
            }
            return next;
        });
    };


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
            matches: ["Bélier", "Gémeaux", "Balance", "Sagittaire", "Verseau"],
            start: {m: 5, d: 21}, end: {m: 6, d: 20}
        },
        "Cancer": {
            matches: ["Taureau", "Cancer", "Scorpion", "Capricorne", "Poissons"],
            start: {m: 6, d: 21}, end: {m: 7, d: 22}
        },
        "Lion": {
            matches: ["Bélier", "Balance", "Sagittaire", "Verseau"],
            start: {m: 7, d: 23}, end: {m: 8, d: 22}
        },
        "Vierge": {
            matches: ["Taureau", "Capricorne", "Poissons"],
            start: {m: 8, d: 23}, end: {m: 9, d: 22}
        },
        "Balance": {
            matches: ["Bélier", "Gémeaux", "Lion", "Balance", "Verseau"],
            start: {m: 9, d: 23}, end: {m: 10, d: 22}
        },
        "Scorpion": {
            matches: ["Taureau", "Cancer", "Scorpion", "Poissons"],
            start: {m: 10, d: 23}, end: {m: 11, d: 21}
        },
        "Sagittaire": {
            matches: ["Bélier", "Gémeaux", "Lion"],
            start: {m: 11, d: 22}, end: {m: 12, d: 21}
        },
        "Capricorne": {
            matches: ["Taureau", "Cancer", "Vierge"],
            start: {m: 12, d: 22}, end: {m: 1, d: 19}
        },
        "Verseau": {
            matches: ["Bélier", "Gémeaux", "Lion", "Balance"],
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

    const CITY_QUESTIONS = [
        "Combien de petites cuillères (en métal) possédez-vous exactement dans votre cuisine ?",
        "Quelle est la surface précise de votre salon (en millimètres carrés) ?",
        "À quelle heure exacte (seconde incluse) vous êtes-vous couché mardi dernier ?",
        "Combien de fenêtres chez vous sont orientées vers le Nord-Est ?",
        "Quel est le prénom de la grand-mère de votre premier animal de compagnie ?",
        "Quelle est la marque de votre troisième paire de chaussettes préférée ?",
        "Combien de fois par jour ouvrez-vous votre réfrigérateur sans rien prendre ?",
        "Si vous étiez un ustensile de cuisine, quel serait votre coefficient de friction ?",
        "Veuillez décrire l'odeur de votre tapis d'entrée en un seul mot.",
        "Confirmez-vous que vous n'êtes pas un robot en tapant le code de votre carte bleue (Non, je rigole... ou pas) ?"
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

    const emailCounter = useRef({count: 0, threshold: Math.floor(Math.random() * 3) + 2});

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        // On incrémente le compteur de frappes
        emailCounter.current.count++;

        // EST-CE QUE C'EST LE MOMENT DE L'AGRESSION ?
        if (emailCounter.current.count >= emailCounter.current.threshold) {
            // OUI : On déclenche l'alerte
            const randomThreat = EMAIL_WARNINGS[Math.floor(Math.random() * EMAIL_WARNINGS.length)];

            setEmailWarningState({
                show: true,
                message: randomThreat,
                pendingValue: newValue
            });

            // On remet le compteur à zéro et on définit un nouveau seuil aléatoire (2, 3 ou 4) pour la prochaine fois
            emailCounter.current.count = 0;
            emailCounter.current.threshold = Math.floor(Math.random() * 3) + 5;
        } else {
            // NON : On laisse l'utilisateur écrire tranquillement (pour l'instant...)
            setFormData(prev => ({...prev, email: newValue}));
        }
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

    // --- LOGIQUE VILLE DE NAISSANCE (IA STUPIDE) ---
    const [cityFlow, setCityFlow] = useState({
        isOpen: false,
        step: 0, // 0 à 9 pour les questions, 10 pour le chargement
        inputValue: "", // La réponse inutile de l'utilisateur
        isLoading: false,
        loadingText: "",
        isDone: false
    });

    const openCityFlow = () => {
        if (formData.villeDNaissance === "New York") return; // Déjà fait
        setCityFlow({isOpen: true, step: 0, inputValue: "", isLoading: false, loadingText: "", isDone: false});
    };

    const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // On capture la valeur immédiatement pour éviter les bugs de perte de focus
        const val = e.target.value;
        setCityFlow(prev => ({...prev, inputValue: val}));
    };

    const handleCityAnswerSubmit = () => {
        // Si champ vide, on ne fait rien
        if (!cityFlow.inputValue.trim()) return;

        if (cityFlow.step < CITY_QUESTIONS.length - 1) {
            // Question suivante
            setCityFlow(prev => ({
                ...prev,
                step: prev.step + 1,
                inputValue: ""
            }));
        } else {
            // Fin des questions -> Lancement du FAUX CHARGEMENT
            setCityFlow(prev => ({...prev, isLoading: true, inputValue: ""}));
            triggerFakeCityLoading();
        }
    };

    const triggerFakeCityLoading = () => {
        const steps = [
            "Analyse des réponses...",
            "Triangulation des cuillères...",
            "Calcul de la densité démographique du salon...",
            "Corrélation avec les données satellites...",
            "Interrogation de la base de données du FBI...",
            "Hésitation entre Paris et Tokyo...",
            "Application du coefficient d'incertitude...",
            "Génération du résultat probable..."
        ];

        let i = 0;
        // On change le texte toutes les 800ms
        const interval = setInterval(() => {
            setCityFlow(prev => ({...prev, loadingText: steps[i]}));
            i++;
            if (i >= steps.length) {
                clearInterval(interval);
                // FINALISATION : C'est toujours New York
                setTimeout(() => {
                    setFormData(prev => ({...prev, villeDNaissance: "New York"}));
                    setCityFlow(prev => ({...prev, isOpen: false, isDone: true}));
                }, 1000);
            }
        }, 800);
    };

    // --------------------------------------

    // Vérification simple que tous les champs requis sont présents et valides
    const isFormComplete = () => {
        const {
            prenom, nom, age, dateNaissanceMonth,
            dateNaissanceDay, dateNaissanceYear, email, telephone, villeDNaissance
        } = formData;

        // Prénom
        if (!prenom || !prenom.trim()) return false;

        // Le captcha doit être résolu pour accéder au champ nom (sécurité)
        if (!captchaSolved) return false;
        if (!nom || !nom.trim()) return false;

        // Age > 0
        if (!age || parseInt(age) <= 0) return false;

        // Date complète
        if (!dateNaissanceMonth || !dateNaissanceDay || !dateNaissanceYear) return false;

        // Email basique
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) return false;

        // Téléphone (au moins 10 chiffres assemblés)
        if (!telephone || telephone.replace(/\D/g, "").length < 10) return false;

        // Ville
        if (!villeDNaissance || !villeDNaissance.trim()) return false;

        return true;
    };

    useEffect(() => {
        if (isFormComplete()) {
            setSubmitError(null);
        }
    }, [formData, captchaSolved]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <main className="flex items-center justify-center min-h-screen py-8 bg-[#F0F4F8] font-sans selection:bg-[#F7D438] selection:text-black overflow-hidden relative">

            {/* DÉCOR D'ARRIÈRE PLAN (Blobs colorés) */}
            <div className="absolute top-[-0%] left-[-0%] w-[1500px] h-[500px] bg-[#F12FFD] rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[1500px] h-[500px] bg-[#F7D438] rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-0%] left-[0%] w-[1600px] h-[600px] bg-[#0A83CE] rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob animation-delay-4000"></div>

            <div className="w-full max-w-2xl px-4 relative z-10">
                <div className="relative rounded-3xl border-2 border-[#F12FFD] bg-white/90 backdrop-blur-xl shadow-[8px_8px_0px_0px_rgba(241,47,253,0.5)] p-8">

                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0A83CE] via-[#F12FFD] to-[#F7D438] mb-8 tracking-tighter uppercase drop-shadow-sm">
                        Formulaire d&apos;Information
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* --- BLOC PRÉNOM (Style Pop) --- */}
                            <div className="relative group">
                                <label className="block text-sm font-bold text-[#3A36C3] mb-2 uppercase tracking-wide">
                                    Prénom <span className="text-xs text-[#F12FFD] normal-case ml-1 font-bold">(Clavier sécurisé obligatoire)</span>
                                </label>

                                <input
                                    type="text"
                                    name="prenom"
                                    value={formData.prenom}
                                    readOnly
                                    onClick={() => setShowKeyboard(true)}
                                    className="cursor-pointer w-full px-4 py-3 border-2 border-[#0A83CE] rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F12FFD] focus:shadow-[4px_4px_0px_0px_#F12FFD] transition-all font-medium"
                                    placeholder="Cliquez pour écrire..."
                                    required
                                />

                                {/* LE CLAVIER INFERNAL (Version Claire) */}
                                {showKeyboard && (
                                    <div className="absolute z-50 top-full left-0 mt-3 w-full p-4 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border-2 border-[#3A36C3] animate-in fade-in slide-in-from-top-4">
                                        <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-2">
                                            <span className="text-xs text-[#0A83CE] font-bold">Disposition aléatoire sécurisée</span>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowKeyboard(false);
                                                }}
                                                className="text-xs text-[#F12FFD] hover:bg-[#F12FFD] hover:text-white font-bold px-2 py-1 rounded transition-colors"
                                            >
                                                FERMER
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-6 gap-2">
                                            {keyboardKeys.map((char, index) => (
                                                <button
                                                    key={`${char}-${index}`}
                                                    type="button"
                                                    onClick={() => handleVirtualKeyClick(char)}
                                                    className="h-10 bg-gray-50 border border-gray-200 hover:bg-[#F7D438] hover:border-[#F7D438] hover:text-black text-gray-700 rounded-lg font-bold transition-all active:scale-95 text-sm md:text-base shadow-sm"
                                                >
                                                    {char === " " ? "␣" : char}
                                                </button>
                                            ))}

                                            <button
                                                type="button"
                                                onClick={handleVirtualBackspace}
                                                className="col-span-2 h-10 bg-[#F12FFD]/10 border border-[#F12FFD] text-[#F12FFD] hover:bg-[#F12FFD] hover:text-white rounded-lg font-bold text-xs uppercase transition-all"
                                            >
                                                ⌫ Effacer
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* --- BLOC NOM (Captcha Pop) --- */}
                            <div>
                                <label className="block text-sm font-bold text-[#3A36C3] mb-2 uppercase tracking-wide">
                                    Nom de famille
                                </label>

                                {captchaSolved ? (
                                    <div className="animate-in zoom-in duration-300">
                                        <input
                                            type="text"
                                            name="nom"
                                            value={formData.nom}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border-2 border-[#0A83CE] rounded-xl bg-white text-gray-900 focus:outline-none focus:shadow-[4px_4px_0px_0px_#0A83CE]"
                                            placeholder="Enfin..."
                                            required
                                        />
                                        <p className="text-xs text-[#0A83CE] mt-1 font-bold">✓ Identité vérifiée.</p>
                                    </div>
                                ) : (
                                    <div className="p-4 bg-[#F7D438]/20 border-2 border-[#F7D438] rounded-xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 bg-[#F7D438] text-black text-xs font-black px-2 py-1 rounded-bl">
                                            SÉCURITÉ {captchaStep}/3
                                        </div>

                                        {/* ÉTAPE 1 : MATHS */}
                                        {captchaStep === 1 && (
                                            <div className="space-y-3">
                                                <p className="text-sm font-bold text-[#3A36C3]">
                                                    Prouvez votre intelligence :
                                                    <br />
                                                    <span className="text-lg font-mono text-black">15 + 10 × 2 = ?</span>
                                                </p>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="number"
                                                        className="w-20 px-2 py-1 bg-white border-2 border-[#F7D438] rounded text-black focus:outline-none"
                                                        value={mathAnswer}
                                                        onChange={(e) => setMathAnswer(e.target.value)}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={verifyStep1}
                                                        className="px-3 py-1 bg-[#F7D438] text-black font-bold rounded hover:bg-[#F12FFD] hover:text-white transition-colors text-sm shadow-sm"
                                                    >
                                                        Vérifier
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* ÉTAPE 2 : SLIDER */}
                                        {captchaStep === 2 && (
                                            <div className="space-y-3">
                                                <p className="text-sm font-bold text-[#3A36C3]">
                                                    Calibrage biométrique :
                                                    <br />
                                                    <span className="text-xs font-normal text-gray-600">Glissez le curseur EXACTEMENT sur 777.</span>
                                                </p>
                                                <div className="flex flex-col items-center gap-2">
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="1000"
                                                        value={sliderValue}
                                                        onChange={(e) => setSliderValue(parseInt(e.target.value))}
                                                        className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer border border-gray-300 accent-[#F12FFD]"
                                                    />
                                                    <div className="font-mono text-xl font-bold text-[#F12FFD]">{sliderValue}</div>
                                                    <button
                                                        type="button"
                                                        onClick={verifyStep2}
                                                        className="w-full px-3 py-1 bg-[#F7D438] text-black font-bold rounded hover:bg-[#F12FFD] hover:text-white text-sm transition-colors"
                                                    >
                                                        Confirmer 777
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* ÉTAPE 3 : INVERSION */}
                                        {captchaStep === 3 && (
                                            <div className="space-y-3">
                                                <p className="text-sm font-bold text-[#3A36C3]">
                                                    Test de conformité miroir :
                                                    <br />
                                                    <span className="text-xs font-normal text-gray-600">Écrivez "Je suis humain" à l'envers.</span>
                                                </p>
                                                <input
                                                    type="text"
                                                    className="w-full px-2 py-1 bg-white border-2 border-[#F7D438] rounded text-black text-sm focus:outline-none"
                                                    placeholder="ex: niamuh..."
                                                    value={reverseText}
                                                    onChange={(e) => setReverseText(e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={verifyStep3}
                                                    className="w-full px-3 py-1 bg-[#F7D438] text-black font-bold rounded hover:bg-[#F12FFD] hover:text-white text-sm transition-colors"
                                                >
                                                    Déverrouiller le champ Nom
                                                </button>
                                            </div>
                                        )}

                                        {captchaError && (
                                            <p className="text-xs text-[#F12FFD] font-bold mt-2 animate-pulse">
                                                ⚠️ {captchaError}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* --- AGE D6 --- */}
                            <div>
                                <label className="block text-sm font-bold text-[#3A36C3] mb-2 uppercase tracking-wide">
                                    Âge
                                </label>
                                <div className="p-4 border-2 border-[#F12FFD]/50 rounded-xl bg-[#F12FFD]/5 relative">
                                    <div className="flex items-center justify-between mb-3">
                                <span className="text-4xl font-black text-[#3A36C3]">
                                    {formData.age} <span className="text-lg text-gray-500 font-medium">ans</span>
                                </span>
                                        {lastRoll && (
                                            <span className="text-sm font-bold text-[#F7D438] bg-black px-2 py-1 rounded animate-bounce">
                                        + {lastRoll} 🎲
                                    </span>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={handleRollDice}
                                            className="flex-1 px-3 py-3 bg-[#F12FFD] hover:bg-[#D902E6] text-white text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95 shadow-[4px_4px_0px_0px_rgba(241,47,253,0.3)]"
                                        >
                                            <span>Lancer le dé</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleResetAge}
                                            className="px-3 py-3 bg-white border-2 border-[#F12FFD] text-[#F12FFD] hover:bg-[#F12FFD] hover:text-white rounded-lg transition-colors text-sm font-bold"
                                            title="Recommencer à 0 (Si vous avez dépassé votre âge)"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                    <input type="hidden" name="age" value={formData.age} required />
                                </div>
                            </div>

                            {/* --- IDENTITÉ BIOLOGIQUE --- */}
                            <div>
                                <label className="block text-sm font-bold text-[#3A36C3] mb-2 uppercase tracking-wide">
                                    Identité Biologique
                                </label>

                                <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                                    <div className="mb-4 text-center h-8">
                                <span className="text-xl font-black text-[#0A83CE] transition-all duration-75">
                                    {formData.sexe || "?"}
                                </span>
                                    </div>

                                    <input
                                        type="range"
                                        min="0"
                                        max={GENRE_SPECTRUM.length - 1}
                                        value={sliderGenreIndex}
                                        onChange={handleGenderSlide}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0A83CE]"
                                        step="1"
                                        title="Bonne chance"
                                    />

                                    <div className="flex justify-between text-[10px] text-gray-400 mt-2 px-1 font-bold uppercase">
                                        <span>Néant</span>
                                        <span>???</span>
                                        <span>Introuvable</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- ASTROLOGIE --- */}
                        <div className="p-6 border-2 border-[#3A36C3] rounded-2xl bg-[#3A36C3]/5 relative overflow-hidden">
                            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-[#F7D438] rounded-full blur-2xl opacity-40"></div>

                            <label className="block text-sm font-bold text-[#3A36C3] mb-4 relative z-10">
                                Identification Astrologique de votre date de naissance
                                <br />
                                <span className="text-xs font-normal text-gray-500">
                            Identifiez votre signe astro en cochant tous les signes compatibles avec celui-ci.
                        </span>
                                <p className="mt-2">
                                    <a
                                        href="https://cdn0.mariages.net/article/2847/original/960/jpg/57482-zodiac-compatibility-chart-1x1-fr.webp"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#F12FFD] font-bold underline text-xs hover:text-[#0A83CE] transition-colors"
                                    >
                                        [Cliquez] Image d&apos;aide Astrologique
                                    </a>
                                </p>
                            </label>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6 relative z-10">
                                {SIGNES.map(signe => (
                                    <label key={signe} className="flex items-center space-x-2 cursor-pointer p-2 bg-white rounded-lg border border-gray-200 hover:border-[#F12FFD] hover:shadow-md transition-all select-none group">
                                        <input
                                            type="checkbox"
                                            checked={selectedCompatibilities.includes(signe)}
                                            onChange={() => toggleCompatibility(signe)}
                                            className="w-4 h-4 text-[#3A36C3] rounded border-gray-300 focus:ring-[#F7D438]"
                                        />
                                        <span className="text-xs sm:text-sm text-gray-600 group-hover:text-[#F12FFD] font-medium">{signe}</span>
                                    </label>
                                ))}
                            </div>

                            {detectedSign ? (
                                <div className="mb-6 text-center p-3 bg-[#F7D438] text-black rounded-lg text-sm font-bold animate-pulse shadow-sm border-2 border-black/10">
                                    ✨ Signe identifié : {detectedSign} ✨
                                </div>
                            ) : (
                                <div className="mb-6 text-center p-2 bg-white/50 text-gray-500 rounded-lg text-xs italic border border-dashed border-gray-300">
                                    En attente d&apos;une combinaison de compatibilité parfaite...
                                </div>
                            )}

                            <div className={`grid grid-cols-3 gap-4 transition-all duration-500 ${detectedSign ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                                <div className="relative">
                                    <select
                                        name="dateNaissanceMonth"
                                        value={formData.dateNaissanceMonth}
                                        onChange={handleChange}
                                        disabled={!detectedSign}
                                        className="w-full px-4 py-2 border-2 border-[#3A36C3] rounded-lg bg-white text-gray-900 focus:outline-none focus:border-[#F12FFD] appearance-none font-medium"
                                        required
                                    >
                                        <option value="">Mois</option>
                                        {availableMonths.map(m => (
                                            <option key={m} value={String(m).padStart(2, "0")}>
                                                {new Date(0, m - 1).toLocaleString('fr-FR', { month: 'long' })}
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
                                        className="w-full px-4 py-2 border-2 border-[#3A36C3] rounded-lg bg-white text-gray-900 focus:outline-none focus:border-[#F12FFD] appearance-none font-medium"
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
                                        className="w-full px-4 py-2 border-2 border-[#3A36C3] rounded-lg bg-white text-gray-900 focus:outline-none focus:border-[#F12FFD] appearance-none text-xs overflow-hidden font-medium"
                                        required
                                    >
                                        <option value="">Année</option>
                                        {shuffledHistory.map((item) => (
                                            <option key={item.year} value={item.year}>
                                                {item.event}
                                            </option>
                                        ))}
                                    </select>
                                    {formData.dateNaissanceYear && (
                                        <div className="text-right text-xs text-[#F12FFD] mt-1 font-bold">
                                            Année enregistrée : {formData.dateNaissanceYear}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* --- EMAIL --- */}
                            <div className="relative">
                                <label className="block text-sm font-bold text-[#3A36C3] mb-2 uppercase tracking-wide">
                                    Adresse email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleEmailChange}
                                    className="w-full px-4 py-3 border-2 border-[#F12FFD] rounded-xl bg-white text-gray-900 focus:outline-none focus:shadow-[4px_4px_0px_0px_#F12FFD] placeholder-gray-400"
                                    placeholder="exemple@danger.net"
                                    required
                                />
                                <p className="text-[10px] text-[#F12FFD] mt-1 font-bold">
                                    * Chaque caractère engage votre responsabilité juridique.
                                </p>

                                {/* MODALE EMAIL */}
                                {emailWarningState.show && (
                                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3A36C3]/80 backdrop-blur-md p-4 animate-in fade-in duration-100">
                                        <div className="bg-white border-4 border-[#F7D438] shadow-2xl p-8 max-w-md w-full text-center relative overflow-hidden rounded-3xl">
                                            <div className="text-4xl mb-4">⚠️ ☢️ ⚠️</div>
                                            <h3 className="text-xl font-black text-[#F7D438] uppercase tracking-widest mb-4">
                                                ALERTE DE SÉCURITÉ CRITIQUE
                                            </h3>
                                            <p className="text-gray-900 mb-8 font-bold font-mono py-4 bg-[#F7D438]/20 rounded-lg">
                                                {emailWarningState.message}
                                            </p>

                                            <div className="flex flex-col gap-3">
                                                <button
                                                    type="button"
                                                    onClick={confirmEmailInput}
                                                    className="w-full py-3 bg-[#F7D438] hover:bg-[#F12FFD] hover:text-white text-black font-black uppercase text-sm tracking-wide transition-all shadow-[4px_4px_0px_0px_black] active:translate-y-1 active:shadow-none"
                                                >
                                                    JE PRENDS LE RISQUE (Je suis fou)
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={cancelEmailInput}
                                                    className="w-full py-2 bg-transparent border-2 border-gray-200 text-gray-500 hover:text-black font-medium text-xs uppercase"
                                                >
                                                    ANNULER (J&apos;ai peur)
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* --- TELEPHONE --- */}
                            <div>
                                <label className="block text-sm font-bold text-[#3A36C3] mb-2 uppercase tracking-wide">
                                    Numéro de téléphone
                                </label>
                                <div className="flex gap-1">
                                    {phoneOptions.map((options, index) => (
                                        <div key={index} className="flex-1 min-w-0">
                                            <select
                                                value={getPhonePartValue(index)}
                                                onChange={(e) => handlePhoneChange(index, e.target.value)}
                                                className="w-full px-0 py-3 text-sm border-2 border-[#0A83CE] bg-white text-gray-900 focus:outline-none focus:bg-[#0A83CE] focus:text-white appearance-none text-center rounded-lg font-bold"
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
                                <input type="hidden" name="telephone" value={formData.telephone} required />
                            </div>
                        </div>

                        {/* --- VILLE --- */}
                        <div>
                            <label className="block text-sm font-bold text-[#3A36C3] mb-2 uppercase tracking-wide">
                                Ville de naissance
                            </label>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="villeDNaissance"
                                    value={formData.villeDNaissance}
                                    readOnly={!cityFlow.isDone}
                                    onChange={handleChange}
                                    placeholder={cityFlow.isDone ? "Corrigez l'IA si vous l'osez..." : "En attente d'analyse..."}
                                    className={`flex-1 px-4 py-3 border-2 rounded-xl transition-colors font-medium ${
                                        cityFlow.isDone
                                            ? "bg-white border-[#F12FFD] text-gray-900 focus:ring-2 focus:ring-[#F12FFD]"
                                            : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={openCityFlow}
                                    disabled={formData.villeDNaissance === "New York"}
                                    className="px-6 py-2 bg-[#3A36C3] hover:bg-[#F12FFD] text-white rounded-xl text-sm font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {formData.villeDNaissance === "New York" ? "Analyse Terminée" : "Lancer l'IA"}
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-1">
                                * Nous utilisons vos données domestiques pour déduire votre origine.
                            </p>

                            {/* MODALE VILLE (Light Mode) */}
                            {cityFlow.isOpen && (
                                <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#3A36C3]/50 backdrop-blur-lg p-4 animate-in zoom-in duration-200">
                                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border-2 border-[#3A36C3]">
                                        {/* En-tête */}
                                        <div className="bg-[#3A36C3] p-4 text-white">
                                            <h3 className="text-lg font-bold flex items-center gap-2">
                                                🧠 Algorithme de Déduction Spatiale
                                            </h3>
                                            {!cityFlow.isLoading && (
                                                <div className="text-xs bg-white/20 px-2 py-1 rounded mt-1 inline-block">
                                                    Question {cityFlow.step + 1} / {CITY_QUESTIONS.length}
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-8">
                                            {cityFlow.isLoading ? (
                                                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                                                    <div className="w-16 h-16 border-4 border-[#F12FFD]/30 border-t-[#F12FFD] rounded-full animate-spin"></div>
                                                    <p className="text-[#3A36C3] font-bold text-center animate-pulse">
                                                        {cityFlow.loadingText || "Initialisation..."}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col">
                                                    <p className="text-xl font-bold text-gray-900 mb-6 text-center">
                                                        {CITY_QUESTIONS[cityFlow.step]}
                                                    </p>

                                                    <input
                                                        type="text"
                                                        autoFocus
                                                        value={cityFlow.inputValue}
                                                        onChange={handleCityInputChange}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();
                                                                handleCityAnswerSubmit();
                                                            }
                                                        }}
                                                        className="w-full px-4 py-4 border-b-2 border-[#3A36C3] text-center text-lg rounded-none focus:border-[#F12FFD] outline-none bg-transparent text-gray-900 mb-8 placeholder-gray-300"
                                                        placeholder="Soyez précis..."
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={handleCityAnswerSubmit}
                                                        className="w-full py-4 bg-[#F7D438] hover:bg-[#F12FFD] hover:text-white text-black font-black text-lg uppercase tracking-wider rounded-xl transition-all shadow-[4px_4px_0px_0px_black] active:translate-y-1 active:shadow-none"
                                                    >
                                                        {cityFlow.step === CITY_QUESTIONS.length - 1 ? "CALCULER MA VILLE" : "Question Suivante →"}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* MODALE SUCCESS */}
                        {showSubmitPopup && (
                            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white/80 backdrop-blur-md p-4">
                                <div className="bg-white p-1 rounded-2xl max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-2 border-[#F12FFD]">
                                    <div className="bg-white rounded-xl p-8 text-center">
                                        <h3 className="text-2xl font-black text-[#3A36C3] mb-4 uppercase">Confirmation</h3>
                                        <p className="text-sm text-gray-600 mb-8 leading-relaxed font-medium">
                                            Bravo, vous avez réussi à soumettre le formulaire !
                                            <br />
                                            Vous avez pu vous mettre à la place d&apos;un sénior face aux défis du numérique.
                                            <br />
                                            Votre participation contribue à rendre le numérique plus inclusif pour les
                                            séniors et pour les personnes les moins habituées à nos outils numériques.
                                        </p>
                                        <div className="flex gap-2 justify-center">
                                            <Link to={`/`}>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowSubmitPopup(false)}
                                                    className="px-6 py-3 bg-[#0A83CE] text-white font-bold rounded-full hover:bg-[#3A36C3] transition-colors shadow-lg"
                                                >
                                                    Fermer
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="pt-8 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleSubmitClick}
                                disabled={!isFormComplete() || submitted}
                                className="w-full px-6 py-5 bg-gradient-to-r from-[#F7D438] to-[#F12FFD] hover:to-[#0A83CE] text-white text-xl font-black uppercase tracking-widest rounded-2xl transition-all shadow-[0_10px_20px_rgba(241,47,253,0.3)] hover:shadow-[0_15px_30px_rgba(241,47,253,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform hover:-translate-y-1"
                                style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}
                            >
                                {submitted ? "Envoyé ✓" : `Soumettre (${submitCount}/${SUBMIT_THRESHOLD})`}
                            </button>
                            {submitError && (
                                <div className="mt-4 text-center p-3 bg-[#F12FFD]/10 text-[#F12FFD] rounded-lg border-2 border-[#F12FFD] text-sm font-bold animate-shake">
                                    {submitError}
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
