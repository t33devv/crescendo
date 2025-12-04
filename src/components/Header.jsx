import { Moon, Sun, Info } from 'lucide-react';

function Header({ darkMode, setDarkMode, onAboutClick }) {
  return (
    <header className="bg-gradient-to-r from-primary via-accent to-secondary px-6 py-4 flex items-center justify-between">
      
      <h1 className="text-xl font-bold text-white">Crescendo</h1>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={onAboutClick}
          className="px-3 py-2 hover:bg-white/20 rounded-lg transition-colors text-white text-sm font-medium"
        >
          About
        </button>
        
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}

export default Header;