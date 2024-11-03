module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F4C75', // Navy Blue
          light: '#3282B8',
        },
        accent: {
          DEFAULT: '#FFA500', // Gold
          light: '#FFD700',
        },
        background: '#F8F9FA',
        text: '#2D3748',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}