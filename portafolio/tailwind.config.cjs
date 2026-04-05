module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
    "./js/**/*.js",
    "./css/**/*.css"
  ],
  corePlugins: {
    // Disable preflight to avoid Tailwind's base reset changing existing styles
    preflight: false
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
