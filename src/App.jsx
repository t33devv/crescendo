import { useState, useEffect } from 'react';
import Header from './components/Header';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';
import AboutModal from './components/AboutModal';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [category, setCategory] = useState('study');
  const [isMorning, setIsMorning] = useState(true);
  const [isAfternoon, setIsAfternoon] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();

    if (hours > 5 && hours < 11) {
      setIsMorning(true);
      setIsAfternoon(false);
      setIsNight(false);
    } else if (hours >= 11 && hours < 18) {
      setIsMorning(false);
      setIsAfternoon(true);
      setIsNight(false);
    } else {
      setIsMorning(false);
      setIsAfternoon(false);
      setIsNight(true);
    }
    fetchSongs(category);
  }, [category]);

  const fetchSongs = async (cat) => {
    try {
      const response = await fetch(`https://crescendo-backend-etnq.onrender.com/api/songs?category=${cat}`);
      const data = await response.json();
      setSongs(data);
      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setCurrentSong(data[randomIndex]);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  return (
    <>
      <div className={`${isMorning && 'from-morningPrimary to-morningSecondary via-morningAccent'} ${isAfternoon && 'from-afternoonPrimary to-afternoonSecondary via-afternoonAccent'} ${isNight && 'from-nightPrimary to-nightSecondary via-nightAccent'} min-h-screen bg-gradient-to-br flex items-center justify-center p-6`}>
        <div className="w-[90%] max-w-3xl bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ minHeight: '70vh' }}>

          <Header 
            darkMode={darkMode} 
            setDarkMode={setDarkMode}
            onAboutClick={() => setIsAboutOpen(true)}
          />
          
          <main className="flex-1 flex items-center justify-center p-8">
            {currentSong ? (
              <MusicPlayer 
                song={currentSong} 
                songs={songs}
                onSongChange={setCurrentSong}
                category={category}
                setCategory={setCategory}
                darkMode={darkMode}
                isMorning={isMorning}
                isAfternoon={isAfternoon}
                isNight={isNight}
              />
            ) : (
              <div className="text-center text-gray-500">
                <p className="text-lg text-white">Loading music...</p>
              </div>
            )}
          </main>
          
          <Footer />
        </div>
      </div>

      <AboutModal 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
      />
    </>
  );
}

export default App;