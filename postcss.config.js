module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
    cssnano: {},
    'postcss-custom-properties-fallback': {
      // importFrom: require.resolve('react-spring-bottom-sheet/defaults.json'),
    },
  },
};
