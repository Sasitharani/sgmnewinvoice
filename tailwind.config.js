/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '96': '24rem', // Add custom spacing for width
      },
      boxShadow: {
        'modal': '0 10px 15px rgba(0, 0, 0, 0.1)', // Add custom box shadow
      },
      backgroundColor: {
        'modal-overlay': 'rgba(0, 0, 0, 0.5)', // Add custom background color
      },
      borderRadius: {
        'lg': '0.5rem', // Add custom border radius
      },
    },
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
        '.modal': {
          position: 'fixed',
          inset: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        '.modal-content': {
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
          width: '24rem', // w-96 in Tailwind CSS
        },
        '.inside-modal': {
          width: '100%',
          padding: '0.5rem',
          marginBottom: '0.5rem',
          border: '1px solid #d1d5db', // border-gray-300
          borderRadius: '0.375rem', // rounded
          backgroundColor: '#f3f4f6', // bg-gray-100
        },
      });
    },
  ],
}
