/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold:     { DEFAULT: '#c8a84e', light: '#e8c96a', dark: '#a68930' },
        night:    { DEFAULT: '#c8b84a', light: '#e8d060' },
        bg:       { DEFAULT: '#0b0a08', 2: '#111009', 3: '#18160f', 4: '#201e15', 5: '#28261c' },
        'night-bg':{ DEFAULT: '#04050d', 2: '#07091a', 3: '#0c0e22' },
      },
      fontFamily: {
        sans:   ['"Inter"', 'sans-serif'],
        serif:  ['"Playfair Display"', 'serif'],
        display:['"Cinzel"', 'serif'],
      },
      animation: {
        'pulse-gold': 'pulseGold 2.5s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGold: { '0%,100%': { boxShadow: '0 0 20px rgba(200,168,78,.4)' }, '50%': { boxShadow: '0 0 40px rgba(200,168,78,.7)' } },
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
      },
    },
  },
  plugins: [],
}
