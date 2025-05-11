import React from 'react';
import { Palette } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-6 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Palette className="w-8 h-8 mr-3" />
          <h1 className="text-2xl font-bold">Color Palette Generator</h1>
        </div>
        <p className="text-sm md:text-base opacity-90">
          Create beautiful color combinations for your next project
        </p>
      </div>
    </header>
  );
};

export default Header;