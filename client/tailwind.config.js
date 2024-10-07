/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
      fontFamily: {
        interFont: ["Inter", "sans-serif"],
        robotoFont: ["Roboto", "sans-serif"], // Added this from HEAD section
      },
      colors: {
        buttonColor: "#0866ff", // Picked from bilal-branch
        navColor: "#280559",    // Picked from bilal-branch
        createAcountColor: "#42b72a", // Picked from bilal-branch
      },
    },
  },
  plugins: [],
};
