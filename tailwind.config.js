/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-red': '#DA291C',
        'carbon-black': '#0A0A0A',
        'ghost-white': '#F5F5F5',
        'pure-white': '#FFFFFF',
        'accent-gray': '#2C2C2C',
        'highlight-silver': '#C0C0C0',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
        'drive-in': 'driveIn 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'peek-up': 'peekUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'flag-left': 'flagLeft 0.6s ease-out 1.6s forwards',
        'flag-right': 'flagRight 0.6s ease-out 1.6s forwards',
        'spin-fast': 'spin 0.5s linear infinite',
        'spin-1s': 'spin 1s linear infinite',
        'flare-sweep': 'flareSweep 3s ease-in-out infinite',
        'victory-lap': 'victoryLap 4s ease-in-out forwards',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'progress-fill': 'progressFill 2.2s linear forwards',
        'pulse-red': 'pulseRed 1.5s infinite',
        'pulse-red-limited': 'pulseRed 1.5s 3',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        driveIn: {
          '0%': { opacity: '0', transform: 'translateY(100vh) scale(0.6)' },
          '70%': { opacity: '1', transform: 'translateY(-60px) scale(1.05)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        peekUp: {
          '0%': { opacity: '0', transform: 'translateY(100px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        flagLeft: {
          '0%': { opacity: '0', transform: 'translateX(0) translateY(0) rotate(0deg) scale(0.5)' },
          '100%': { opacity: '0.1', transform: 'translateX(-80px) translateY(-20px) rotate(-30deg) scale(1.8)' },
        },
        flagRight: {
          '0%': { opacity: '0', transform: 'translateX(0) translateY(0) rotate(0deg) scale(0.5)' },
          '100%': { opacity: '0.1', transform: 'translateX(80px) translateY(-20px) rotate(30deg) scale(1.8)' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        flareSweep: {
          '0%': { backgroundPosition: '-150% 0' },
          '100%': { backgroundPosition: '250% 0' }
        },
        victoryLap: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '10%': { transform: 'translate(0, 30vh) rotate(180deg)' },
          '25%': { transform: 'translate(-40vw, 30vh) rotate(90deg)' },
          '40%': { transform: 'translate(-40vw, -40vh) rotate(0deg)' },
          '60%': { transform: 'translate(40vw, -40vh) rotate(-90deg)' },
          '80%': { transform: 'translate(40vw, 30vh) rotate(-180deg)' },
          '90%': { transform: 'translate(0, 30vh) rotate(-270deg)' },
          '100%': { transform: 'translate(0, 0) rotate(-360deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-10deg) scale(1.8)' },
          '50%': { transform: 'rotate(10deg) scale(2.2)' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        pulseRed: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '0.7' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    }
  },
  plugins: [],
}