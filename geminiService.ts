
import { GoogleGenAI, Type } from "@google/genai";

// NOTE:
// This app is a purely client-side Vite app, so we must NOT rely on Node's `process.env`
// at runtime. Instead, we use Vite's public environment variables (import.meta.env.VITE_*)
// and configure them in Vercel's Environment Variables settings.

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

if (!GEMINI_API_KEY) {
  // This will surface clearly in the browser console if the key is missing,
  // and prevents hard-to-debug runtime errors.
  console.warn(
    "VITE_GEMINI_API_KEY is not set. Gemini-powered features will return fallback data."
  );
}

export const analyzeHarvest = async (description: string) => {
  if (!GEMINI_API_KEY) {
    // Fallback: return a simple, static analysis when no key is configured
    return {
      grade: "N/A",
      estimatedValuePerKg: 0,
      reasoning:
        "Live Gemini analysis is disabled because VITE_GEMINI_API_KEY is not configured.",
      marketTrend: "No live trend data available.",
    };
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

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
            estimatedValuePerKg: {
              type: Type.NUMBER,
              description: "Estimated USD price per kg",
            },
            reasoning: {
              type: Type.STRING,
              description: "Reasoning for the grade",
            },
            marketTrend: {
              type: Type.STRING,
              description: "Brief market outlook",
            },
          },
          required: ["grade", "estimatedValuePerKg", "reasoning"],
        },
      },
    });

    // The GenerateContentResponse object exposes `text` as a property.
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return null;
  }
};

export const getMarketOverview = async () => {
  if (!GEMINI_API_KEY) {
    return "Live Gemini market overview is disabled because VITE_GEMINI_API_KEY is not configured.";
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents:
        "Generate a summary of global seaweed trade trends for 2024-2025 focusing on sustainability and pharmaceutical demand.",
    });

    // The GenerateContentResponse object exposes `text` as a property.
    return response.text || "Unable to fetch live market insights.";
  } catch (error) {
    console.error("Gemini Market Overview Error:", error);
    return "Unable to fetch live market insights.";
  }
};
