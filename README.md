# crescendo (view at https://crescendomusic.live/)

A beautiful, AI-powered time-adaptive music player designed to help students focus, relax, and study better. Features curated ambient music with a clean interface that adapts its theme to the time of day.

![Crescendo](https://img.shields.io/badge/React-19.2.0-blue) ![Express](https://img.shields.io/badge/Express-4.18.2-green) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4.18-cyan)

## ✨ Features

- **🌅 Time-Adaptive Themes** - Dynamic color schemes that change based on the time of day
  - Morning (5 AM - 11 AM): Warm sunrise tones
  - Afternoon (11 AM - 6 PM): Bright daylight colors
  - Night (6 PM - 5 AM): Cool, calming evening hues

- **🎧 Curated Music Library** - Carefully selected ambient tracks for studying and sleeping

- **🎨 Beautiful UI** - Clean, distraction-free interface with:
  - Random album art from Unsplash
  - Glassmorphism design
  - Smooth animations
  - Progress bar with seek functionality

- **🎛️ Playback Controls**
  - Play/Pause
  - Loop single track
  - Shuffle playlist
  - Volume control with visual feedback

## 🚀 Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icon set

### Backend
- **Express.js** - RESTful API server
- **Node.js** - Runtime environment
- **CORS** - Cross-origin resource sharing

## 📦 Project Structure

```
ai-music-site/
├── backend/
│   ├── data/
│   │   └── songs.json          # Song metadata
│   ├── public/
│   │   └── audio/              # MP3 files
│   ├── routes/
│   │   └── songs.js            # API routes
│   ├── server.js               # Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AboutModal.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Header.jsx
    │   │   └── MusicPlayer.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── tailwind.config.js
    └── package.json
```

## 🎨 Color Themes

The application uses custom Tailwind colors that adapt to the time of day:

```javascript
// Morning (Sunrise)
morningPrimary: '#e8a84d'    // Golden
morningSecondary: '#c85a3f'  // Terracotta
morningAccent: '#ff8c42'     // Orange

// Afternoon (Daylight)
afternoonPrimary: '#f4a261'   // Peachy Orange
afternoonSecondary: '#e9c46a' // Golden Yellow
afternoonAccent: '#2a9d8f'    // Teal

// Night (Evening)
nightPrimary: '#1e3a5f'    // Midnight Blue
nightSecondary: '#2d1b4e'  // Deep Purple
nightAccent: '#818cf8'     // Soft Indigo
```

## 📄 Music License

All music was found Royalty Free on Youtube. The channel that supported all the audio was "BreakingCopyright - Royalty Free Music".

Crescendo appreciates the opportunity to use this music!

## 💖 Made with Love

Built for students who need the perfect soundtrack to enter flow state for their study sessions.
