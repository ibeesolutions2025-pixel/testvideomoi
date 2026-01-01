
export enum AdConcept {
  PREMIUM = 'Premium Luxury',
  VIBRANT = 'Youthful & Vibrant',
  TECH = 'High-Tech Futuristic',
  LIFESTYLE = 'Lifestyle & Emotional'
}

export interface AdVariation {
  id: string;
  concept: AdConcept;
  style: string;
  description: string;
  imageUrl?: string;
  loading: boolean;
  error?: string;
}

export interface ProductInput {
  image: string; // base64
  mimeType: string;
  name?: string;
}
