/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#E48273',
          50: '#FDF5F4',
          100: '#FBE9E7',
          200: '#F7D3CF',
          300: '#F3BDB7',
          400: '#EFA79F',
          500: '#E48273',
          600: '#D66B5A',
          700: '#B85A4A',
          800: '#9A493A',
          900: '#7C382A',
        },
        cream: {
          DEFAULT: '#F1E7BA',
          50: '#FDFCF7',
          100: '#FBF9EF',
          200: '#F7F3DF',
          300: '#F3EDCF',
          400: '#F1E7BA',
          500: '#EDE1A5',
          600: '#E9DB90',
          700: '#D4C77A',
          800: '#BFB364',
          900: '#AA9F4E',
        },
        // Keep sage for subtle accents if needed
        sage: {
          DEFAULT: '#A8B5A0',
          50: '#F5F7F4',
          100: '#E8EDE6',
          200: '#D1DBCC',
          300: '#BAC9B2',
          400: '#A8B5A0',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'breath': 'breath 10s ease-in-out infinite',
        'wind': 'wind 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        breath: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.03' },
          '50%': { transform: 'scale(1.05)', opacity: '0.06' },
        },
        wind: {
          '0%': { transform: 'translateX(-100%) translateY(0%)' },
          '100%': { transform: 'translateX(100vw) translateY(-10vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
