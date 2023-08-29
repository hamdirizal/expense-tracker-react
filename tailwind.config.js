/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#000000",

      "grey-bg-1": "#31333c",
      "grey-bg-2": "#383a44",

      "grey-input-bg": "#4c505d",
      "grey-input-border": "#666b79",

      "white-text": "#f5f5f5",
      "grey-text": "#bdbec9",
      "black-text": "#2a1c2e",
      "red-text": "#fb5178",

      "green-button": "#51e4c0",

      "color-border-active": "#51e4c0",
      "color-bg-active": "#32534b",

      "color-btn-secondary": "#999d9f",
    },
    fontSize: {
      "minus-3": "0.63rem",
      "minus-2": "0.75rem",
      "minus-1": "0.85rem",
      base: "1rem", // 17px
      "plus-1": "1.15rem",
      "plus-2": "1.4rem",
      "plus-3": "1.9rem",
    },
    extend: {
      scale: {
        96: ".96",
        97: ".97",
        98: ".98",
        99: ".99",
      },
    },
  },
  plugins: [],
};
