export interface ImageGenerationProvider {
  generateImage(prompt: string, options?: GenerateOptions): Promise<ImageResult>;
  editImage(imageData: string, prompt: string, options?: EditOptions): Promise<ImageResult>;
  removeBackground(imageData: string): Promise<ImageResult>;
}

export interface ImageResult {
  imageUrl: string;    // Data URL or remote URL
  width?: number;
  height?: number;
}

export interface GenerateOptions {
  aspectRatio?: string;
  numImages?: number;
}

export interface EditOptions {
  aspectRatio?: string;
}
