import { useState, useEffect } from 'react';
import Header from './components/Header';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [category, setCategory] = useState('study');

  useEffect(() => {
    fetchSongs(category);
  }, [category]);

  const fetchSongs = async (cat) => {
    try {
      const response = await fetch(`http://localhost:3001/api/songs?category=${cat}`);
      const data = await response.json();
      setSongs(data);
      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length)
        setCurrentSong(data[randomIndex]);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center p-6">
      {/* Smaller Centered Container Box */}
      <div className="w-full max-w-3xl bg-amber-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ minHeight: '70vh' }}>
        {/* Header - simplified without category buttons */}
        <Header />
        
        {/* Main Content Area */}
        <main className="flex-1 flex items-center justify-center p-8">
          {currentSong ? (
            <MusicPlayer 
              song={currentSong} 
              songs={songs}
              onSongChange={setCurrentSong}
              category={category}
              setCategory={setCategory}
            />
          ) : (
            <div className="text-center text-gray-500">
              <p className="text-lg">Loading music...</p>
            </div>
          )}
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;