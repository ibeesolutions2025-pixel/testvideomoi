
import { AdConcept } from './types';

export const CONCEPT_PROMPTS: Record<AdConcept, string> = {
  [AdConcept.PREMIUM]: "Transform this image into a high-end luxury advertisement. Place the product on a minimalist pedestal made of polished marble or dark obsidian. Use soft, cinematic studio lighting with elegant shadows. The background should be a sophisticated, blurred architectural space with neutral tones (beige, charcoal, or gold accents). Commercial grade quality, 8k resolution, professional lighting.",
  [AdConcept.VIBRANT]: "Transform this image into a youthful and vibrant digital ad. Use a pop-art or trendy social media aesthetic with bright, saturated pastel colors. Surround the product with energetic 3D geometric shapes (spheres, zig-zags) and dynamic lighting. The composition should feel high-energy and eye-catching for Gen Z/Millennial audiences. Sharp, clean, and modern.",
  [AdConcept.TECH]: "Transform this image into a high-tech futuristic advertisement. The setting should be a sleek, dark cyberpunk lab or a floating digital space. Add glowing neon blue and magenta highlights. Include subtle digital interfaces, holographic patterns, or floating data particles in the background. Use metallic and glass textures to emphasize cutting-edge technology. Sci-fi aesthetic.",
  [AdConcept.LIFESTYLE]: "Transform this image into an emotional lifestyle advertisement. Place the product in a realistic, cozy, sunlit modern home setting (like a wooden coffee table or a bright window sill) or a beautiful outdoor garden with soft bokeh. Use warm, natural sunlight to create a relatable and trustworthy vibe. Focus on authentic human-centric environments that make the viewer feel comfortable and connected."
};

export const CONCEPT_META: Record<AdConcept, { style: string; desc: string }> = {
  [AdConcept.PREMIUM]: {
    style: "Luxury Minimalist",
    desc: "Focuses on high-end appeal with sophisticated lighting and premium materials to elevate brand perceived value."
  },
  [AdConcept.VIBRANT]: {
    style: "Modern Pop Art",
    desc: "Uses high-contrast colors and dynamic shapes to stop the scroll and attract younger demographics."
  },
  [AdConcept.TECH]: {
    style: "Cyberpunk Tech",
    desc: "Emphasizes innovation and the 'next-gen' aspect with neon accents and futuristic digital elements."
  },
  [AdConcept.LIFESTYLE]: {
    style: "Warm Authentic",
    desc: "Builds trust and emotional connection by placing the product in a relatable, everyday high-quality setting."
  }
};
