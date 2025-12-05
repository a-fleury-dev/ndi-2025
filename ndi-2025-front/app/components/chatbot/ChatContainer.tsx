import { useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { MessageBubble } from "~/components";
import type {Message} from "~/types";

const TypingIndicator = ({ speaker }: { speaker: "trompe" | "scientist" }) => {
    const bgColor = speaker === "scientist" ? "bg-emerald-100" : "bg-orange-100";

    return (
        <div className={`flex ${speaker === "scientist" ? "justify-start" : "justify-end"} mb-4`}>
            <div className={`${bgColor} rounded-2xl px-4 py-3 max-w-xs`}>
                <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
            </div>
        </div>
    );
};

interface ChatContainerProps {
    messages: Message[];
    input: string;
    setInput: (value: string) => void;
    onSendMessage: () => void;
    isProcessing: boolean;
    showScientistButton: boolean;
    whoIsTyping: "trompe" | "scientist" | null;
    onAskScientist: () => void;
}

export function ChatContainer({
                                  messages,
                                  input,
                                  setInput,
                                  onSendMessage,
                                  isProcessing,
                                  showScientistButton,
                                  whoIsTyping,
                                  onAskScientist,
                              }: ChatContainerProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change or typing indicator appears
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, whoIsTyping]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isProcessing) {
            onSendMessage();
        }
    };

    return (
        <div className="w-full max-w-4xl bg-white/50 backdrop-blur rounded-3xl shadow-2xl mb-4 flex flex-col h-[600px]">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto scrollbar-custom p-6">
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} text={msg.text} speaker={msg.speaker} />
                    ))}

                    {/* Typing indicator */}
                    {whoIsTyping && <TypingIndicator speaker={whoIsTyping} />}

                    {/* Button to ask scientist if last message was from Trompe */}
                    {showScientistButton && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={onAskScientist}
                                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all shadow-lg flex items-center gap-2 font-medium"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Demander la vérité au scientifique
                            </button>
                        </div>
                    )}
                </div>
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200/50">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={showScientistButton ? "Consultez la vérité auprès du scientifique afin de continuer la conversation..." : "Tapez votre message..."}
                        disabled={isProcessing || showScientistButton}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed bg-white text-gray-900 placeholder:text-gray-400"
                    />
                    <button
                        onClick={onSendMessage}
                        disabled={!input.trim() || isProcessing || showScientistButton}
                        className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg"
                    >
                        <Send size={20} />
                    </button>
                </div>
                {isProcessing && (
                    <p className="mt-2 text-sm text-gray-500 animate-pulse text-center">
                        En attente des réponses...
                    </p>
                )}
            </div>
        </div>
    );
}
