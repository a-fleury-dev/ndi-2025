import { useState } from "react";
import { ChatContainer } from "~/components"
import { Character } from "~/components";
import { BackgroundSplit } from "~/components";
import type {Message} from "~/types";

const apiUrl = "https://chat-api-young-violet-7892.fly.dev";

export function ChatbotPage() {
    const [currentMessageId, setCurrentMessageId] = useState(0);
    const [showScientistButton, setShowScientistButton] = useState(false);
    const [whoIsTyping, setWhoIsTyping] = useState<"trompe" | "scientist" | null>(null);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: -2,
            text: "Bonjour, je suis Donald Trompe je peux répondre à toutes tes questions sur l'environnement et la technologie car je suis le plus intelligent du monde !!!",
            speaker: "trompe",
            timestamp: Date.now() - 10000,
        },
        {
            id: -1,
            text: "Et moi je suis là pour le corriger et te dire vraiment la vérité.",
            speaker: "scientist",
            timestamp: Date.now() - 9000,
        },
    ]);
    const [input, setInput] = useState("");
    const [trompeAnimating, setTrompeAnimating] = useState(false);
    const [scientistAnimating, setScientistAnimating] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const getResponse = async (messages: Message[], from: "trompe" | "scientist", messageId: number): Promise<Message> => {
        try {
            const response = await fetch(`${apiUrl}/api/chat/${from}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(messages),
            });

            if (response.ok) {
                const data = await response.json();
                return {
                    id: messageId,
                    text: data.response,
                    speaker: from,
                    timestamp: Date.now(),
                };
            } else {
                console.error(`Error from ${from}:`, response.status, response.statusText);
                return {
                    id: messageId,
                    text: "Il y a eu une erreur dans le traitement de votre message. Veuillez réessayer",
                    speaker: "system",
                    timestamp: Date.now(),
                };
            }
        } catch (error) {
            console.error(`Error fetching response from ${from}:`, error);
            return {
                id: messageId,
                text: "Il y a eu une erreur dans le traitement de votre message. Veuillez réessayer",
                speaker: "system",
                timestamp: Date.now(),
            };
        }
    }

    const handleSendMessage = async () => {
        if (!input.trim() || isProcessing) return;

        const userMessage = input.trim();
        if (userMessage.length > 1000) {
            userMessage.slice(0, 1000);
        }
        const userMessageObj: Message = {
            id: currentMessageId,
            text: userMessage,
            speaker: "user",
            timestamp: Date.now(),
        };

        const newMessages = [...messages, userMessageObj];
        setMessages(newMessages);
        const nextMessageId = currentMessageId + 1;
        setCurrentMessageId(nextMessageId);
        setInput("");
        setIsProcessing(true);

        // Show typing indicator for Trompe
        setWhoIsTyping("trompe");

        // Animate Trompe speaking
        setTrompeAnimating(true);
        setTimeout(() => setTrompeAnimating(false), 1000);

        // Add Trompe's response after a delay
        setTimeout(async () => {
            const trompeMessages = newMessages.filter(message =>
                (message.speaker === "trompe" || message.speaker === "user") && message.id >= 0
            );
            const trompeResponse = await getResponse(trompeMessages, "trompe", nextMessageId);

            setWhoIsTyping(null);
            const messagesWithTrompe = [...newMessages, trompeResponse];
            setMessages(messagesWithTrompe);
            if (trompeResponse.speaker === "trompe") {
                setShowScientistButton(true);
            }
            const afterTrompeId = nextMessageId + 1;
            setCurrentMessageId(afterTrompeId);
        }, 1500);
    };

    const handleAskForScientistResponse = async () => {
        // Hide button immediately
        setShowScientistButton(false);

        // Show typing indicator for Scientist
        setWhoIsTyping("scientist");

        // Scientist responds to fact-check
        setTimeout(async () => {
            setScientistAnimating(true);
            setTimeout(() => setScientistAnimating(false), 1000);
            const nextMessageId = currentMessageId + 1;

            const scientistMessages = messages.filter(message =>
                message.speaker !== "system" && message.id >= 0
            );
            const scientistResponse = await getResponse(scientistMessages, "scientist", nextMessageId);

            setWhoIsTyping(null);
            setMessages((prev) => [...prev, scientistResponse]);
            const afterScientistId = nextMessageId + 1;
            setCurrentMessageId(afterScientistId + 1);
            setIsProcessing(false);
        }, 2000);
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Split Background */}
            <BackgroundSplit />

            <div className="relative z-10 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-4">
                        <div className="inline-block px-6 py-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-emerald-200">
                            <h1 className="text-3xl mb-1 bg-gradient-to-r from-emerald-600 via-green-700 to-lime-600 bg-clip-text text-transparent">
                                Lutter contre la désinformation
                            </h1>
                            <div className="h-0.5 w-3/4 mx-auto mt-1 bg-gradient-to-r from-emerald-500 via-green-600 to-lime-500 rounded-full"></div>
                        </div>
                    </div>

                    {/* Main Layout */}
                    <div className="flex flex-col items-center">
                        {/* Chat Container */}
                        <ChatContainer
                            messages={messages}
                            input={input}
                            setInput={setInput}
                            onSendMessage={handleSendMessage}
                            isProcessing={isProcessing}
                            showScientistButton={showScientistButton}
                            whoIsTyping={whoIsTyping}
                            onAskScientist={handleAskForScientistResponse}
                        />

                        {/* Characters Row */}
                        <div className="flex justify-between items-center w-full max-w-5xl mb-2">
                            {/* Character - Scientist */}
                            <Character
                                name="Dr. Science"
                                imageUrl="https://images.unsplash.com/photo-1639628735078-ed2f038a193e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbnRpc3QlMjBjYXJ0b29uJTIwY2hhcmFjdGVyfGVufDF8fHx8MTc2NDg4MjQ5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                isAnimating={scientistAnimating}
                            />

                            {/* Character - Donald Trompe */}
                            <Character
                                name="Donald Trompe"
                                imageUrl="/trompe.png"
                                isFlipped={true}
                                isAnimating={trompeAnimating}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}