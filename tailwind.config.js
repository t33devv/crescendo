/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        morningPrimary: '#e8a84d',
        morningSecondary: '#c85a3f',
        morningAccent: '#ff8c42',

        afternoonPrimary: '#f4a261',
        afternoonSecondary: '#e9c46a',
        afternoonAccent: '#2a9d8f',
        
        nightPrimary: '#1e3a5f',
        nightSecondary: '#2d1b4e',
        nightAccent: '#818cf8',  
      },
    },
  },
  plugins: [],
}