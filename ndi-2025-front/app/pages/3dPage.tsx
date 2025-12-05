import React, { useState } from "react";
import ThreeScene from "~/components/3d/ThreeScene";

const slides = [
    { model: "/models/smartphone/smartphone.gltf", title: "Smartphone", description: `
    Les smartphones et tablettes font partie des équipements numériques les plus présents dans notre quotidien — mais aussi de ceux dont l’impact environnemental, sur l’ensemble du cycle de vie (extraction des matières premières, fabrication, usage, fin de vie), est le plus important.\n
    - Impact global : Les terminaux (smartphones, tablettes, ordinateurs) représenteraient une part très majeure (jusqu’à 60 – 90 %) de l’impact environnemental total du numérique.\n
    - Empreinte carbone & ressources : La production d’un appareil neuf consomme de l’énergie, de l’eau, des matières premières — y compris des métaux rares — et génère des émissions de CO₂ conséquentes.\n
    - Reconditionné = forte réduction d’impact : Selon une étude commandée par ADEME (Agence de la transition écologique), acquérir un smartphone ou une tablette reconditionnés permet de réduire de 64 % à 87 % l’impact annuel (par rapport à un appareil neuf) pour les smartphones, et de 46 % à 80 % pour les tablettes.\n
    - Autres bénéfices : Le reconditionné réduit la demande en extraction de nouvelles ressources, diminue les déchets électroniques (e-waste), et prolonge la durée de vie des appareils — ce qui est essentiel pour limiter l’empreinte écologique du numérique.\n
    `, position: [0, 0, 0] as [number, number, number], scale: 1 },
    { model: "/models/ordinateur/scene.gltf", title: "Ordinateur", description: `
    L’ordinateur — portable ou de bureau — constitue lui aussi une part importante de l’impact environnemental du numérique.\n
    - Impact des terminaux : Les ordinateurs — comme les autres terminaux — sont dans le lot des équipements responsables de la majorité de l’empreinte environnementale du numérique.\n
    - Consommation de ressources & fabrication : La fabrication d’un ordinateur nécessite l’usage de nombreuses ressources, de métaux (dont certains peuvent être rares), d’énergie et d’eau.\n
    - Reconditionnés : réduction massive de l’impact : Toujours selon l’étude de l’ADEME, un ordinateur portable ou fixe reconditionné peut offrir une réduction d’impact variable, entre 43 % et 97 % par rapport à un appareil neuf. \n
    - Allonger la durée de vie : En prolongeant la durée de vie d’un ordinateur (le garder 4–5 ans, voire plus, plutôt que le remplacer fréquemment), on limite la production de nouveaux appareils, les déchets électroniques et l’empreinte carbone globale.\n
    `, position: [0, -0.4, 0] as [number, number, number], scale: 0.7 },
    { model: "/models/data_center_rack/scene.gltf", title: "Data Center", description: `
    Même si les appareils individuels (smartphones, ordinateurs…) sont une grosse source d’impact, les infrastructures — serveurs, data centers, réseaux — jouent aussi un rôle non négligeable dans le bilan environnemental du numérique global.\n
    - Selon une étude récente, les appareils utilisateurs représentent la majeure partie des émissions de CO₂ du secteur des technologies de l’information et de la communication (TIC), mais les data centers pèsent tout de même, avec les réseaux, une part non négligeable — dans un contexte mondial.\n
    - Les data centers consomment énormément d’énergie (refroidissement, fonctionnement continu, etc.), et l’essor de la demande en services cloud, streaming, stockage, IA, etc., accentue cette consommation à l’échelle planétaire. \n
    - Toutefois, limiter l’impact des data centers ne passe pas par le reconditionnement — mais plutôt par l’optimisation énergétique, le recours aux énergies renouvelables, et la réduction de la consommation globale (en se posant la question « ce service numérique est-il indispensable ? »).\n
    `, position: [0, -1, 0] as [number, number, number], scale: 1 },
    { model: "/models/tablette/scene.gltf", title: "Tablette", description: `
    Les smartphones et tablettes font partie des équipements numériques les plus présents dans notre quotidien — mais aussi de ceux dont l’impact environnemental, sur l’ensemble du cycle de vie (extraction des matières premières, fabrication, usage, fin de vie), est le plus important.\n
    - Impact global : Les terminaux (smartphones, tablettes, ordinateurs) représenteraient une part très majeure (jusqu’à 60 – 90 %) de l’impact environnemental total du numérique.\n
    - Empreinte carbone & ressources : La production d’un appareil neuf consomme de l’énergie, de l’eau, des matières premières — y compris des métaux rares — et génère des émissions de CO₂ conséquentes.\n
    - Reconditionné = forte réduction d’impact : Selon une étude commandée par ADEME (Agence de la transition écologique), acquérir un smartphone ou une tablette reconditionnés permet de réduire de 64 % à 87 % l’impact annuel (par rapport à un appareil neuf) pour les smartphones, et de 46 % à 80 % pour les tablettes.\n
    - Autres bénéfices : Le reconditionné réduit la demande en extraction de nouvelles ressources, diminue les déchets électroniques (e-waste), et prolonge la durée de vie des appareils — ce qui est essentiel pour limiter l’empreinte écologique du numérique.\n
    `, position: [0, 0, 0] as [number, number, number], scale: 0.0019 },
    {model: "/models/poubelle/scene.gltf", title: "Reconditionné", description: `
    Mettre en avant le reconditionné, l’occasion ou la prolongation de la durée de vie des appareils (smartphones, tablettes, ordinateurs) est en réalité l’un des leviers les plus efficaces pour réduire l’empreinte écologique du numérique. Voici pourquoi :\n
    - Réduction de l’impact carbone : comme vu, l’impact d’un appareil reconditionné peut être réduit de 40 % à presque 90 % selon les cas. \n
    - Diminution de la consommation de ressources : moins de matières premières extraites, moins de métaux rares utilisés, moins de plastiques neufs…\n
    - Réduction des déchets électroniques (e-waste) : en remettant en circulation des appareils encore fonctionnels, on évite qu’ils finissent inutilement à la poubelle.\n
    - Moindre empreinte eau / ressources : le reconditionné évite une partie significative de l’impact lié à la fabrication (eau, énergie, matières).\n
    `, position: [0, -1, 0] as [number, number, number], scale: 1.5}
];

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRotating, setIsRotating] = useState(true);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <div style={{ display: "flex", height: "100vh", alignItems: "center" }}>
            {/* Flèche gauche */}
            <button onClick={handlePrev} style={arrowStyle}>
                ◀
            </button>

            <button
                onClick={() => setIsRotating(!isRotating)}
                style={{ position: "absolute", top: "1rem", right: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
            >
                {isRotating ? "Pause" : "Play"}
            </button>

            {/* Scène 3D */}
            <div style={{ flex: 2, height: "100%" }}>
                <ThreeScene
                    modelUrl={slides[currentIndex].model}
                    rotating={isRotating}
                    position={slides[currentIndex].position}
                    scale={slides[currentIndex].scale}
                />
            </div>

            {/* Texte à droite */}
            <div style={{ flex: 1, padding: "2rem" }}>
                <h1><strong>{slides[currentIndex].title}</strong></h1>
                <p style={{ whiteSpace: "pre-line" }}>{slides[currentIndex].description}</p>

            </div>

            {/* Flèche droite */}
            <button onClick={handleNext} style={arrowStyle}>
                ▶
            </button>
        </div>
    );
}

const arrowStyle: React.CSSProperties = {
    fontSize: "2rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "1rem",
};
