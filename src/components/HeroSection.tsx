"use client";

import { useTheme } from "./ThemeProvider";

export default function HeroSection() {
  const { theme } = useTheme();

  return (
    <section
      className={`text-center mb-8 rounded-2xl p-6 shadow-lg
                  ${
                    theme === "dark"
                      ? "glass-bg-dark glass-border-dark"
                      : "glass-bg-light glass-border-light"
                  }`}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-3 gradient-text">
        📦 Xenia Canary Releases Mirror
      </h2>
      <p
        className={`text-lg max-w-2xl mx-auto mb-2 ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Browse the most recent Canary builds with direct links for Linux and
        Windows.
      </p>
      <p className="text-gray-500 text-sm italic mt-3">
        NOTE: Nothing is hosted here. Every download link is from official Xenia
        sources
      </p>
    </section>
  );
}
