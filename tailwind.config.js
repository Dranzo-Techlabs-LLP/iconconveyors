/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef3fb",
          100: "#d6e1f2",
          200: "#aac1e2",
          300: "#7298c9",
          400: "#3f6db0",
          500: "#1f4e94",
          600: "#163d77",
          700: "#102e5b",
          800: "#0b2147",
          900: "#081a38",
          950: "#040e22",
        },
        accent: {
          400: "#ffb547",
          500: "#f59e0b",
          600: "#d97706",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-light":
          "linear-gradient(rgba(8,26,56,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(8,26,56,0.06) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(60% 60% at 50% 0%, rgba(31,78,148,0.18) 0%, rgba(255,255,255,0) 70%)",
        "hero-mesh":
          "radial-gradient(60rem 30rem at 10% -10%, rgba(31,78,148,0.35), transparent 60%), radial-gradient(50rem 30rem at 90% 10%, rgba(245,158,11,0.25), transparent 60%), radial-gradient(40rem 30rem at 50% 100%, rgba(8,26,56,0.5), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(31,78,148,0.15), 0 20px 50px -20px rgba(31,78,148,0.45)",
        soft: "0 10px 40px -15px rgba(8,26,56,0.25)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        beltMove: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "60px 0" },
        },
        shine: {
          "0%": { transform: "translateX(-150%) skewX(-20deg)" },
          "100%": { transform: "translateX(250%) skewX(-20deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        belt: "beltMove 1.2s linear infinite",
        shine: "shine 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
