/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}", // This tells Tailwind to look for classes in these files
  "./public/index.html"
];
export const theme = {
  extend: {
    colors: {
      primary: '#535bf2', // Your primary color
      secondary: '#ff4d4d', // Your secondary color
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'], // Your font family
    },
  },
};
export const plugins = [];