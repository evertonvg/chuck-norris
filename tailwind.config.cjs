/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./*.{html,js}"

  ],
  theme: {
    fontFamily:{
      'courier': ['courier-new', 'monospace']
    },
    extend: {
      keyframes: {
        fade: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        fade: 'fade 0.3s ease-in-out forwards',
      }
    },
  },
  plugins: [],
}