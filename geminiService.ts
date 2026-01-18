
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export class GeminiService {
  private chat: Chat;

  constructor() {
    this.chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const result: GenerateContentResponse = await this.chat.sendMessage({ message });
      return result.text || "Atsiprašau, įvyko klaida. Bandykite dar kartą.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Šiuo metu negaliu atsakyti. Prašome susisiekti tiesiogiai.";
    }
  }

  async sendMessageStream(message: string, onChunk: (chunk: string) => void) {
    try {
      const response = await this.chat.sendMessageStream({ message });
      for await (const chunk of response) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          onChunk(c.text);
        }
      }
    } catch (error) {
      console.error("Gemini Streaming Error:", error);
      onChunk("Klaida siunčiant žinutę.");
    }
  }
}

export const geminiService = new GeminiService();
