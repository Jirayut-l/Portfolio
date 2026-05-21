"use client";

import React from "react";
import { IconSun, IconMoon } from "./Icons";
import { useTheme } from "@/components/providers/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full bg-secondary hover:bg-primary/20 transition-all text-foreground cursor-pointer flex items-center justify-center min-w-[40px] min-h-[40px] focus-visible:ring-2 focus-visible:ring-primary outline-none ${className}`}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      type="button"
    >
      {theme === "light" ? (
        <IconMoon className="w-5 h-5" aria-hidden="true" />
      ) : (
        <IconSun className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;