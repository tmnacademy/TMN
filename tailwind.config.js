/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent:  "#C8D400",
        base: "#1e2018",
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
      extend: {
        keyframes: {
          borderPulse: {
            "0%,100%": { borderColor: "rgba(200,212,0,0.12)" },
            "50%": { borderColor: "rgba(200,212,0,0.28)" },
          },
          pulseGlow: {
            "0%,100%": { boxShadow: "0 0 4px rgba(200,212,0,0.3)" },
            "50%": { boxShadow: "0 0 16px rgba(200,212,0,0.7)" }, // stronger (your version)
          },
          glyphFloat: {
            "0%": { transform: "translateY(0) rotate(0deg)" },
            "100%": { transform: "translateY(-8px) rotate(6deg)" }, // exact match
          },
          scanLine: {
            "0%": { top: "-30%" },
            "100%": { top: "120%" },
          },
        },
        animation: {
          borderPulse: "borderPulse 4s ease-in-out infinite",
          pulseGlow: "pulseGlow 3s ease-in-out infinite",
          glyphFloat: "glyphFloat var(--dur,2s) ease-in-out infinite alternate",
          scanLine: "scanLine 4s linear infinite",
        },
      }
    },
  },
  plugins: [],
};