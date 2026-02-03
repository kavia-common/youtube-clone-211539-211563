/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        youtube: {
          bg: '#0f0f0f',
          sidebar: '#0f0f0f',
          hover: '#272727',
          selected: '#3f3f3f',
          border: '#3f3f3f',
          text: '#ffffff',
          'text-secondary': '#aaaaaa',
          red: '#ff0000',
          'red-dark': '#cc0000',
        }
      },
      fontFamily: {
        roboto: ['Roboto', 'Arial', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      }
    },
  },
  plugins: [],
}
