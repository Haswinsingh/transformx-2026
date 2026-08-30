/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#03070D', // Primary dark background
        panel: '#08111C', // Dark metallic
        gunmetal: '#111820', // Dark gunmetal
        primary: '#006DFF', // Optimus blue
        primaryLight: '#00D9FF', // Accent cyan
        secondary: '#E31B23', // Secondary red
        metallic: '#AEB7C2', // Metallic silver
        metallicLight: '#F2F4F7'
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'circuit': 'linear-gradient(to right, rgba(0, 109, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 109, 255, 0.05) 1px, transparent 1px)',
        'metal-texture': 'url("https://www.transparenttextures.com/patterns/brushed-alum.png")'
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 4s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
      }
    },
  },
  plugins: [],
}
