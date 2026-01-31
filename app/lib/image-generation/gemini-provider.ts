import { GoogleGenAI } from "@google/genai";
import type {
  ImageGenerationProvider,
  ImageResult,
  GenerateOptions,
  EditOptions,
} from "./types";

export class GeminiProvider implements ImageGenerationProvider {
  private client: GoogleGenAI;

  constructor(apiKey: string) {
    this.client = new GoogleGenAI({ apiKey });
  }

  async generateImage(
    prompt: string,
    options?: GenerateOptions
  ): Promise<ImageResult> {
    const response = await this.client.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      config: {
        responseModalities: ["IMAGE"],
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(
      (part: any) => part.inlineData
    );

    if (!imagePart?.inlineData) {
      throw new Error("No image generated from Gemini API");
    }

    const imageData = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;

    return {
      imageUrl: imageData,
    };
  }

  async editImage(
    imageData: string,
    prompt: string,
    options?: EditOptions
  ): Promise<ImageResult> {
    // Extract base64 data from data URL if needed
    const base64Data = imageData.includes("base64,")
      ? imageData.split("base64,")[1]
      : imageData;

    const response = await this.client.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: "image/png",
                data: base64Data,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ["IMAGE"],
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(
      (part: any) => part.inlineData
    );

    if (!imagePart?.inlineData) {
      throw new Error("No sprite sheet generated from Gemini API");
    }

    const resultImageData = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;

    return {
      imageUrl: resultImageData,
    };
  }

  async removeBackground(imageData: string): Promise<ImageResult> {
    const base64Data = imageData.includes("base64,")
      ? imageData.split("base64,")[1]
      : imageData;

    const prompt = `Remove the background from this image completely.
Make all background pixels fully transparent.
Keep only the character/sprite in the foreground with clean edges.
Output the image with a transparent background (alpha channel) in PNG format.`;

    const response = await this.client.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: "image/png",
                data: base64Data,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ["IMAGE"],
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(
      (part: any) => part.inlineData
    );

    if (!imagePart?.inlineData) {
      throw new Error("Background removal failed with Gemini API");
    }

    const resultImageData = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;

    return {
      imageUrl: resultImageData,
    };
  }
}
