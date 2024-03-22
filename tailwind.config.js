/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image":
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/public/heroimage.jpeg')",
        "fed-img1":
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/public/fedimg/fedimg1.jpeg')",
        "fed-img2":
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/public/fedimg/fedimg2.jpeg')",
        "fed-img3":
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/public/fedimg/userfedimg.jpeg')",
        "faq-image":
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/public/faqimg.jpeg')",
        "cta-image":
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/public/ctaimg.jpeg')",
      },
    },
    colors: {
      primary: "#082D4A",
      secondary: " #FF785A",
      white: "#FFFFFF",
      herotext2: "#B6B8B9",
      lorem: "#C3C4C5",
      reasonbackground: "#062237",
      featurecolor: "#86888A",
      feedbackcolor: "#3F486A",
      faqbackground: "#F3F3F3",
      contactcolor: "#B3B3B3",
      footercolor: "#D1D3DC",
    },
  },

  plugins: [],
};
