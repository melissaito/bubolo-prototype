/** @type {import('tailwindcss').Config} */
export default {
  important: '#why-bubulo-marquee-root',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        teal: {
          brand: '#2a9d8f',
        },
        quote: {
          bg: '#eef7f6',
        },
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        /* Matches global `styles.css` --font-emphasis / headline <em> */
        emphasis: ['"adobe-handwriting-ernie"', 'cursive', 'sans-serif'],
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        /* 60% slower than 143s (143 × 1.6 ≈ 229s per loop) */
        'marquee-left': 'marquee-left 229s linear infinite',
        'marquee-right': 'marquee-right 229s linear infinite',
      },
    },
  },
  plugins: [],
};
