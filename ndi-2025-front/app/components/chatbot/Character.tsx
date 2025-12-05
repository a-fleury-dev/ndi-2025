import { ImageWithFallback } from '~/components';

interface CharacterProps {
    name: string;
    imageUrl: string;
    isFlipped?: boolean;
    isAnimating?: boolean;
}

export function Character({ name, imageUrl, isFlipped = false, isAnimating = false }: CharacterProps) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className={`relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 shadow-lg transition-all duration-300 ${
                    isAnimating ? "scale-110" : "scale-100"
                } ${isFlipped ? "scale-x-[-1]" : ""}`}
            >
                <ImageWithFallback
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-md">
                <p className="text-sm">{name}</p>
            </div>
        </div>
    );
}