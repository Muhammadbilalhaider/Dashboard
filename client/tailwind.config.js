// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        interFont: ["Inter", "sans-serif"],
        robotoFont: ["Roboto", "sans-serif"], // Added this from HEAD section
      },
      colors: {
<<<<<<< HEAD
        buttonColor: "#0866ff", // Picked from bilal-branch
        navColor: "#280559",    // Picked from bilal-branch
        createAcountColor: "#42b72a", // Picked from bilal-branch
=======
      
        navColor: "#280559",
        createAcountColor: "#42b72a",
>>>>>>> bilal-branch
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
