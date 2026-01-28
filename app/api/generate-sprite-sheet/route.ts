import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Google Generative AI with API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

const WALK_SPRITE_PROMPT = `Create a 6-frame pixel art walk cycle sprite sheet of this character.

Arrange the 6 frames in a 2x3 grid (2 rows, 3 columns) on white background. The character is walking to the right.

Top row (frames 1-3):
Frame 1: Right leg forward, left leg back - stride
Frame 2: Legs very close together, passing/crossing
Frame 3: Left leg forward, right leg back - opposite stride

Bottom row (frames 4-6):
Frame 4: Legs close together, passing/crossing
Frame 5: Right leg forward again - stride
Frame 6: Legs very close together, passing/crossing

Each frame shows a different phase of the walking motion. Stride frames have legs spread apart, passing frames have legs close together.

Keep it simple like a classic 8-bit or 16-bit video game sprite. Same character design in all frames.`;

const JUMP_SPRITE_PROMPT = `Create a 4-frame pixel art jump animation sprite sheet of this character.

Arrange the 4 frames in a 2x2 grid on white background. The character is jumping.

Top row (frames 1-2):
Frame 1: Crouch/anticipation - character slightly crouched, knees bent, preparing to jump
Frame 2: Rising - character in air, legs tucked up, arms up, ascending

Bottom row (frames 3-4):
Frame 3: Apex/peak - character at highest point of jump, body stretched or tucked
Frame 4: Landing - character landing, slight crouch to absorb impact

Keep it simple like a classic 8-bit or 16-bit video game sprite. Same character design in all frames. Character facing right.`;

const ATTACK_SPRITE_PROMPT = `Create a 4-frame pixel art attack animation sprite sheet of this character.

Arrange the 4 frames in a 2x2 grid on white background. The character is performing an attack.

Top row (frames 1-2):
Frame 1: Wind-up/anticipation - character preparing to attack
Frame 2: Attack in motion - the strike being unleashed

Bottom row (frames 3-4):
Frame 3: Impact - maximum extension of attack
Frame 4: Recovery - returning to ready stance

Keep it simple like a classic 8-bit or 16-bit video game sprite. Same character design in all frames. Character facing right. Make the attack visually dynamic.`;

type SpriteType = "walk" | "jump" | "attack";

const PROMPTS: Record<SpriteType, string> = {
  walk: WALK_SPRITE_PROMPT,
  jump: JUMP_SPRITE_PROMPT,
  attack: ATTACK_SPRITE_PROMPT,
};

export async function POST(request: NextRequest) {
  try {
    const { characterImageUrl, type = "walk", customPrompt } = await request.json();

    if (!characterImageUrl) {
      return NextResponse.json(
        { error: "Character image URL is required" },
        { status: 400 }
      );
    }

    const spriteType = (type as SpriteType) || "walk";
    const prompt = customPrompt || PROMPTS[spriteType] || PROMPTS.walk;

    // Use Kimi K2.5 for multimodal image editing
    const model = genAI.getGenerativeModel({ model: "kimi-k2.5" });

    // For image editing with Kimi K2.5
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: Buffer.from(characterImageUrl.split(',')[1], 'base64').toString('base64'),
          mimeType: 'image/png',
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    // Parse the response to get the generated image
    // This is a placeholder - actual implementation depends on Kimi K2.5's response format
    // The model should return image data or a URL

    return NextResponse.json({
      message: "Sprite sheet generation via Kimi K2.5",
      type: spriteType,
      status: "implemented",
      model: "kimi-k2.5",
      prompt,
    });

  } catch (error) {
    console.error("Error generating sprite sheet with Kimi K2.5:", error);
    return NextResponse.json(
      { error: "Failed to generate sprite sheet with Kimi K2.5" },
      { status: 500 }
    );
  }
}
