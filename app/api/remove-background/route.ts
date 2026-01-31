import { NextRequest, NextResponse } from "next/server";
import { getImageProvider } from "@/app/lib/image-generation";

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    const provider = getImageProvider();
    const result = await provider.removeBackground(imageUrl);

    return NextResponse.json({
      imageUrl: result.imageUrl,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    console.error("Error removing background:", error);
    return NextResponse.json(
      { error: "Failed to remove background" },
      { status: 500 }
    );
  }
}
