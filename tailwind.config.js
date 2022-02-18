module.exports = {
  content: ["./src/components/Login.tsx"], 
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
    colors: {
      'darkdkgry': '#211F26',
    }
  },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('postcss-import'), 
    require('tailwindcss'), 
    require('autoprefixer'), {cssnano: {}}
  ],
}
