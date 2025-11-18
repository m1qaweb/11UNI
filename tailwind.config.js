/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8b0000",
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#8b0000",
        },
        secondary: {
          DEFAULT: "#ffd700",
          50: "#fffef7",
          100: "#fffaeb",
          200: "#fff4c6",
          300: "#ffed9e",
          400: "#ffe066",
          500: "#ffd700",
          600: "#e6c200",
          700: "#ccad00",
          800: "#b39900",
          900: "#998500",
        },
        text: {
          DEFAULT: "#2c2c2c",
          light: "#666666",
          lighter: "#999999",
        },
        bg: {
          DEFAULT: "#ffffff",
          light: "#f9fafb",
          dark: "#1f2937",
        },
      },
      fontFamily: {
        georgian: [
          '"Noto Sans Georgian"',
          '"BPG Nino"',
          "Sylfaen",
          "sans-serif",
        ],
        sans: [
          '"Noto Sans Georgian"',
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      spacing: {
        unit: "8px",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.6" }],
        sm: ["0.875rem", { lineHeight: "1.6" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.6" }],
        xl: ["1.25rem", { lineHeight: "1.6" }],
        "2xl": ["1.5rem", { lineHeight: "1.6" }],
        "3xl": ["1.875rem", { lineHeight: "1.6" }],
        "4xl": ["2.25rem", { lineHeight: "1.6" }],
        "5xl": ["3rem", { lineHeight: "1.6" }],
        "6xl": ["3.75rem", { lineHeight: "1.6" }],
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
        "2xl": "2560px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
