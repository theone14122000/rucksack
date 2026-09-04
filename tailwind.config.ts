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
          deep: "#3A2618",
          espresso: "#241811",
          warm: "#604533",
          sand: "#B69B7C",
          beige: "#D8C5A9",
          cream: "#F4EFE6",
          offwhite: "#FAF8F3",
          charcoal: "#24211E",
          taupe: "#8D7A67",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px -10px rgba(36, 24, 17, 0.08), 0 20px 25px -5px rgba(36, 24, 17, 0.04)",
        "luxury-hover": "0 20px 40px -15px rgba(36, 24, 17, 0.16), 0 0 15px rgba(182, 155, 124, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
