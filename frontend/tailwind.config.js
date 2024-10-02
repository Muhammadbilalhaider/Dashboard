/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
      fontFamily: {
        interFont: ["Inter", "sans-serif"],
      },
      colors: {
        buttonColor: "#0866ff",
        navColor: "#280559",
        createAcountColor : "#42b72a"
      },
    },
  },
  plugins: [],
};
