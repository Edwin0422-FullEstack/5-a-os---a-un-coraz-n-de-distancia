import { GoogleGenAI } from "@google/genai";

export const generateLoveNote = async (action: 'check' | 'flirt' | 'future'): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "Error: API Key no configurada. Pero mi amor por ti es infinito (incluso sin AI).";
    }

    const ai = new GoogleGenAI({ apiKey });

    let prompt = "";
    if (action === 'check') {
      prompt = "Actúa como el sistema de un videojuego RPG estilo Undertale. Describe a mi novia (tenemos 5 años juntos) analizando sus 'estadísticas'. Inventa estadísticas divertidas y románticas (ej. Paciencia: Legendaria, Belleza: Infinita, Amor: LV 99). Termina con una descripción breve y muy dulce. Usa el formato '* NOVIA 5 AÑOS - ATK ∞ DEF ∞ ...'";
    } else if (action === 'flirt') {
      prompt = "Escribe una frase para ligar/coquetear con mi novia de 5 años. Que sea ingeniosa, tierna y use referencias sutiles a videojuegos o al tiempo. Máximo 2 frases. Que parezca un diálogo de personaje carismático.";
    } else if (action === 'future') {
      prompt = "Actúa como una visión del futuro. Describe brevemente una escena feliz de nosotros dos juntos en el futuro (viajando, viviendo juntos, o simplemente durmiendo abrazados). Que sea una promesa cálida. Máximo 3 líneas.";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text?.trim() || "Te amo más allá de las palabras.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "La conexión falló, pero nuestra conexión es eterna. Te amo.";
  }
};