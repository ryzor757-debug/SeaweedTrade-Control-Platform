import { GoogleGenAI, Type } from "@google/genai";

export const analyzeHarvest = async (description: string) => {
  // Use process.env.API_KEY directly as required by the @google/genai coding guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this seaweed harvest description for quality grading and market value: ${description}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            grade: { type: Type.STRING, description: "Quality grade (A, B, C)" },
            estimatedValuePerKg: { type: Type.NUMBER, description: "Estimated USD price per kg" },
            reasoning: { type: Type.STRING, description: "Reasoning for the grade" },
            marketTrend: { type: Type.STRING, description: "Brief market outlook" }
          },
          required: ["grade", "estimatedValuePerKg", "reasoning"]
        }
      }
    });
    // Directly access the text property as per GenerateContentResponse definition
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return null;
  }
};

export const getMarketOverview = async () => {
  // Use process.env.API_KEY directly as required by the @google/genai coding guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a summary of global seaweed trade trends for 2024-2025 focusing on sustainability and pharmaceutical demand.",
    });
    // Directly access the text property as per GenerateContentResponse definition
    return response.text || "Unable to fetch live market insights.";
  } catch (error) {
    console.error("Gemini Market Overview Error:", error);
    return "Unable to fetch live market insights.";
  }
};