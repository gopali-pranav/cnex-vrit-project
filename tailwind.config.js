/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image":
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/public/heroimage.jpeg')",
      },
    },
    colors: {
      primary: "#082D4A",
      secondary: " #FF785A",
      white: "#FFFFFF",
      herotext2: "#B6B8B9",
    },
  },

  plugins: [],
};
