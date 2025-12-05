import type { Route } from "./+types/chatbot";
import { ChatbotPage } from "~/pages/ChatbotPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lutter contre la désinformation" },
    { name: "description", content: "Chatbot de sensibilisation" },
  ];
}

export default function Chatbot() {
  return <ChatbotPage />;
}

