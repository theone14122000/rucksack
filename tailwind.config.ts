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
          // Primary - Turquoise
          turquoise: "#0B8F83",
          "turquoise-light": "#12A89D",
          "turquoise-bright": "#20C4B5",
          "turquoise-50": "#E8F5F3",
          "turquoise-100": "#D1EBE7",
          // Accent - Yellow
          yellow: "#F6D743",
          "yellow-light": "#FFD84D",
          "yellow-50": "#FFFEF0",
          // Premium - Gold
          gold: "#D9A441",
          "gold-light": "#E8B84A",
          "gold-pale": "#F4D27A",
          "gold-50": "#FDF8EE",
          // Dark
          dark: "#071412",
          "dark-mid": "#0A1715",
          "dark-light": "#101D1A",
          // Light
          cream: "#F8FBF7",
          white: "#FFFFFF",
          ivory: "#FCFDFB",
          // Supporting
          taupe: "#6B7A72",
          sand: "#D4C9B8",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "DM Serif Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "Caveat", "cursive"],
      },
      boxShadow: {
        "card": "0 1px 3px rgba(7, 20, 18, 0.03), 0 2px 8px rgba(7, 20, 18, 0.02)",
        "card-hover": "0 8px 30px rgba(11, 143, 131, 0.08), 0 2px 8px rgba(7, 20, 18, 0.03)",
        "luxury": "0 10px 40px -10px rgba(11, 143, 131, 0.06), 0 20px 30px -8px rgba(7, 20, 18, 0.02)",
        "luxury-hover": "0 20px 50px -12px rgba(11, 143, 131, 0.12), 0 0 30px rgba(217, 164, 65, 0.04)",
        "soft": "0 2px 15px rgba(7, 20, 18, 0.04)",
        "elevated": "0 4px 20px rgba(7, 20, 18, 0.06)",
      },
      borderRadius: {
        "card": "10px",
        "card-lg": "16px",
        "card-xl": "20px",
        "card-2xl": "24px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float": "float 6s ease-in-out infinite",
        "drift": "drift 8s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(3px, -4px)" },
          "66%": { transform: "translate(-2px, 3px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
