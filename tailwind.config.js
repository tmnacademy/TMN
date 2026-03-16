/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent:  "#C8D400",
        dark:    "#0e0f0a",
        dark2:   "#141510",
        card:    "#1e2018",
        card2:   "#232518",
        muted:   "#9a9b8e",
        muted2:  "#6b6c60",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      borderColor: {
        base:  "rgba(200, 212, 0, 0.12)",
        base2: "rgba(200, 212, 0, 0.20)",
      },
    },
  },
  plugins: [],
};