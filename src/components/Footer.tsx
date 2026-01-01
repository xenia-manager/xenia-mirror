"use client";

import { useTheme } from "./ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={`rounded-t-2xl mt-8 p-6 text-center
                  ${
                    theme === "dark"
                      ? "bg-dark-secondary"
                      : "bg-light-secondary"
                  }`}
    >
      <div className="max-w-5xl mx-auto">
        <p className={`${theme === "dark" ? "text-fluent-neutral" : "text-gray-600"}`}>
          Powered by Xenia Manager • Not affiliated with Xenia Team
        </p>
      </div>
    </footer>
  );
}
