/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // This tells Tailwind to look for classes in these files
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#535bf2',      // Your primary color
        secondary: '#ff4d4d',    // Your secondary color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],  // Your font family
      },
    },
  },
  plugins: [],
}