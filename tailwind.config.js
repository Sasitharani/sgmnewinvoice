/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.my-center': {
          display: 'flex',
          justifyContent: 'center',
        },
        '.my-border': {
          border: '2px solid black',
        },
        '.border1': {
          border: '1px solid black',
        },
        '.thin-border': {
          boxShadow: '0px 0px 2px 0 #000000',
        },
        '.my-border-left': {
          boxShadow: '-2px 0 3px -2px #000000',
        },
        '.my-border-right': {
          boxShadow: '2px 0 3px -2px #000000',
        },
        '.my-border-top': {
          boxShadow: '0 -2px 3px -3px #000000',
        },
        '.my-border-bottom': {
          boxShadow: '0 2px 3px -2px #000000',
        },
        '.my-vertical-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Ensure the container takes full height
          textAlign: 'center', // Center text horizontally
        },
      });
    },
  ],
}
