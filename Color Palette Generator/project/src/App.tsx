import React from 'react';
import Header from './components/Header';
import PaletteGenerator from './components/PaletteGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="py-6">
        <PaletteGenerator />
      </main>
      <footer className="bg-gray-800 text-white py-6 mt-10">
        <div className="container mx-auto px-4 text-center">
          <p>Color Palette Generator • Create beautiful color combinations</p>
          <p className="text-sm text-gray-400 mt-2">
            Made with ❤️ for designers and developers
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;