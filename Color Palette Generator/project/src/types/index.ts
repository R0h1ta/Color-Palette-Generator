export interface ColorPalette {
  id: string;
  colors: string[];
  theme?: string;
  createdAt: Date;
}

export type ColorTheoryType = 'monochromatic' | 'analogous' | 'complementary' | 'triadic' | 'tetradic';