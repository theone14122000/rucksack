import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: "#FFFDF2",
          brown: "#9D6638",
          "brown-dark": "#7A4F2B",
          "brown-light": "#B8844F",
          black: "#000000",
          charcoal: "#1A1A1A",
          taupe: "#6B5B4D",
          sand: "#D4B896",
          offwhite: "#FFFDF2",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "DM Serif Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px -10px rgba(0, 0, 0, 0.06), 0 20px 25px -5px rgba(0, 0, 0, 0.03)",
        "luxury-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.12), 0 0 20px rgba(157, 102, 56, 0.12)",
        "card": "0 2px 8px rgba(0, 0, 0, 0.04)",
        "card-hover": "0 12px 32px -8px rgba(0, 0, 0, 0.12)",
      },
      borderRadius: {
        "card": "6px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
