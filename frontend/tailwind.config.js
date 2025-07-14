const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",flowbite.content(),],
  theme: {
    extend: { maxWidth: {
      'screen-2xl': '1400px', 
      'custom-1200': '1200px', 
      'custom-900': '900px', 
    },
    colors: {
      'primary': '#e53888',
      'primary-dark': "#AC1754",
      'primary-light': '#FFEDFA',
      'text-dark': '#0f172a',
      'text-light': '#64748b',
      'extra-light': '#f8fafc',
      "pending": "#FF6363",
      'processing':'#FCC737',
      'shipped':'#63C8FF',
      'completed':'#56DFCF'
    },
    
    fontFamily: {
      custom: ['Roboto', 'sans-serif'],  // Replace 'Roboto' with your font name
    },},
  },
  plugins: [  flowbite.plugin(),],
}

