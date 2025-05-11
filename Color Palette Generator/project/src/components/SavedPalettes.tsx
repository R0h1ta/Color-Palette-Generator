import React, { useState } from 'react';
import { Trash2, Eye, X, Save, Clock } from 'lucide-react';
import { ColorPalette } from '../types';
import ColorBlock from './ColorBlock';
import { deletePalette } from '../utils/storageUtils';

interface SavedPalettesProps {
  palettes: ColorPalette[];
  onDelete: (id: string) => void;
  onSelect: (palette: ColorPalette) => void;
  onClose: () => void;
}

const SavedPalettes: React.FC<SavedPalettesProps> = ({ 
  palettes, 
  onDelete, 
  onSelect,
  onClose 
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };
  
  const handleSelect = (palette: ColorPalette) => {
    onSelect(palette);
    onClose();
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  if (palettes.length === 0) {
    return (
      <div className="p-6 text-center">
        <Save className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No saved palettes yet</p>
        <p className="text-gray-400 text-sm mt-1">
          Click the "Save Palette" button to save your creations
        </p>
      </div>
    );
  }
  
  return (
    <div className="overflow-y-auto max-h-96">
      <div className="flex justify-between items-center border-b pb-3 px-4 pt-2">
        <h3 className="text-lg font-bold">Saved Palettes</h3>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
          aria-label="Close saved palettes"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <ul className="divide-y">
        {palettes.map(palette => (
          <li 
            key={palette.id}
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
            onClick={() => setExpandedId(expandedId === palette.id ? null : palette.id)}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="font-medium">
                  {palette.theme ? palette.theme : 'Custom Palette'}
                </span>
                <span className="ml-2 text-xs text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" /> 
                  {formatDate(palette.createdAt)}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(palette);
                  }}
                  className="p-1.5 hover:bg-gray-200 rounded-full text-gray-600"
                  aria-label="View palette"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleDelete(palette.id, e)}
                  className="p-1.5 hover:bg-red-100 rounded-full text-red-500"
                  aria-label="Delete palette"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Color strip preview */}
            <div className="flex h-6 rounded overflow-hidden">
              {palette.colors.map((color, i) => (
                <div 
                  key={i} 
                  className="flex-1 transition-all duration-300"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
            
            {/* Expanded view */}
            {expandedId === palette.id && (
              <div className="mt-3 grid grid-cols-5 gap-1">
                {palette.colors.map((color, i) => (
                  <ColorBlock key={i} color={color} size="sm" />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedPalettes;