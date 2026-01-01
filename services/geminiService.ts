
import { GoogleGenAI } from "@google/genai";
import { ProductInput } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateAdImage(product: ProductInput, prompt: string): Promise<string> {
    const fullPrompt = `${prompt} IMPORTANT: Keep the central product from the provided image exactly as it is. Do not change its shape, color, or branding labels. Only transform the background and environment to match the style described. Ensure there is some negative space for text overlays.`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: product.image.split(',')[1], // Remove the prefix if present
                mimeType: product.mimeType,
              },
            },
            {
              text: fullPrompt
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      let base64Image = '';
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          base64Image = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }

      if (!base64Image) {
        throw new Error("No image was generated in the response parts.");
      }

      return base64Image;
    } catch (error) {
      console.error("Gemini Image Generation Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
