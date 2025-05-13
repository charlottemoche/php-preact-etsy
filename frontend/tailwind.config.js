/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#EB6D20',
        dark: '#22252A',
        'dark-2': '#1C1E22',
      }
    },
  },
  plugins: [],
}