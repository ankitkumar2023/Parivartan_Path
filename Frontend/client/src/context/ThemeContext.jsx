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
      console.log(
        "[ThemeContext] Initializing theme from localStorage:",
        stored,
      );
      if (stored !== null) {
        return stored === "dark";
      }
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      console.log(
        "[ThemeContext] Using system preference (dark):",
        prefersDark,
      );
      return prefersDark;
    } catch {
      console.error("[ThemeContext] Error reading theme from localStorage");
      return true;
    }
  });

  // Apply theme to DOM and persist to localStorage
  // Note: We only manage the "dark" class here. Tailwind and CSS handle all styling.
  // Do NOT use inline styles as they override Tailwind's dark: classes.
  useEffect(() => {
    const htmlElement = document.documentElement;

    console.log("[ThemeContext] Applying theme - isDark:", isDark);
    console.log(
      "[ThemeContext] HTML element classList before:",
      htmlElement.className,
    );

    if (isDark) {
      htmlElement.classList.add("dark");
      console.log("[ThemeContext] Added 'dark' class to html element");
    } else {
      htmlElement.classList.remove("dark");
      console.log("[ThemeContext] Removed 'dark' class from html element");
    }

    console.log(
      "[ThemeContext] HTML element classList after:",
      htmlElement.className,
    );

    // Persist theme preference to localStorage
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
      console.log(
        "[ThemeContext] Saved theme to localStorage:",
        isDark ? "dark" : "light",
      );
    } catch (e) {
      console.error("[ThemeContext] Failed to save theme to localStorage:", e);
    }
  }, [isDark]);

  // Toggle theme and trigger update
  const toggleTheme = () => {
    console.log("[ThemeContext] Toggle clicked - current isDark:", isDark);
    setIsDark((prev) => {
      console.log("[ThemeContext] Toggle setting isDark to:", !prev);
      return !prev;
    });
  };

  console.log("[ThemeContext] Rendering with isDark:", isDark);

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
