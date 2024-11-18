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
        navColor: "#280559",
        createAcountColor: "#42b72a",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
