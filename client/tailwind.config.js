/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          // Anchored on the KK Global Trade brand navy (#001F48)
          DEFAULT: '#001f48',
          50: '#f0f2f4',
          100: '#d9dde4',
          200: '#adb7c4',
          300: '#808fa4',
          400: '#526783',
          500: '#294365',
          600: '#0d2a51',
          700: '#001f48',
          800: '#001a3d',
          900: '#001632',
          950: '#001128',
        },
        forest: {
          DEFAULT: '#1b3a2b',
          50: '#eaf1ec',
          100: '#c9dccf',
          200: '#a3c3ab',
          300: '#7ba889',
          400: '#568d69',
          500: '#3c744f',
          600: '#2c5c3d',
          700: '#22482f',
          800: '#1b3a2b',
          900: '#132a1f',
        },
        gold: {
          // Anchored on the KK Global Trade brand gold (#BE8924)
          DEFAULT: '#be8924',
          50: '#faf6ed',
          100: '#f2e7d3',
          200: '#e5d0a7',
          300: '#d7b677',
          400: '#ca9e4b',
          500: '#be8924',
          600: '#a2741f',
          700: '#856019',
        },
        earth: {
          DEFAULT: '#7a5230',
          light: '#a9754a',
        },
        offwhite: '#f7f4ec',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(0, 31, 72, 0.25)',
        'card-hover': '0 24px 48px -16px rgba(0, 31, 72, 0.32)',
        glass: '0 8px 32px -8px rgba(0, 31, 72, 0.18)',
        nav: '0 1px 0 0 rgba(0, 31, 72, 0.06), 0 12px 24px -12px rgba(0, 31, 72, 0.12)',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
