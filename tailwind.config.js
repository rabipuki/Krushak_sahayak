/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./standalone.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Earthy & Agricultural Palette
        earth: {
          green: '#166534', // forest green (bg-green-800)
          gold: '#f59e0b',  // harvest gold (bg-amber-500)
          sand: '#fffaf0',  // off-white (bg-orange-50)
          clay: '#9a3412',  // clay earth accent
          paddy: '#15803d'  // fresh paddy green
        }
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Noto Sans Odia"',
          'Kalinga',
          '"Oriya Sangam MN"',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif'
        ]
      }
    },
  },
  plugins: [],
}
