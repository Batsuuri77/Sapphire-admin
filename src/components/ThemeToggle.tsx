"use client";

import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = storedTheme ?? (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative py-2 px-4 rounded-full bg-amber-300 dark:bg-blue-900 border border-gray-300 flex items-center transition-colors"
    >
      {/* Sliding icon container */}
      <span
        className={`absolute left-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow transition-transform duration-300 ${
          theme === "dark" ? "translate-x-11" : "translate-x-0"
        }`}
      >
        {theme === "light" ? (
          <SunIcon className="w-5 h-5 text-gray-500" />
        ) : (
          <MoonIcon className="w-5 h-5 text-gray-500" />
        )}
      </span>

      {/* Hidden icons for alignment/positioning */}
      <div className="w-full flex justify-between items-center px-1 opacity-0 pointer-events-none">
        <SunIcon className="w-5 h-5" />
        <MoonIcon className="w-5 h-5" />
      </div>
    </button>
  );
};

export default ThemeToggle;
