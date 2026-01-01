"use client";

import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`flex justify-between items-center px-4 md:px-8 py-5
                  sticky top-0 z-50 shadow-lg
                  ${
                    theme === "dark"
                      ? "bg-dark-secondary"
                      : "bg-light-secondary"
                  }`}
    >
      <div className="flex items-center gap-4">
        <img
          src="https://avatars.githubusercontent.com/u/173571265?s=200&v=4"
          alt="Xenia Logo"
          width={56}
          height={56}
          className="rounded-xl shadow-lg"
        />
        <h1 className="text-xl md:text-2xl font-bold gradient-text">
          Xenia Canary Mirror
        </h1>
      </div>

      <button
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className={`p-3 rounded-xl cursor-pointer text-xl
                   transition-all duration-300
                   focus-indicator
                   ${
                     theme === "dark"
                       ? "bg-dark-accent"
                       : "bg-light-accent"
                   }`}
      >
        <span className="block w-6 h-6 flex items-center justify-center">
          {theme === "dark" ? "🌙" : "☀️"}
        </span>
      </button>
    </header>
  );
}
