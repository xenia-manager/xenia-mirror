"use client";

import { useTheme } from "./ThemeProvider";

interface FilterBarProps {
  searchValue: string;
  fromDate: string;
  toDate: string;
  sortOption: 'newest' | 'oldest';
  onSearchChange: (value: string) => void;
  onFromDateChange: (value: string) => void;
  onToDateChange: (value: string) => void;
  onSortChange: (value: 'newest' | 'oldest') => void;
  onClear: () => void;
}

export default function FilterBar({
  searchValue,
  fromDate,
  toDate,
  sortOption,
  onSearchChange,
  onFromDateChange,
  onToDateChange,
  onSortChange,
  onClear,
}: FilterBarProps) {
  const { theme } = useTheme();

  return (
    <section
      className={`mb-8 rounded-2xl p-6 shadow-lg
                  ${
                    theme === "dark"
                      ? "bg-dark-secondary"
                      : "bg-light-secondary"
                  }`}
    >
      <h2
        className={`text-xl font-semibold mb-4 ${
          theme === "dark" ? "text-fluent-neutral-dark" : "text-gray-900"
        }`}
      >
        🔎 Search & Filter
      </h2>

      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-fluent-neutral" : "text-gray-600"}`}>
            Search
          </label>
          <input
            type="text"
            placeholder="Search by tag or title..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`input-fluent transition-all duration-200`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-fluent-neutral" : "text-gray-600"}`}>
            From Date
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => onFromDateChange(e.target.value)}
            className={`input-fluent transition-all duration-200`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-fluent-neutral" : "text-gray-600"}`}>
            To Date
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => onToDateChange(e.target.value)}
            className={`input-fluent transition-all duration-200`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-fluent-neutral" : "text-gray-600"}`}>
            Sort By
          </label>
          <button
            onClick={() => onSortChange(sortOption === 'newest' ? 'oldest' : 'newest')}
            className={`input-fluent transition-all duration-200 flex items-center justify-center gap-2`}
            aria-label={`Sort by ${sortOption === 'newest' ? 'oldest' : 'newest'}`}
          >
            {sortOption === 'newest' ? '↓' : '↑'}
          </button>
        </div>

        <div>
          <button
            onClick={onClear}
            className="btn-xbox transition-all duration-200 min-w-[100px]"
          >
            Clear
          </button>
        </div>
      </div>
    </section>
  );
}
