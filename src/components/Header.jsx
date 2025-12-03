import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';

function Header() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="bg-gradient-to-r from-primary via-accent to-secondary px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-white">Crescendo</h1>
      
      <button 
        onClick={() => setDarkMode(!darkMode)} 
        className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}

export default Header;