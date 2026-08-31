/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        surface: {
          DEFAULT: "#0F0F14",
          card: "#121218",
          elevated: "#181822",
          border: "rgba(255, 255, 255, 0.08)",
          "border-subtle": "rgba(255, 255, 255, 0.04)",
        },
        brand: {
          pink: "#EE399E",
          red: "#FE2641",
          purple: "#7C3AED",
          gold: "#F59E0B",
          emerald: "#10B981",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #EE399E 0%, #FE2641 100%)",
        "brand-gradient-hover": "linear-gradient(135deg, #F458B0 0%, #FF4056 100%)",
        "brand-gradient-radial": "radial-gradient(circle at center, rgba(238, 57, 158, 0.15) 0%, rgba(254, 38, 65, 0.05) 50%, transparent 80%)",
        "card-glass": "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      boxShadow: {
        "glow-brand": "0 0 35px -5px rgba(238, 57, 158, 0.45), 0 0 20px -5px rgba(254, 38, 65, 0.35)",
        "glow-brand-lg": "0 0 60px -10px rgba(238, 57, 158, 0.5), 0 0 35px -10px rgba(254, 38, 65, 0.4)",
        "glow-sm": "0 0 15px rgba(238, 57, 158, 0.3)",
        "card-elevation": "0 20px 40px -15px rgba(0, 0, 0, 0.8)",
      },
      animation: {
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.08)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(1deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

