import React, { createContext, useContext, useState, useEffect } from "react";

// Create the theme context
const ThemeContext = createContext();

/**
 * ThemeProvider component - wraps the app and manages dark/light theme globally
 * Persists user preference to localStorage
 * Applies dark class to document root element for Tailwind dark mode
 */
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Initialize from localStorage or system preference
    if (typeof window === "undefined") return true;
    try {
      const stored = localStorage.getItem("theme");
      if (stored !== null) {
        return stored === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return true;
    }
  });

  // Apply theme to DOM and persist to localStorage
  // Note: We only manage the "dark" class here. Tailwind and CSS handle all styling.
  // Do NOT use inline styles as they override Tailwind's dark: classes.
  useEffect(() => {
    const htmlElement = document.documentElement;

    if (isDark) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }

    // Persist theme preference to localStorage
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (e) {
      console.error("Failed to save theme to localStorage:", e);
    }
  }, [isDark]);

  // Toggle theme and trigger update
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme hook - use this in any component to access theme state and toggle function
 * Usage: const { isDark, toggleTheme } = useTheme();
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
