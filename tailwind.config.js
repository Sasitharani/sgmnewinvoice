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
      })
    },
  ],
}

