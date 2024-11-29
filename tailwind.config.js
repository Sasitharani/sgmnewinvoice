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
        '.excel-view': {
          border: '0.5px solid #d1d5db', // border-gray-300
          padding: '1px', // p-2
          borderRadius: '2px', // rounded
        },
        '.table-row:nth-child(odd)': {
          backgroundColor: '#e0f7fa', // Lighter blue
        },
        '.table-row:nth-child(even)': {
          backgroundColor: '#e0fce0', // Lighter green
        },
        '.table-row-gap': {
          marginBottom: '0.5rem', // Add gap between table rows
        },
        '.table-column-gap': {
          marginleft: '0.5rem', // Add gap between table rows
        },
      });
    },
  ],
}
