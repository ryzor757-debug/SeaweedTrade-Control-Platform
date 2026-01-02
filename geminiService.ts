
import { GoogleGenAI, Type } from "@google/genai";

// Guideline: Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
// Guideline: The API key must be obtained exclusively from the environment variable process.env.API_KEY.

export const analyzeHarvest = async (description: string) => {
  // Safe environment check removed in favor of direct process.env.API_KEY usage as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
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
    // Guideline: The GenerateContentResponse object features a text property (not a method).
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return null;
  }
};

export const getMarketOverview = async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a summary of global seaweed trade trends for 2024-2025 focusing on sustainability and pharmaceutical demand.",
    });
    // Guideline: The GenerateContentResponse object features a text property (not a method).
    return response.text || "Unable to fetch live market insights.";
  } catch (error) {
    console.error("Gemini Market Overview Error:", error);
    return "Unable to fetch live market insights.";
  }
};
