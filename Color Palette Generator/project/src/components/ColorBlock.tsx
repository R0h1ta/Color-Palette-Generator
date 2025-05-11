import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { isLightColor } from '../utils/colorUtils';

interface ColorBlockProps {
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

const ColorBlock: React.FC<ColorBlockProps> = ({ color, size = 'md' }) => {
  const [copied, setCopied] = useState(false);
  const isLight = isLightColor(color);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  // Determine size classes
  const sizeClasses = {
    'sm': 'h-14 w-full',
    'md': 'h-24 md:h-32 w-full',
    'lg': 'h-32 md:h-40 w-full'
  };
  
  return (
    <div 
      className={`relative group ${sizeClasses[size]} rounded-md transition-all duration-300 hover:shadow-lg flex flex-col justify-end overflow-hidden`}
      style={{ backgroundColor: color }}
    >
      <div 
        className={`p-2 flex justify-between items-center transition-opacity duration-300 ${isLight ? 'text-gray-800' : 'text-white'}`}
      >
        <span className="font-medium">{color.toUpperCase()}</span>
        <button 
          onClick={copyToClipboard}
          className={`p-1 rounded-full focus:outline-none focus:ring-2 ${isLight ? 'focus:ring-gray-800' : 'focus:ring-white'}`}
          aria-label="Copy color code"
        >
          {copied ? (
            <Check className="w-5 h-5" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>
      </div>
      {copied && (
        <div className="absolute top-2 right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
          Copied!
        </div>
      )}
    </div>
  );
};

export default ColorBlock;