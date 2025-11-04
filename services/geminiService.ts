import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment.
const API_KEY = process.env.API_KEY;

// No AI instance is created here on module load to prevent crashes.

export const explainConcept = async (context: string, question: string): Promise<string> => {
  if (!API_KEY) {
    console.warn("API key for Gemini is not set. AI Tutor will not work.");
    return "La funcionalidad del Tutor de IA está desactivada porque la clave de API no está configurada.";
  }
  
  try {
    // Initialize AI client only when needed and if the key exists.
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const prompt = `
      You are a world-class teaching assistant for an introductory university course on Game Theory in Political Institutions.
      Your tone must be clear, concise, academic, yet easily understandable for beginners. You must answer in Spanish.
      The current topic of the presentation slide is: "${context}".
      A student has asked the following question: "${question}"
      Please provide a direct and helpful answer to the student's question, relating it back to the context of the slide if possible. Keep the explanation focused and do not introduce overly complex or unrelated topics.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a response from the AI tutor.");
  }
};
