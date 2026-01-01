"use client";

import { useEffect, useState, useMemo } from "react";
import { Release } from "@/lib/types";
import { useTheme } from "./ThemeProvider";
import ReleaseCard from "./ReleaseCard";
import FilterBar from "./FilterBar";

export default function ReleasesList() {
  const { theme } = useTheme();
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchValue, setSearchValue] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    async function fetchReleases() {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/xenia-manager/xenia-mirror/refs/heads/main/data/canary_releases.json"
        );
        if (!response.ok) throw new Error("Failed to fetch releases");
        const data = await response.json();
        setReleases(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchReleases();
  }, []);

  const filteredReleases = useMemo(() => {
    return releases.filter((rel) => {
      // Search filter
      const searchLower = searchValue.toLowerCase();
      const inTitle = rel.changelog.title.toLowerCase().includes(searchLower);
      const inTag = rel.tag_name.toLowerCase().includes(searchLower);
      const matchesSearch = searchValue === "" || inTitle || inTag;

      // Date filter
      const releaseDate = new Date(rel.published_at);
      let matchesDate = true;

      if (fromDate) {
        const from = new Date(fromDate);
        if (releaseDate < from) matchesDate = false;
      }
      if (toDate) {
        const to = new Date(toDate);
        if (releaseDate > to) matchesDate = false;
      }

      return matchesSearch && matchesDate;
    });
  }, [releases, searchValue, fromDate, toDate]);

  const handleClear = () => {
    setSearchValue("");
    setFromDate("");
    setToDate("");
  };

  if (loading) {
    return (
      <div
        className={`text-center rounded-2xl p-8 shadow-lg
                    ${
                      theme === "dark"
                        ? "glass-bg-dark glass-border-dark"
                        : "glass-bg-light glass-border-light"
                    }`}
      >
        <div className="text-gray-400 text-lg">Loading releases...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`text-center rounded-2xl p-8 shadow-lg
                    ${
                      theme === "dark"
                        ? "glass-bg-dark glass-border-dark"
                        : "glass-bg-light glass-border-light"
                    }`}
      >
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      <FilterBar
        searchValue={searchValue}
        fromDate={fromDate}
        toDate={toDate}
        onSearchChange={setSearchValue}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
        onClear={handleClear}
      />

      <section
        className={`rounded-2xl p-6 shadow-lg
                    ${
                      theme === "dark"
                        ? "glass-bg-dark glass-border-dark"
                        : "glass-bg-light glass-border-light"
                    }`}
      >
        <h2
          className={`text-xl font-semibold mb-6 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Latest Builds
        </h2>

        <div className="flex flex-col gap-4">
          {filteredReleases.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No results found.</p>
          ) : (
            filteredReleases.map((release) => (
              <ReleaseCard key={release.tag_name} release={release} />
            ))
          )}
        </div>
      </section>
    </>
  );
}
