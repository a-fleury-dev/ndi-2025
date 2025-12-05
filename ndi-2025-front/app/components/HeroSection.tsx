// HeroSection.tsx
import { Link } from 'react-router';
import { SoundZone } from "~/components/SoundZone";
import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import {CircularWave} from "~/components/CircularWave";


export function HeroSection() {
    const [amplitudes, setAmplitudes] = useState([5, 4, 6, 3]);
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [audioStarted, setAudioStarted] = useState(false);
    const synthRef = useRef<Tone.FMSynth | null>(null);
    const animationRef = useRef<number | null>(null);
    const zoneRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleButtonEnter = (index: number) => {
        setAmplitudes(prev => {
            const newAmps = [...prev];
            newAmps[index] = 20;
            return newAmps;
        });
    };

    const handleButtonLeave = (index: number) => {
        if(synthRef.current) {
            synthRef.current.triggerRelease();
        }

        setAmplitudes(prev => {
            const newAmps = [...prev];
            newAmps[index] = [5, 4, 6, 3][index];
            return newAmps;
        });
    };

    const handleMouseMove = (e: React.MouseEvent, index: number) => {
        const zone = zoneRefs.current[index];
        if (!zone || !synthRef.current) return;

        const rect = zone.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const distance = Math.sqrt(
            Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
        );

        const maxDistance = Math.sqrt(
            Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2)
        );

        const normalizedDistance = distance / maxDistance;
        const volume = Math.max(0.05, 1 - normalizedDistance * 0.95);

        const audio = document.getElementById(String(index));

        synthRef.current.volume.value = Tone.gainToDb(volume);
    };

    useEffect(() => {
        synthRef.current = new Tone.FMSynth({
            harmonicity : 3,
            oscillator: { type: 'sine' },
            envelope: {
                attack: 0.1,
                decay: 0.2,
                sustain: 0.3,
                release: 0.8
            }
        }).toDestination();

        return () => {
            if (synthRef.current) {
                synthRef.current.dispose();
            }
        };
    }, []);


    // Jouer une note quand on survole un bouton
    const playNote = async (note: string, id: string, nb: number) => {
        // Démarrer l'audio context au premier hover (pas besoin de clic)
        if (!audioStarted) {
            try {
                await Tone.start();
                setAudioStarted(true);
            } catch (error) {
                console.log("Audio context needs user interaction");
                return; // Si ça échoue, on sort
            }
        }

        if (synthRef.current) {
            synthRef.current.triggerAttack(note);
            setActiveButton(id);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        }


        handleButtonEnter(nb);
    };

    /*const handleMouseLeave = () => {
        setActiveButton(null);
    };*/

    // Définition des zones avec styles personnalisés
    const zones: Zone[] = [
        {
            label: 'Inclusion\nPersonnes\nÂgées',
            note: 'C4',
            isActive: activeButton === 'elderly',
            onMouseEnter: () => playNote('C3', 'elderly', 0),
            onMouseLeave: () => handleButtonLeave(0),
            onMouseMove: (e) => handleMouseMove(e, 0),
            id: 'elderly',
            position: 'top-[0%] right-[0%]',
            hoverColor: 'hover:bg-[#F12FFD]/20',
        },
        {
            note: 'A5',
            isActive: activeButton === 'women',
            onMouseEnter: () => playNote('A3', 'women', 1),
            onMouseLeave: () => handleButtonLeave(1),
            onMouseMove: (e) => handleMouseMove(e, 1),
            id: 'women',
            label: 'Femmes dans l\'informatique',
            position: 'top-[5%] left+[0%]',
            hoverColor: 'hover:bg-[#9F33E6]/20',
        },
        {
            note: 'D5',
            isActive: activeButton === 'chatbot',
            onMouseEnter: () => playNote('D3', 'chatbot', 2),
            onMouseLeave: () => handleButtonLeave(2),
            onMouseMove: (e) => handleMouseMove(e, 2),
            id: 'chatbot',
            label: 'Chatbot\nTrompe',
            position: 'bottom-[15%] right-[0%]',
            hoverColor: 'hover:bg-[#FFD700]/20',
        },
        {
            note: 'G5',
            isActive: activeButton === 'reconditioning',
            onMouseEnter: () => playNote('G3', 'reconditioning', 3),
            onMouseLeave: () => handleButtonLeave(3),
            onMouseMove: (e) => handleMouseMove(e, 3),
            id: 'reconditioning',
            label: 'Les enjeux du\nreconditionnement',
            position: 'bottom-[10%] left-[0%]',
            hoverColor: 'hover:bg-[#0A83CE]/20',
        }
    ];

    return (
        <main className="relative h-screen overflow-hidden">
            {/* Gradient Background */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(circle 600px at 50% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.3) 70%, transparent 100%),
                        radial-gradient(ellipse at 20% 20%, #9F33E6 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 20%, #F12FFD 0%, transparent 50%),
                        radial-gradient(ellipse at 20% 80%, #0A83CE 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 80%, #FFD700 0%, transparent 50%),
                        linear-gradient(135deg, #3A36C3 0%, #9F33E6 25%, #F12FFD 50%, #FFD700 75%, #0A83CE 100%)
                    `
                }}
            />


            {/* Central Logo */}
            <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                {/* Composant Onde Circulaire */}
                <CircularWave amplitudes={amplitudes} onButtonEnter={handleButtonEnter} onButtonLeave={handleButtonLeave} />
            </div>

            {/* Zones + SoundZone avec styles personnalisés */}
            {zones.map((z,index) => (
                <div key={z.id} className={`absolute ${z.position} z-20`}
                     ref={(el) => { zoneRefs.current[index] = el; }}
                >
                    <SoundZone zone={z} />
                </div>
            ))}
        </main>
    );
}