/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "grey-bg-1": "#31333c",
        "white-text": "#f5f5f5",
      },
    },
  },
  plugins: [],
};
