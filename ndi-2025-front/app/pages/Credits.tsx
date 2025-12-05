import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const assets = [
    { author: "Binley", name: "The recycling mascot", url: "https://skfb.ly/oGMzT" },
    { author: "edouard77", name: "Tablette", url: "https://skfb.ly/6WWAA" },
    { author: "Manuel W.", name: "Smartphone", url: "https://skfb.ly/6RLFN" },
    { author: "Renaulde", name: "Ordinateur", url: "https://skfb.ly/otMQp" },
    { author: "David Gvakharia", name: "Data center rack", url: "https://skfb.ly/otNIK" },
];

const sources = ["ADEME", "Climate Action Accelerator", "OECD"];

export default function Credits() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#3A36C3] via-[#9F33E6] to-[#F12FFD] flex flex-col p-8">
            <button
                onClick={() => navigate("/reconditioning")}
                className="flex items-center gap-2 text-white hover:text-[#F7DA38] transition-colors duration-300 group mb-8 cursor-pointer"
            >
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                <span>Retour</span>
            </button>

            <div className="flex-1 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/30 max-w-4xl w-full">
                    <h1 className="text-white text-4xl font-bold mb-8">Crédits</h1>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-[#F7DA38] text-2xl font-semibold mb-4">Modèles 3D</h2>
                            <div className="grid gap-3">
                                {assets.map((asset, index) => (
                                    <div key={index} className="bg-white/10 rounded-lg p-4 flex justify-between items-center">
                                        <div>
                                            <span className="text-white font-medium">{asset.name}</span>
                                            <span className="text-white/60 ml-2">par {asset.author}</span>
                                        </div>
                                        <a
                                            href={asset.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#0A83CE] hover:text-[#F12FFD] transition-colors"
                                        >
                                            Sketchfab ↗
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-[#F7DA38] text-2xl font-semibold mb-4">Sources</h2>
                            <div className="flex flex-wrap gap-3">
                                {sources.map((source, index) => (
                                    <span key={index} className="bg-white/10 rounded-lg px-4 py-2 text-white">
                                        {source}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
