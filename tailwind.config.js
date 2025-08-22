/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      keyframes: {
        breathing: {
          '0%, 100%': { transform: 'scale(0.96)' },
          '50%': { transform: 'scale(1.12)' },
        },
      },
      animation: {
        breathing: 'breathing 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} 