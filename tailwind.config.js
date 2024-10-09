/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#ffffff',
        primary: '#009C41',
        secondary: '#145DAC',
        highlight: '#e28b28'
      },
      animation: {
        'fade-out-3': 'fadeOut 3s ease-in-out',
        'ltr-linear-infinite': 'ltr-linear-infinite 60s linear infinite'
      },
      boxShadow: {
        custom1: '0px 0px 30px -5px rgba(0, 0, 0, 0.28);'
      },
      keyframes: {
        'ltr-linear-infinite': {
          from: { 'background-position': '0 0' },
          to: { 'background-position': '-400% 0%' }
        }
      }
    }
  },
  plugins: [
    require('tailwind-gradient-mask-image'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp')
  ]
};
