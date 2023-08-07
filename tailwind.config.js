/** @type {import('tailwindcss').Config} */
module.exports = {
  separator: '_',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      'backgroundColor': {
        'main': '#edf1f3',
      },
      'spacing': {
        '74': '74px',
      },
    },
  },
  plugins: [],
}

