/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Royal luxury color palette
        royal: {
          50: '#faf7ff',
          100: '#f4ecff',
          200: '#e9dbff',
          300: '#d6bcff',
          400: '#bb92ff',
          500: '#9f61ff',
          600: '#8b3ff7',
          700: '#7928e3',
          800: '#6520bf',
          900: '#541b9c',
          950: '#36106a',
        },
        gold: {
          50: '#fffcf0',
          100: '#fff8de',
          200: '#fff0bd',
          300: '#ffe490',
          400: '#ffd561',
          500: '#ffca3a',
          600: '#f2b01e',
          700: '#c69016',
          800: '#a47218',
          900: '#865e1a',
          950: '#4a310c',
        },
        platinum: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      fontFamily: {
        'royal': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(159, 97, 255, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(159, 97, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'royal': '0 25px 50px -12px rgba(159, 97, 255, 0.25)',
        'gold': '0 25px 50px -12px rgba(255, 202, 58, 0.25)',
        'luxury': '0 32px 64px -12px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 20px rgba(159, 97, 255, 0.5)',
        'inner-royal': 'inset 0 2px 4px 0 rgba(159, 97, 255, 0.06)',
      },
      backgroundImage: {
        'royal-gradient': 'linear-gradient(135deg, #9f61ff 0%, #7928e3 100%)',
        'gold-gradient': 'linear-gradient(135deg, #ffca3a 0%, #f2b01e 100%)',
        'luxury-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'royal-radial': 'radial-gradient(circle at 50% 50%, #9f61ff 0%, #7928e3 100%)',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      },
      blur: {
        'xs': '2px',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}