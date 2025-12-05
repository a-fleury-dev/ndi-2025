export interface Message {
    id: number;
    text: string;
    speaker: "user" | "trompe" | "scientist" | "system";
    timestamp: number;
}