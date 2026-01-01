"use client";

import Image from "next/image";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`flex justify-between items-center px-4 md:px-8 py-4 
                  sticky top-0 z-50 shadow-lg
                  ${
                    theme === "dark"
                      ? "glass-bg-dark glass-border-dark"
                      : "glass-bg-light glass-border-light"
                  }`}
    >
      <div className="flex items-center gap-4">
        <Image
          src="https://avatars.githubusercontent.com/u/173571265?s=200&v=4"
          alt="Xenia Logo"
          width={48}
          height={48}
          className="rounded-xl shadow-lg"
        />
        <h1 className="text-xl md:text-2xl font-semibold gradient-text">
          Xenia Canary Mirror
        </h1>
      </div>

      <button
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className={`p-3 rounded-xl cursor-pointer text-xl
                   transition-all duration-300 hover:-translate-y-0.5 
                   hover:shadow-lg
                   ${
                     theme === "dark"
                       ? "glass-bg-dark glass-border-dark"
                       : "glass-bg-light glass-border-light"
                   }`}
      >
        <span>{theme === "dark" ? "🌙" : "☀️"}</span>
      </button>
    </header>
  );
}
