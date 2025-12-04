import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Repeat } from 'lucide-react';

function MusicPlayer({ song, songs, onSongChange, darkMode, isMorning, isAfternoon, isNight }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(true);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const audioRef = useRef(null);

  const albumArtOptions = [
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1465146633011-14f8e0781093?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=500&h=500&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=500&fit=crop',
  ];

  const getRandomAlbumArt = () => {
    const seed = song.id ? parseInt(song.id.replace(/\D/g, '')) : Math.random() * 1000;
    const index = seed % albumArtOptions.length;
    return albumArtOptions[index];
  };

  const getAccentColor = () => {
    if (isMorning) return '#ff8c42';
    if (isAfternoon) return '#2a9d8f';
    if (isNight) return '#818cf8';
    return '#f97316';
  };

  const getAccentClass = () => {
    if (isMorning) return 'text-morningAccent';
    if (isAfternoon) return 'text-afternoonAccent';
    if (isNight) return 'text-nightAccent';
    return 'text-orange-500';
  };

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

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
    audioRef.current.currentTime = clickPosition * duration;
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

  const getAudioUrl = () => {
    const paddedId = song.id.toString().padStart(3, '0');
    return `https://crescendo-backend-etnq.onrender.com/audio/${song.category}-${paddedId}.mp3`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 flex gap-6 w-[90%] max-w-2xl shadow-xl">

      <div className="w-44 h-44 flex-shrink-0">
        <img 
          src={getRandomAlbumArt()} 
          alt={song.title} 
          className="w-full h-full object-cover rounded-xl shadow-md"
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between">

        <div>
          <h2 className="text-2xl font-bold mb-1 text-gray-900">{song.title}</h2>
          <p className="text-gray-500 text-base">{song.artist}</p>
        </div>

        <div className="space-y-4">
          
          <div 
            className="w-full h-1.5 bg-gray-200 rounded-full cursor-pointer overflow-hidden"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full rounded-full transition-all duration-100"
              style={{ 
                width: `${progress}%`,
                background: getAccentColor()
              }}
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="flex items-center gap-4 ml-[-0.5rem]">
            <button 
              onClick={togglePlay}
              className="p-2.5 hover:bg-gray-100 rounded-full transition-all active:scale-95"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <button 
              onClick={() => setIsLooping(!isLooping)}
              className={`p-2 hover:bg-gray-100 rounded-full transition-all active:scale-95 ${
                isLooping ? `${getAccentClass()}` : 'text-gray-400'
              }`}
              title={isLooping ? 'Loop On' : 'Loop Off'}
            >
              <Repeat size={20} />
            </button>

            <div className="flex items-center gap-3 flex-1 ml-2">
              <Volume2 size={20} className="text-gray-600 flex-shrink-0" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${getAccentColor()} 0%, ${getAccentColor()} ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`,
                  '--accent-color': getAccentColor()
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={getAudioUrl()}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
      />
    </div>
  );
}

export default MusicPlayer;