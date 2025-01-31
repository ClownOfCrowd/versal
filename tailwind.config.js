/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['var(--font-playfair)'],
        lora: ['var(--font-lora)'],
      },
      colors: {
        primary: '#5A0B0D',    // бордовый
        accent: '#C5A47E',     // золото
        dark: '#1A1A1A',       // угольный
      },
      animation: {
        'gold-glow': 'goldGlow 2s infinite',
      },
      keyframes: {
        goldGlow: {
          '0%': { boxShadow: '0 0 5px #C5A47E' },
          '50%': { boxShadow: '0 0 20px #C5A47E' },
          '100%': { boxShadow: '0 0 5px #C5A47E' },
        },
      },
    },
  },
  plugins: [],
}

