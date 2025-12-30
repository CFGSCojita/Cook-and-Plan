/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5D4037',
        cream: '#F5E6D3',
        accent: '#FF6F3C',
        dark: '#424242',
        light: '#FCFCFC',
      },
    },
  },
  plugins: [],
}