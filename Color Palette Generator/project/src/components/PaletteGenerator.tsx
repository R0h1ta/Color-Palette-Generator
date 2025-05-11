import React, { useState, useEffect } from 'react';
import { Shuffle, Save, BookOpen, Search, Info } from 'lucide-react';
import ColorBlock from './ColorBlock';
import PalettePreview from './PalettePreview';
import SavedPalettes from './SavedPalettes';
import { ColorPalette, ColorTheoryType } from '../types';
import { 
  generatePaletteByTheory, 
  generateThemePalette,
  getColorTheoryTypes
} from '../utils/colorUtils';
import { savePalette, getSavedPalettes, deletePalette } from '../utils/storageUtils';

const PaletteGenerator: React.FC = () => {
  const [currentPalette, setCurrentPalette] = useState<string[]>([]);
  const [themeInput, setThemeInput] = useState('');
  const [colorTheory, setColorTheory] = useState<ColorTheoryType>('monochromatic');
  const [savedPalettes, setSavedPalettes] = useState<ColorPalette[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  // Load saved palettes on mount
  useEffect(() => {
    setSavedPalettes(getSavedPalettes());
    // Generate an initial palette
    handleRandomPalette();
  }, []);
  
  // Generate a random palette
  const handleRandomPalette = () => {
    const newPalette = generatePaletteByTheory(colorTheory);
    setCurrentPalette(newPalette);
    // Reset theme input when generating random
    setThemeInput('');
  };
  
  // Generate a palette based on theme
  const handleThemePalette = () => {
    if (!themeInput.trim()) return;
    
    const newPalette = generateThemePalette(themeInput);
    setCurrentPalette(newPalette);
  };
  
  // Save current palette
  const handleSavePalette = () => {
    if (currentPalette.length === 0) return;
    
    const newPalette: ColorPalette = {
      id: Date.now().toString(),
      colors: currentPalette,
      theme: themeInput.trim() || undefined,
      createdAt: new Date()
    };
    
    savePalette(newPalette);
    setSavedPalettes(getSavedPalettes());
  };
  
  // Delete a saved palette
  const handleDeletePalette = (id: string) => {
    deletePalette(id);
    setSavedPalettes(getSavedPalettes());
  };
  
  // Select a saved palette
  const handleSelectPalette = (palette: ColorPalette) => {
    setCurrentPalette(palette.colors);
    setThemeInput(palette.theme || '');
  };
  
  // Handle form submit for theme input
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleThemePalette();
  };
  
  // Get sorted color theory types
  const colorTheoryTypes = getColorTheoryTypes();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row mb-6 gap-4">
          {/* Generate Random Section */}
          <div className="flex-1 flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Generate by Color Theory
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={colorTheory}
                onChange={(e) => setColorTheory(e.target.value as ColorTheoryType)}
                className="px-4 py-2 rounded-md border border-gray-300 flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {colorTheoryTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              <button
                onClick={handleRandomPalette}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center justify-center gap-2"
              >
                <Shuffle className="w-4 h-4" />
                <span>Generate</span>
              </button>
            </div>
          </div>
          
          {/* Theme Input Section */}
          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Generate by Theme
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={themeInput}
                    onChange={(e) => setThemeInput(e.target.value)}
                    placeholder="Enter a theme (e.g. sunset, ocean)"
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-300 ease-in-out"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Color Blocks */}
        {currentPalette.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold">Your Palette</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
                  aria-label="Show information"
                >
                  <Info className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSavePalette}
                  className="px-3 py-1.5 bg-gray-800 text-white rounded-md hover:bg-black transition duration-300 ease-in-out flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Palette</span>
                </button>
                <button
                  onClick={() => setShowSaved(!showSaved)}
                  className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-300 ease-in-out flex items-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Saved</span>
                  {savedPalettes.length > 0 && (
                    <span className="bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {savedPalettes.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
            
            {showInfo && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded">
                <p className="text-sm text-blue-700">
                  Click on any color to copy its HEX code to your clipboard. Save your favorite palettes and see how they might look in a real design.
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {currentPalette.map((color, index) => (
                <ColorBlock key={index} color={color} />
              ))}
            </div>
          </div>
        )}
        
        {/* Saved Palettes Modal */}
        {showSaved && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <SavedPalettes 
                  palettes={savedPalettes} 
                  onDelete={handleDeletePalette} 
                  onSelect={handleSelectPalette}
                  onClose={() => setShowSaved(false)}
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Preview Section */}
        {currentPalette.length > 0 && (
          <PalettePreview colors={currentPalette} />
        )}
      </div>
    </div>
  );
};

export default PaletteGenerator;