"use client";

import { useTheme } from "./ThemeProvider";

interface FilterBarProps {
  searchValue: string;
  fromDate: string;
  toDate: string;
  onSearchChange: (value: string) => void;
  onFromDateChange: (value: string) => void;
  onToDateChange: (value: string) => void;
  onClear: () => void;
}

export default function FilterBar({
  searchValue,
  fromDate,
  toDate,
  onSearchChange,
  onFromDateChange,
  onToDateChange,
  onClear,
}: FilterBarProps) {
  const { theme } = useTheme();

  const inputClasses = `px-3 py-2 rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-xbox-green
    ${
      theme === "dark"
        ? "bg-dark-secondary border border-white/10 text-white placeholder-gray-500"
        : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400"
    }`;

  return (
    <section
      className={`mb-8 rounded-2xl p-6 shadow-lg
                  ${
                    theme === "dark"
                      ? "glass-bg-dark glass-border-dark"
                      : "glass-bg-light glass-border-light"
                  }`}
    >
      <h2
        className={`text-xl font-semibold mb-4 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        🔎 Search & Filter
      </h2>

      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by tag or title..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`${inputClasses} flex-1 min-w-[200px]`}
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e) => onFromDateChange(e.target.value)}
          className={inputClasses}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => onToDateChange(e.target.value)}
          className={inputClasses}
        />

        <button
          onClick={onClear}
          className="bg-xbox-button text-white font-semibold rounded-lg px-4 py-2 
                     transition-all duration-200 hover:bg-xbox-hover hover:-translate-y-0.5"
        >
          Clear
        </button>
      </div>
    </section>
  );
}
