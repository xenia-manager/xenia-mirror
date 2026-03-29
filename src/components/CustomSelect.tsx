"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder: string;
  label: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  label,
}: CustomSelectProps) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div className="relative" ref={dropdownRef}>
      <label
        className={`block text-xs mb-1 ${theme === "dark" ? "text-fluent-neutral" : "text-gray-500"}`}
      >
        {label}
      </label>

      {/* Display Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 rounded-lg text-sm text-left flex items-center justify-between
                    transition-all duration-200
                    ${
                      theme === "dark"
                        ? "bg-dark-accent text-fluent-neutral-dark border border-dark-tertiary hover:bg-dark-accent/80"
                        : "bg-light-accent text-gray-900 border border-light-tertiary hover:bg-light-accent/80"
                    }`}
      >
        <span className={!value ? "opacity-50" : ""}>
          {selectedLabel || placeholder}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}
                      ${theme === "dark" ? "text-fluent-neutral" : "text-gray-500"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`absolute z-50 mt-1 min-w-full max-h-60 overflow-y-auto rounded-lg shadow-2xl
                      ${
                        theme === "dark"
                          ? "mica-surface-dark"
                          : "mica-surface-light"
                      }`}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                if (option.disabled) return;
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-left text-sm transition-colors
                          ${
                            option.disabled
                              ? theme === "dark"
                                ? "text-fluent-neutral opacity-50 cursor-not-allowed"
                                : "text-gray-500 opacity-50 cursor-not-allowed"
                              : value === option.value
                                ? theme === "dark"
                                  ? "bg-xbox-green/20 text-xbox-green"
                                  : "bg-xbox-green/20 text-xbox-green"
                                : theme === "dark"
                                  ? "text-fluent-neutral-dark hover:bg-dark-accent/50"
                                  : "text-gray-900 hover:bg-light-accent/50"
                          }`}
              disabled={option.disabled}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
