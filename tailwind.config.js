/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0f',
        card: '#12121a',
        border: '#1e1e2e',
      }
    },
  },
  plugins: [],
}
