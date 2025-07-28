module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    tailwindcss: {},
    autoprefixer: {},
    // CSS optimization for production
    ...(process.env.NODE_ENV === 'production' && {
      '@fullhuman/postcss-purgecss': {
        content: [
          './pages/**/*.{js,ts,jsx,tsx}',
          './components/**/*.{js,ts,jsx,tsx}',
          './app/**/*.{js,ts,jsx,tsx}',
          './src/**/*.{js,ts,jsx,tsx}',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: [
          // Keep animation classes
          'animate-pulse-slow',
          'animate-bounce-subtle',
          // Keep dynamic color classes
          /^bg-(blue|purple|indigo|gray|orange|pink|teal|green|red)-(50|100|500|600)$/,
          /^text-(blue|purple|indigo|gray|orange|pink|teal|green|red)-(50|100|500|600|700|800)$/,
          /^border-(blue|purple|indigo|gray|orange|pink|teal|green|red)-(100|200|300|800)$/,
          // Keep hover states
          /^hover:/,
          // Keep responsive classes
          /^(sm|md|lg|xl|2xl):/,
        ],
      },
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          colormin: true,
          convertValues: {
            length: false, // Don't convert px to shorter units
          },
        }],
      },
    }),
  },
}
