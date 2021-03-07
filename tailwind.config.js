module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'fnb-purple': {
          light: '#C56DAD',
          DEFAULT: '#B9519E'
        },
        'fnb-orange': {
          light: '#F59651',
          DEFAULT: '#F27820'
        },
        'fnb-green': {
          light: '#1ADB5A',
          DEFAULT: '#15B34A'
        },
        'fnb-white': {
          DEFAULT: '#FFFFFB'
        },
        'fnb-black': {
          light: '#333333',
          DEFAULT: '#1F1F1F'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwind-scrollbar')]
}
