/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'dark:text-gray-200',
    'dark:text-white',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#EB6D20'
      }
    },
  },
  plugins: [],
}