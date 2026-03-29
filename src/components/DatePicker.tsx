"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import CustomSelect from "./CustomSelect";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  earliestDate?: string;
}

export default function DatePicker({
  value,
  onChange,
  label,
  earliestDate,
}: DatePickerProps) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [tempDate, setTempDate] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parse date value to YYYY-MM-DD format
  const parseDate = (dateStr: string) => {
    if (!dateStr) {
      return { year: "", month: "", day: "" };
    }
    const [year, month, day] = dateStr.split("-");
    return { year, month, day };
  };

  const { year, month, day } = parseDate(tempDate);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleApply = () => {
    if (year && month && day) {
      const newDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      // Validate against earliest date
      if (earliestDate && newDate < earliestDate) {
        return; // Don't allow dates before earliest release
      }
      onChange(newDate);
      setTempDate(newDate);
    }
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setTempDate("");
    setIsOpen(false);
  };

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const days = Array.from({ length: 31 }, (_, i) =>
    (i + 1).toString().padStart(2, "0"),
  );
  const currentYear = new Date().getFullYear();
  const earliestYear = earliestDate
    ? new Date(earliestDate).getFullYear()
    : currentYear - 10;
  const years = Array.from({ length: currentYear - earliestYear + 1 }, (_, i) =>
    (currentYear - i).toString(),
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <label
        className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-fluent-neutral" : "text-gray-600"}`}
      >
        {label}
      </label>

      {/* Display Input */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`input-fluent cursor-pointer flex items-center justify-between transition-all duration-200`}
      >
        <span className={value ? "" : "opacity-50"}>
          {value
            ? new Date(value + "T00:00:00").toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Select date..."}
        </span>
        <svg
          className={`w-5 h-5 ${theme === "dark" ? "text-fluent-neutral-dark" : "text-gray-600"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`absolute z-50 mt-2 p-4 rounded-xl shadow-2xl min-w-[320px]
                      ${
                        theme === "dark"
                          ? "mica-surface-dark"
                          : "mica-surface-light"
                      }`}
        >
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <CustomSelect
                label="Year"
                value={year}
                onChange={(y) => setTempDate(`${y}-${month}-${day}`)}
                placeholder="Year"
                options={years.map((y) => ({
                  value: y,
                  label: y,
                  disabled: earliestDate
                    ? parseInt(y) < new Date(earliestDate).getFullYear()
                    : false,
                }))}
              />
            </div>
            <div className="flex-1">
              <CustomSelect
                label="Month"
                value={month}
                onChange={(m) => setTempDate(`${year}-${m}-${day}`)}
                placeholder="Month"
                options={months}
              />
            </div>
            <div className="flex-1">
              <CustomSelect
                label="Day"
                value={day}
                onChange={(d) => setTempDate(`${year}-${month}-${d}`)}
                placeholder="Day"
                options={days.map((d) => ({ value: d, label: d }))}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleApply}
              disabled={!year || !month || !day}
              className="flex-1 btn-xbox py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
            <button
              onClick={handleClear}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                          ${
                            theme === "dark"
                              ? "bg-dark-accent text-fluent-neutral-dark hover:bg-dark-accent/80"
                              : "bg-light-accent text-gray-700 hover:bg-light-accent/80"
                          }`}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
