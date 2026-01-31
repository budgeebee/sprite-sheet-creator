import { NextRequest, NextResponse } from "next/server";
import { getImageProvider } from "@/app/lib/image-generation";

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

    const provider = getImageProvider();
    const result = await provider.editImage(characterImageUrl, prompt);

    return NextResponse.json({
      imageUrl: result.imageUrl,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    console.error("Error generating sprite sheet with Gemini:", error);
    return NextResponse.json(
      { error: "Failed to generate sprite sheet" },
      { status: 500 }
    );
  }
}
