/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable dark mode with class strategy
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A", // Deep Blue
        secondary: "#10B981", // Healing Green
        accent: "#F59E0B", // Warm Hope
        background: "#F9FAFB", // Soft white
        text: "#111827", // Dark Gray
      },
      boxShadow: {
        soft: "0 10px 30px rgba(17, 24, 39, 0.08)",
        "soft-lg": "0 18px 55px rgba(17, 24, 39, 0.14)",
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.15rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

