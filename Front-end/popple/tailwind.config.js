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
        'popple':{
          "light" : "#A933F1",
          "DEFAULT": "#8900E1",
          "dark": "#6700AD"
        },
        'white':'#ffffff',
      },
      fontFamily: {
        jua: ['Jua-Regular'],
        notoSans: ['NotoSansKR-VariableFont_wght'],
        GowunDodum: ['GowunDodum'],
        nanumS: ['NanumSquareR'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],

}

