/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "grey-bg-1": "#31333c",
      "grey-bg-2": "#383a44",

      "grey-input-bg": "#4c505d",
      "grey-input-border": "#666b79",

      "white-text": "#f5f5f5",
      "grey-text": "#9e9fad",
      "black-text": "#2a1c2e",
      "red-text": "#fb5178",

      "green-button": "#51e4c0",
    },
    fontSize: {
      tiny: "0.63rem",
      sm: "0.9rem",
      base: "1rem", // 17px
      lg: "1.125rem",
      xl: "1.7rem",
    },
  },
  plugins: [],
};
