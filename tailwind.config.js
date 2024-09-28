const defaultTheme = require('tailwindcss/defaultTheme')

const spice = {
  50: '#f7f4ef',
  100: '#ebe3d6',
  200: '#d9c8af',
  300: '#c3a681',
  400: '#b1885e',
  500: '#a27650',
  600: '#8b5f43',
  700: '#6a4535',
  800: '#5f3f34',
  900: '#533730',
  950: '#2f1d19',
}

module.exports = {
  darkMode: 'class',
  content: ['./node_modules/@morpheme/**/src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        spice,
      },
      fontFamily: {
        sans: [
          'Inter',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  presets: [
    require('@morpheme/tailwind-config/preset'),
  ],
}
