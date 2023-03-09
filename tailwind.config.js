/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      xl: '1280px',
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          sm: '1.25rem',
          md: '3.75rem',
          xl: '5rem',
        },
      },

      colors: {
        black: '#080808',
        bg: '#181818',
        light: '#ececec',
        accent: '#3b3bff',
      },
    },
  },
  plugins: [
    require('prettier-plugin-tailwindcss'),
  ],
};