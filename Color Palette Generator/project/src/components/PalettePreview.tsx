import React from 'react';
import { isLightColor } from '../utils/colorUtils';

interface PalettePreviewProps {
  colors: string[];
}

const PalettePreview: React.FC<PalettePreviewProps> = ({ colors }) => {
  if (!colors.length) return null;
  
  // Default to the first color if not enough colors
  const ensureColor = (index: number) => colors[index] || colors[0];
  
  const primaryColor = ensureColor(0);
  const secondaryColor = ensureColor(1);
  const accentColor = ensureColor(2);
  const backgroundColor = ensureColor(3);
  const textColor = ensureColor(4) || '#333333';
  
  const isPrimaryLight = isLightColor(primaryColor);
  const isSecondaryLight = isLightColor(secondaryColor);
  const isBackgroundLight = isLightColor(backgroundColor);
  
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold mb-4">Preview</h2>
      <div 
        className="rounded-lg shadow-lg overflow-hidden transition-all duration-500"
        style={{ backgroundColor }}
      >
        {/* Header */}
        <div 
          className="p-4 flex justify-between items-center"
          style={{ backgroundColor: primaryColor, color: isPrimaryLight ? '#333' : '#fff' }}
        >
          <div className="font-bold">Website Preview</div>
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6" style={{ color: isBackgroundLight ? '#333' : '#fff' }}>
          <h3 
            className="text-xl font-bold mb-3"
            style={{ color: textColor }}
          >
            Sample Heading
          </h3>
          <p className="mb-4 opacity-80">This is a preview of how your color palette might look in a real application.</p>
          
          {/* Card */}
          <div className="rounded-md p-4 mb-4 shadow-md" style={{ backgroundColor: '#fff' }}>
            <h4 className="font-bold text-lg" style={{ color: primaryColor }}>Card Title</h4>
            <p className="text-sm text-gray-600">Card content goes here with sample text.</p>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-2">
            <button 
              className="px-4 py-2 rounded font-medium transition-transform duration-200 transform hover:scale-105"
              style={{ 
                backgroundColor: primaryColor, 
                color: isPrimaryLight ? '#333' : '#fff' 
              }}
            >
              Primary Button
            </button>
            <button 
              className="px-4 py-2 rounded font-medium transition-transform duration-200 transform hover:scale-105"
              style={{ 
                backgroundColor: secondaryColor, 
                color: isSecondaryLight ? '#333' : '#fff' 
              }}
            >
              Secondary Button
            </button>
            <button 
              className="px-4 py-2 rounded font-medium border transition-transform duration-200 transform hover:scale-105"
              style={{ 
                borderColor: accentColor,
                color: accentColor
              }}
            >
              Outlined Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PalettePreview;