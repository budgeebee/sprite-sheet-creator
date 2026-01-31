import { GeminiProvider } from "./gemini-provider";
import type { ImageGenerationProvider } from "./types";

export function getImageProvider(): ImageGenerationProvider {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is required");
  }

  // Future swap point for ai_backend
  // const useBackend = process.env.USE_AI_BACKEND === 'true';
  // if (useBackend) {
  //   return new AiBackendProvider(process.env.AI_BACKEND_URL!);
  // }

  return new GeminiProvider(apiKey);
}

export * from "./types";
