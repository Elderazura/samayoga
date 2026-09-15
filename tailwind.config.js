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
        // Earth & Breath — moss as primary brand
        primary: {
          DEFAULT: '#3F5344',
          50: '#F3F6F2',
          100: '#E8EDE4',
          200: '#D1DBC9',
          300: '#A8B89A',
          400: '#7A9170',
          500: '#5C6B52',
          600: '#3F5344',
          700: '#344438',
          800: '#2A372E',
          900: '#1F2A22',
        },
        stone: {
          DEFAULT: '#F4F1EA',
          50: '#FBF9F5',
          100: '#F4F1EA',
          200: '#EBE6DC',
          300: '#D9D4C8',
          400: '#C4BDB0',
          500: '#A89F90',
        },
        // Legacy alias — maps old cream usage to warm stone
        cream: {
          DEFAULT: '#F4F1EA',
          50: '#FBF9F5',
          100: '#F4F1EA',
          200: '#EBE6DC',
          300: '#D9D4C8',
          400: '#F4F1EA',
          500: '#EBE6DC',
          600: '#D9D4C8',
          700: '#C4BDB0',
          800: '#A89F90',
          900: '#7A7266',
        },
        sage: {
          DEFAULT: '#5C6B52',
          50: '#F3F6F2',
          100: '#E8EDE4',
          200: '#D1DBC9',
          300: '#A8B89A',
          400: '#7A9170',
          500: '#5C6B52',
        },
        umber: {
          DEFAULT: '#2C2824',
          muted: '#4A453F',
          soft: '#6B645C',
        },
        clay: {
          DEFAULT: '#A67C5B',
          soft: '#C4A484',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        serif: ['var(--font-display)', 'Georgia', 'serif'],
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      animation: {
        'ken-burns': 'kenBurns 28s ease-in-out infinite alternate',
        'hero-breathe': 'heroBreathe 12s ease-in-out infinite',
      },
      keyframes: {
        kenBurns: {
          '0%': { transform: 'scale(1.08) translateX(1%)' },
          '100%': { transform: 'scale(1.16) translateX(-1.5%)' },
        },
        heroBreathe: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.55' },
        },
      },
    },
  },
  plugins: [],
}
