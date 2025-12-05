// Button.tsx
import { Link } from 'react-router';

interface ButtonProps {
    id: string;
    label: string;
    position: string;
    hoverColor: string;
}

export function Button({ id, label, position, hoverColor }: ButtonProps) {
    return (
        <Link
            to={`/${id}`}
            className={`block ${position} ${hoverColor} px-8 py-6 rounded-xl transition-all duration-300 hover:scale-110  hover:border-white/60 cursor-pointer group`}
        >
            <p className="text-with text-center  font-bold text-4xl">
                {label}
            </p>
        </Link>
    );
}