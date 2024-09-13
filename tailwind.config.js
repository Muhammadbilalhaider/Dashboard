/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<< HEAD
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      interFont: ["Inter", "sans-serif"],
      robotoFont: ["Roboto", "sans-serif"],
    },
    colors: {
      buttonColor: "#280559",  
=======
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        interFont: ["Inter", "sans-serif"],
        robotoFont: ["Roboto", "sans-serif"],
      },
>>>>>>> 5b6abc6f1855199f15cf6a9bf15af5de10d15cc0
    },
  },
  plugins: [],
};