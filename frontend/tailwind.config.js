const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",flowbite.content(),],
  theme: {
    extend: {
      
    },
    
    colors: {
      'primaryColor': '#FF69B4',
    },
  },
  plugins: [  flowbite.plugin(),],
}

