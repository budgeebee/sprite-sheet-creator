# Sprite Sheet Creator

AI-powered sprite sheet generator for 2D pixel art characters. Built with Google Gemini (Nano Banana) and Next.js.

## Demo

### Generated Sprite Sheets

| Walk Cycle | Jump Animation | Attack Animation |
|:----------:|:--------------:|:----------------:|
| ![Walk Sprite Sheet](./assets/walk-sprite-sheet.png) | ![Jump Sprite Sheet](./assets/jump-sprite-sheet.png) | ![Attack Sprite Sheet](./assets/attack-sprite-sheet.png) |

### Sandbox Preview

![Sandbox Preview](./assets/sandbox-preview.png)

## Features

- **Character Generation** - Generate pixel art characters from text prompts using Gemini 2.5 Flash Image
- **Walk Cycle Sprites** - Automatically generate 6-frame walk cycle sprite sheets (2x3 grid)
- **Jump Animation** - Generate 4-frame jump animation sprite sheets (2x2 grid)
- **Attack Animation** - Generate 4-frame attack animation sprite sheets (2x2 grid) - AI picks the attack style
- **Background Removal** - Clean transparent backgrounds using Gemini's natural language image editing
- **Frame Extraction** - Adjustable grid dividers for precise frame cropping
- **Animation Preview** - Test animations with adjustable FPS
- **Sandbox Mode** - Walk, jump, and attack in a parallax side-scroller environment

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with your Gemini API key:
```bash
GEMINI_API_KEY=your_api_key_here
```

Get your API key at https://aistudio.google.com/apikey

3. Run the development server:
```bash
npm run dev
```

4. Open http://localhost:3000

### Using Docker

```bash
# Create .env.local with your GEMINI_API_KEY
cp .env.local.example .env.local
# Edit .env.local and add your key

# Build and run
docker-compose up --build
```

Visit http://localhost:3000

## Controls

### Animation Preview (Step 5)
- `D` / `→` - Walk right
- `A` / `←` - Walk left
- `Space` - Stop

### Sandbox (Step 6)
- `A` / `←` - Walk left
- `D` / `→` - Walk right
- `W` / `↑` - Jump
- `J` - Attack

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Google Gemini API (gemini-2.5-flash-image / Nano Banana)
- PixiJS for sandbox rendering
- HTML Canvas for animation preview
- Docker for containerization
