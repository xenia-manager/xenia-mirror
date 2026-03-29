"use client";

import DatePicker from "./DatePicker";

interface FilterBarProps {
  searchValue: string;
  fromDate: string;
  toDate: string;
  sortOption: "newest" | "oldest";
  earliestDate: string;
  onSearchChange: (value: string) => void;
  onFromDateChange: (value: string) => void;
  onToDateChange: (value: string) => void;
  onSortChange: (value: "newest" | "oldest") => void;
  onClear: () => void;
}

export default function FilterBar({
  searchValue,
  fromDate,
  toDate,
  sortOption,
  earliestDate,
  onSearchChange,
  onFromDateChange,
  onToDateChange,
  onSortChange,
  onClear,
}: FilterBarProps) {
  return (
    <section className="mb-8 rounded-2xl p-6 shadow-lg bg-[var(--bg-secondary)]">
      <h2 className="text-xl font-semibold mb-4 text-fluent-primary">
        Search & Filter
      </h2>

      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-2 text-fluent-secondary">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by tag or title..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-fluent transition-all duration-200"
          />
        </div>

        <DatePicker
          label="From Date"
          value={fromDate}
          onChange={onFromDateChange}
          earliestDate={earliestDate}
        />

        <DatePicker
          label="To Date"
          value={toDate}
          onChange={onToDateChange}
          earliestDate={earliestDate}
        />

        <div>
          <label className="block text-sm font-medium mb-2 text-fluent-secondary">
            Sort By
          </label>
          <button
            onClick={() =>
              onSortChange(sortOption === "newest" ? "oldest" : "newest")
            }
            className="input-fluent transition-all duration-200 flex items-center justify-center gap-2"
            aria-label={`Sort by ${sortOption === "newest" ? "oldest" : "newest"}`}
          >
            {sortOption === "newest" ? "↓" : "↑"}
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
