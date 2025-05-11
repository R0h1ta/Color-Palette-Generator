import { ColorPalette } from '../types';

const STORAGE_KEY = 'savedPalettes';

/**
 * Save a palette to localStorage
 */
export const savePalette = (palette: ColorPalette): void => {
  const savedPalettes = getSavedPalettes();
  savedPalettes.push(palette);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPalettes));
};

/**
 * Get all saved palettes from localStorage
 */
export const getSavedPalettes = (): ColorPalette[] => {
  const savedPalettesString = localStorage.getItem(STORAGE_KEY);
  if (!savedPalettesString) return [];
  
  try {
    const palettes = JSON.parse(savedPalettesString);
    
    // Convert string dates back to Date objects
    return palettes.map((palette: any) => ({
      ...palette,
      createdAt: new Date(palette.createdAt)
    }));
  } catch (error) {
    console.error('Error parsing saved palettes:', error);
    return [];
  }
};

/**
 * Delete a palette from localStorage
 */
export const deletePalette = (id: string): void => {
  const savedPalettes = getSavedPalettes();
  const updatedPalettes = savedPalettes.filter(palette => palette.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPalettes));
};

/**
 * Clear all saved palettes
 */
export const clearSavedPalettes = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};