import { NextRequest, NextResponse } from "next/server";
import { getImageProvider } from "@/app/lib/image-generation";

const CHARACTER_STYLE_PROMPT = `Generate a single character only, centered in the frame on a plain white background.
The character should be rendered in pixel art style with clean edges, suitable for use as a 2D game sprite.
Use a 32-bit retro game aesthetic. The character should be shown in a front-facing or 3/4 view pose,
standing idle and ready to be used in a sprite sheet animation.`;

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const fullPrompt = `${prompt}. ${CHARACTER_STYLE_PROMPT}`;

    const provider = getImageProvider();
    const result = await provider.generateImage(fullPrompt);

    return NextResponse.json({
      imageUrl: result.imageUrl,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    console.error("Error generating character:", error);
    return NextResponse.json(
      { error: "Failed to generate character" },
      { status: 500 }
    );
  }
}
