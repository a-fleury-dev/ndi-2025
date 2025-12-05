import { useEffect, useRef, useState } from 'react';

interface CircularWaveProps {
    amplitudes: number[];
    onButtonEnter: (index: number) => void;
    onButtonLeave: (index: number) => void;
}
export function CircularWave({ amplitudes, onButtonEnter, onButtonLeave }: CircularWaveProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let time = 0;

        function draw() {
            // Effacer le canvas
            if (!canvas) return;
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Centre du cercle
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Nombre de points pour dessiner le cercle
            const points = 100;

            // Tableau de cercles avec même taille mais différentes caractéristiques
            const circles = [
                { baseRadius: 190, waveCount: 6, speed: 1, amplitude: amplitudes[0], color: 'rgba(58, 54, 195, 0.3)' },
                { baseRadius: 190, waveCount: 8, speed: 1.2, amplitude: amplitudes[1], color: 'rgba(241, 47, 253, 0.3)' },
                { baseRadius: 190, waveCount: 5, speed: 0.8, amplitude: amplitudes[2], color: 'rgba(159, 51, 230, 0.4)' },
                { baseRadius: 190, waveCount: 7, speed: 1.5, amplitude: amplitudes[3], color: 'rgba(10, 131, 206, 0.4)' }
            ];

            // Dessiner chaque cercle
            circles.forEach(circle => {
                ctx.beginPath();

                for (let i = 0; i <= points; i++) {
                    // Angle actuel (de 0 à 2π pour faire un cercle complet)
                    const angle = (i / points) * Math.PI * 2;

                    // Calcul de l'onde sinusoïdale qui oscille (sans rotation)
                    const wave = Math.sin(angle * circle.waveCount + time * circle.speed * 0) * circle.amplitude * Math.sin(time * circle.speed);

                    // Rayon avec l'onde
                    const radius = circle.baseRadius + wave;

                    // Position x, y sur le cercle
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;

                    // Dessiner
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }

                ctx.closePath();

                // Style pour chaque cercle (contour seulement)
                ctx.strokeStyle = circle.color.replace('0.3', '0.8').replace('0.4', '0.9');
                ctx.lineWidth = 2;
                ctx.stroke();
            });

            // Incrémenter le temps pour l'animation
            time += 0.05;

            // Continuer l'animation
            requestAnimationFrame(draw);
        }

        // Démarrer l'animation
        draw();
    }, [amplitudes]);

    /*const handleButtonEnter = (index: number) => {
        // Augmenter l'amplitude du cercle correspondant
        setAmplitudes(prev => {
            const newAmps = [...prev];
            newAmps[index] = 20; // Amplitude augmentée
            return newAmps;
        });
    };

    const handleButtonLeave = (index: number) => {
        // Réinitialiser l'amplitude du cercle
        setAmplitudes(prev => {
            const newAmps = [...prev];
            newAmps[index] = [5, 4, 6, 3][index]; // Retour à la valeur initiale
            return newAmps;
        });
    };*/

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  gap-8">
            <canvas
                ref={canvasRef}
                width={500}
                height={500}
                className=""
            />
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                <img
                    src="/nird-logo.png"
                    alt="NIRD - Numérique Inclusif Responsable Durable"
                    className="w-96 h-auto drop-shadow-2xl"
                />
            </div>
        </div>
    );
}