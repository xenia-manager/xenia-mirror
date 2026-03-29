"use client";

import { useState, useRef, useEffect } from "react";

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
      <label className="block text-xs mb-1 text-fluent-secondary">
        {label}
      </label>

      {/* Display Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 rounded-lg text-sm text-left flex items-center justify-between
                    transition-all duration-200
                    bg-[var(--bg-accent)] text-fluent-primary border border-[var(--border-color)] hover:bg-[var(--bg-accent)]/80"
      >
        <span className={!value ? "opacity-50" : ""}>
          {selectedLabel || placeholder}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} text-fluent-secondary`}
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
        <div className="absolute z-50 mt-1 min-w-full max-h-60 overflow-y-auto rounded-lg shadow-2xl mica-surface backdrop-blur-xl">
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
                              ? "text-fluent-secondary opacity-50 cursor-not-allowed"
                              : value === option.value
                                ? "bg-xbox-green/20 text-xbox-green"
                                : "text-fluent-primary hover:bg-[var(--hover-bg)]"
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
