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

  return (
    <section
      className={`mb-8 rounded-2xl p-6 shadow-lg
                  ${
                    theme === "dark"
                      ? "card-bg-dark"
                      : "card-bg-light"
                  }`}
    >
      <h2
        className={`text-xl font-semibold mb-4 ${
          theme === "dark" ? "text-fluent-neutral-dark" : "text-gray-900"
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
          className={`input-fluent rounded-lg transition-all duration-200
                     flex-1 min-w-[200px]`}
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e) => onFromDateChange(e.target.value)}
          className={`input-fluent rounded-lg transition-all duration-200`}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => onToDateChange(e.target.value)}
          className={`input-fluent rounded-lg transition-all duration-200`}
        />

        <button
          onClick={onClear}
          className="btn-xbox rounded-lg transition-all duration-200"
        >
          Clear
        </button>
      </div>
    </section>
  );
}
