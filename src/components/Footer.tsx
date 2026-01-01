"use client";

import { useTheme } from "./ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={`rounded-t-2xl mt-8 p-4 text-center
                  ${
                    theme === "dark"
                      ? "glass-bg-dark glass-border-dark"
                      : "glass-bg-light glass-border-light"
                  }`}
    >
      <p className="text-gray-500">
        Powered by Xenia Manager • Not affiliated with Xenia Team
      </p>
    </footer>
  );
}
