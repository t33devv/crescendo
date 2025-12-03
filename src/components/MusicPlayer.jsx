import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Repeat, Shuffle } from 'lucide-react';

function MusicPlayer({ song, songs, onSongChange, category, setCategory }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(true);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      setCurrentTime(0);
      
      if (shouldAutoPlay) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(err => console.log('Play failed:', err));
      } else {
        setIsPlaying(false);
      }
    }
  }, [song, shouldAutoPlay]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getRandomSong = () => {
    if (songs.length <= 1) return songs[0];

    let randomSong;
    do {
      const randomIndex = Math.floor(Math.random() * songs.length);
      randomSong = songs[randomIndex];
    } while (randomSong.id === song.id);

    return randomSong;
  };

  const handleSongEnd = () => {
    if (isLooping) {
      audioRef.current.play();
    } else if (isShuffling) {
      const nextSong = getRandomSong();
      setShouldAutoPlay(true);
      onSongChange(nextSong);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 flex gap-6 w-full max-w-xl shadow-lg relative">

      <div className="w-36 h-36 flex-shrink-0">
        <img 
          src={song.albumArt} 
          alt={song.title} 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between relative">

        <div className="absolute top-0 right-0 font-medium text-gray-700">
          {formatTime(currentTime)}
        </div>

        <div className="mb-3 pr-16">
          <h2 className="text-xl font-bold mb-0.5">{song.title}</h2>
          <p className="text-gray-600 text-sm mb-2">{song.artist}</p>
          
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setCategory('study')}
              className={`px-3 py-1.5 rounded-lg text-lg transition-all ${
                category === 'study'
                  ? 'bg-orange-100 ring-2 ring-orange-400 scale-105'
                  : 'bg-gray-100 hover:bg-gray-200 opacity-60'
              }`}
              title="Study Mode"
            >
              📚
            </button>
            <button
              onClick={() => setCategory('sleep')}
              className={`px-3 py-1.5 rounded-lg text-lg transition-all ${
                category === 'sleep'
                  ? 'bg-orange-100 ring-2 ring-orange-400 scale-105'
                  : 'bg-gray-100 hover:bg-gray-200 opacity-60'
              }`}
              title="Sleep Mode"
            >
              😴
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={togglePlay}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </button>
          
          <button 
            onClick={() => setIsLooping(!isLooping)}
            className={`p-1.5 hover:bg-gray-100 rounded-full transition-all ${
              isLooping ? 'opacity-100 text-orange-500' : 'opacity-50'
            }`}
            title={isLooping ? 'Loop On' : 'Loop Off'}
          >
            <Repeat size={18} />
          </button>

          <div className="flex items-center gap-2 flex-1">
            <Volume2 size={18} />
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{
                background: `linear-gradient(to right, #f97316 0%, #f97316 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`
                }}
            />
            </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={song.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleSongEnd}
      />
    </div>
  );
}

export default MusicPlayer;