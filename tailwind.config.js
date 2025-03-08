/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        dark: {
          DEFAULT: '#121212',
          paper: '#1E1E1E',
          card: '#282828',
          hover: '#2C2C2C',
          active: '#323232',
          input: '#1A1A1A',
          accent: '#2D3748',
          primary: '#FFFFFF',
          secondary: '#B3B3B3',
          muted: '#8B8B8B',
          border: '#2C2C2C',
          'border-light': '#404040',
        },
      },
      backgroundColor: theme => ({
        dark: theme('colors.dark'),
      }),
      textColor: theme => ({
        dark: theme('colors.dark'),
      }),
      borderColor: theme => ({
        dark: theme('colors.dark'),
      }),
      ringColor: theme => ({
        dark: theme('colors.dark'),
      }),
      placeholderColor: theme => ({
        dark: theme('colors.dark'),
      }),
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.35)',
        'dark': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.45), 0 2px 4px -2px rgba(0, 0, 0, 0.45)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};