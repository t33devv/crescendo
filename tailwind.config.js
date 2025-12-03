/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e8a84d',      // Brighter golden/amber
        secondary: '#c85a3f',    // More vibrant coral/red-brown
        accent: '#ff8c42',       // Bright orange accent
      },
    },
  },
  plugins: [],
}