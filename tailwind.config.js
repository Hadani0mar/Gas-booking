/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // مهم
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        messiri: ["'El Messiri'", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
}
