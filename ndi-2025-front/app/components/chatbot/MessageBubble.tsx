interface MessageBubbleProps {
    text: string;
    speaker: "user" | "trompe" | "scientist" | "system";
}

export function MessageBubble({ text, speaker }: MessageBubbleProps) {
    return (
        <div
            className={`flex animate-slideIn ${
                speaker === "user"
                    ? "justify-center"
                    : speaker === "trompe"
                        ? "justify-end"
                        : "justify-start"
            }`}
        >
            <div
                className={`px-4 py-3 rounded-2xl max-w-md shadow-md ${
                    speaker === "user"
                        ? "bg-white text-gray-800"
                        : speaker === "trompe"
                            ? "bg-red-500 text-white"
                            : "bg-blue-500 text-white"
                }`}
            >
                <p className="text-sm">{text}</p>
            </div>
        </div>
    );
}