import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai"

const API_KEY = "AIzaSyDQGEJNWKM9oQXpl2e_xGY8lInokpGFUkQ"; // Asegúrate de proteger esto
const genAI = new GoogleGenerativeAI(API_KEY);
const PROJECT_CONTEXT=`Este es un proyecto en react de estudiantes de la universidad de caldas de la materia de forntend que simula el envio de pedidos de una plataforma como Rapi`
export const geminiService = {
  async generateContent(prompt: string): Promise<string> {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const fullPrompt = `${PROJECT_CONTEXT}\n\nPregunta del usuario: ${prompt}`;
      const result = await model.generateContent(fullPrompt);
      const responseText = result.response.text();
      return responseText;
    } catch (error) {
      console.error("Error al generar contenido con Gemini:", error);
      throw new Error("No se pudo generar el contenido. Por favor, intenta de nuevo.");
    }
  },
};