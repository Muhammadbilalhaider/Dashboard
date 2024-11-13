// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        interFont: ["Inter", "sans-serif"],
      },
      colors: {
      
        navColor: "#280559",
        createAcountColor: "#42b72a",
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
