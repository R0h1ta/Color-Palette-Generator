// Helper functions for color manipulation and generation

/**
 * Generate a random hex color
 */
export const getRandomColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
};

/**
 * Convert hex to HSL
 */
export const hexToHSL = (hex: string): { h: number; s: number; l: number } => {
  // Remove the # if present
  hex = hex.replace('#', '');

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Find greatest and smallest values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  // Calculate lightness
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    // Calculate saturation
    s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
    
    // Calculate hue
    if (max === r) {
      h = (g - b) / (max - min) + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / (max - min) + 2;
    } else {
      h = (r - g) / (max - min) + 4;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

/**
 * Convert HSL to hex
 */
export const hslToHex = (h: number, s: number, l: number): string => {
  h /= 360;
  s /= 100;
  l /= 100;
  
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Generate a monochromatic palette based on a base color
 */
export const generateMonochromatic = (baseColor: string, count: number = 5): string[] => {
  const { h, s, l } = hexToHSL(baseColor);
  const palette = [];

  for (let i = 0; i < count; i++) {
    // Vary the lightness for monochromatic
    const newL = Math.max(0, Math.min(100, l - 30 + (i * 60 / (count - 1))));
    palette.push(hslToHex(h, s, newL));
  }

  return palette;
};

/**
 * Generate an analogous palette based on a base color
 */
export const generateAnalogous = (baseColor: string, count: number = 5): string[] => {
  const { h, s, l } = hexToHSL(baseColor);
  const palette = [];

  // Spread hues around the base hue
  const range = 60;
  const start = h - range / 2;

  for (let i = 0; i < count; i++) {
    const newH = (start + (i * range / (count - 1)) + 360) % 360;
    palette.push(hslToHex(newH, s, l));
  }

  return palette;
};

/**
 * Generate a complementary palette based on a base color
 */
export const generateComplementary = (baseColor: string): string[] => {
  const { h, s, l } = hexToHSL(baseColor);
  const palette = [baseColor];
  
  // Add a darker and lighter variant of the base color
  palette.push(hslToHex(h, s, Math.max(0, l - 20)));
  palette.push(hslToHex(h, s, Math.min(100, l + 20)));
  
  // Add the complementary color
  const compH = (h + 180) % 360;
  palette.push(hslToHex(compH, s, l));
  
  // Add a variant of the complementary
  palette.push(hslToHex(compH, s, Math.max(0, l - 20)));
  
  return palette;
};

/**
 * Generate a triadic palette based on a base color
 */
export const generateTriadic = (baseColor: string): string[] => {
  const { h, s, l } = hexToHSL(baseColor);
  const palette = [baseColor];
  
  // Add first triadic color
  const triad1 = (h + 120) % 360;
  palette.push(hslToHex(triad1, s, l));
  
  // Add second triadic color
  const triad2 = (h + 240) % 360;
  palette.push(hslToHex(triad2, s, l));
  
  // Add variants
  palette.push(hslToHex(h, s, Math.max(0, l - 20)));
  palette.push(hslToHex(triad1, s, Math.max(0, l - 20)));
  
  return palette;
};

/**
 * Generate a tetradic palette based on a base color
 */
export const generateTetradic = (baseColor: string): string[] => {
  const { h, s, l } = hexToHSL(baseColor);
  const palette = [baseColor];
  
  // Add first tetradic color
  const tetrad1 = (h + 90) % 360;
  palette.push(hslToHex(tetrad1, s, l));
  
  // Add second tetradic color
  const tetrad2 = (h + 180) % 360;
  palette.push(hslToHex(tetrad2, s, l));
  
  // Add third tetradic color
  const tetrad3 = (h + 270) % 360;
  palette.push(hslToHex(tetrad3, s, l));
  
  // Add a variant
  palette.push(hslToHex(h, Math.min(100, s + 10), l));
  
  return palette;
};

/**
 * Generate a color palette based on a theme
 */
export const generateThemePalette = (theme: string): string[] => {
  const themePalettes: Record<string, string[]> = {
    sunset: ['#FF6F61', '#DE5D83', '#FFDAB9', '#2E1A47', '#592941'],
    ocean: ['#004E64', '#00A5CF', '#9FFFCB', '#EEF5DB', '#25A18E'],
    forest: ['#40531B', '#618C03', '#86A92D', '#C7D99D', '#D8E5BB'],
    minimal: ['#FFFFFF', '#F5F5F5', '#CFCFCF', '#333333', '#000000'],
    retro: ['#F25F5C', '#FFE066', '#247BA0', '#70C1B3', '#50514F'],
    pastel: ['#FFA5AB', '#FFDBAA', '#FFECBB', '#C8E7ED', '#A7BED3'],
    neon: ['#00FFFF', '#FF00FF', '#FFFF00', '#00FF00', '#FF0000'],
    beach: ['#EAD6CD', '#F9A66C', '#3CBBB1', '#266A7A', '#F5CDAA'],
    space: ['#1E2237', '#4C3B71', '#A26C64', '#F3B391', '#171420'],
    autumn: ['#DB504A', '#FF6F59', '#FFB140', '#E3B04B', '#624C2B'],
    winter: ['#FFFFFF', '#E0FBFC', '#98C1D9', '#3D5A80', '#293241'],
    spring: ['#E5F9BD', '#A3E0A6', '#57CC99', '#38A3A5', '#22577A'],
    summer: ['#F15BB5', '#FEE440', '#00BBF9', '#00F5D4', '#9B5DE5'],
    fire: ['#FF0000', '#FF4000', '#FF8000', '#FFC000', '#FFFF00'],
    ice: ['#FFFFFF', '#E3F4F4', '#D7EAEA', '#9DD7D7', '#8BCACA'],
    earth: ['#5F4B32', '#7A6346', '#795C3D', '#92734A', '#AD9165'],
    nature: ['#4E6A45', '#7A9972', '#A5C296', '#D5F4D6', '#E5FFDF']
  };

  // Return theme palette if it exists, otherwise generate a random one
  const lowercaseTheme = theme.toLowerCase();
  return themePalettes[lowercaseTheme] || generatePaletteByTheory('monochromatic');
};

/**
 * Generate a palette based on color theory
 */
export const generatePaletteByTheory = (theory: string): string[] => {
  // Generate a random base color
  const baseColor = getRandomColor();
  
  switch (theory) {
    case 'monochromatic':
      return generateMonochromatic(baseColor);
    case 'analogous':
      return generateAnalogous(baseColor);
    case 'complementary':
      return generateComplementary(baseColor);
    case 'triadic':
      return generateTriadic(baseColor);
    case 'tetradic':
      return generateTetradic(baseColor);
    default:
      // Default to monochromatic
      return generateMonochromatic(baseColor);
  }
};

/**
 * Check if a color is light (for determining text color)
 */
export const isLightColor = (color: string): boolean => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
};

/**
 * Get an array of color theory types
 */
export const getColorTheoryTypes = (): string[] => {
  return ['monochromatic', 'analogous', 'complementary', 'triadic', 'tetradic'];
};