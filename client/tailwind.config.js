/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyan-aqua': {
          50: '#edfffe',
          100: '#c0ffff',
          200: '#81fdff',
          300: '#3afbff',
          400: '#00fffb',
          500: '#00e2e0',
          600: '#00b5b7',
          700: '#008e91',
          800: '#006d72',
          900: '#04595d',
          950: '#00353a',
        },
    },
  },
  
  plugins: [],
  },
}