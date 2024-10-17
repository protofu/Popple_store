/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        transparent: "transparent",
        current: "currentColor",
        'popple':'#8900E1',
        'white':'#ffffff'
      }
    },
  },
  plugins: [],

}

