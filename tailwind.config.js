<<<<<<< HEAD
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom animations for better performance
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-subtle': 'bounce 1s ease-in-out 2',
      },
      // Optimized color palette - only include colors we use
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
        },
=======
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED', // Violet 600
        accent: '#F472B6',  // Pink 400
        background: '#F8FAFC', // Slate 50
        surface: '#FFFFFF',
        text: '#1E293B', // Slate 800
        subtle: '#64748B', // Slate 400
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
>>>>>>> pluginstore/main
      },
    },
  },
  plugins: [],
<<<<<<< HEAD
  // Optimize for production
  corePlugins: {
    // Disable unused utilities for smaller bundle
    preflight: true,
    container: false,
    accessibility: false,
    appearance: false,
    backgroundAttachment: false,
    backgroundClip: false,
    backgroundOrigin: false,
    backgroundRepeat: false,
    backgroundSize: false,
    backdropBlur: false,
    backdropBrightness: false,
    backdropContrast: false,
    backdropGrayscale: false,
    backdropHueRotate: false,
    backdropInvert: false,
    backdropOpacity: false,
    backdropSaturate: false,
    backdropSepia: false,
  },
  // Further optimize bundle size
  future: {
    hoverOnlyWhenSupported: true,
  },
}
=======
};
>>>>>>> pluginstore/main
