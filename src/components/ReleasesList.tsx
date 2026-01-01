"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { Release } from "@/lib/types";
import { useTheme } from "./ThemeProvider";
import ReleaseCard from "./ReleaseCard";
import FilterBar from "./FilterBar";

const BATCH_SIZE = 20;

export default function ReleasesList() {
  const { theme } = useTheme();
  const [allReleases, setAllReleases] = useState<Release[]>([]);
  const [displayedReleases, setDisplayedReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Filter states
  const [searchValue, setSearchValue] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Refs for infinite scrolling
  const observer = useRef<IntersectionObserver | null>(null);
  const lastReleaseRef = useRef<HTMLDivElement>(null);

  // Fetch all releases initially
  useEffect(() => {
    async function fetchReleases() {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/xenia-manager/xenia-mirror/refs/heads/main/data/canary_releases.json"
        );
        if (!response.ok) throw new Error("Failed to fetch releases");
        const data = await response.json();
        setAllReleases(data);
        // Initially display the first batch
        setDisplayedReleases(data.slice(0, BATCH_SIZE));
        setHasMore(data.length > BATCH_SIZE);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchReleases();
  }, []);

  // Filter releases based on search and date filters
  const filteredReleases = useMemo(() => {
    return allReleases.filter((rel) => {
      // Search filter
      const searchLower = searchValue.toLowerCase();
      const inTitle = rel.changelog.title.toLowerCase().includes(searchLower);
      const inTag = rel.tag_name.toLowerCase().includes(searchLower);
      const matchesSearch = searchValue === "" || inTitle || inTag;

      // Date filter
      let matchesDate = true;

      // Safely parse the release date
      let releaseDate: Date | null = null;
      try {
        releaseDate = new Date(rel.published_at);
        // Check if the date is valid
        if (isNaN(releaseDate.getTime())) {
          console.warn(`Invalid date for release: ${rel.tag_name}, date: ${rel.published_at}`);
          return false; // Exclude releases with invalid dates
        }
      } catch (error) {
        console.warn(`Error parsing date for release: ${rel.tag_name}, date: ${rel.published_at}`, error);
        return false; // Exclude releases with invalid dates
      }

      if (fromDate) {
        try {
          // Create a date object for the start of the fromDate (00:00:00)
          const from = new Date(fromDate);
          if (isNaN(from.getTime())) throw new Error("Invalid from date");
          from.setHours(0, 0, 0, 0);
          if (releaseDate < from) matchesDate = false;
        } catch (error) {
          console.warn(`Error parsing from date: ${fromDate}`, error);
          matchesDate = false; // If the from date is invalid, exclude all
        }
      }
      if (toDate) {
        try {
          // Create a date object for the end of the toDate (23:59:59)
          const to = new Date(toDate);
          if (isNaN(to.getTime())) throw new Error("Invalid to date");
          to.setHours(23, 59, 59, 999);
          if (releaseDate > to) matchesDate = false;
        } catch (error) {
          console.warn(`Error parsing to date: ${toDate}`, error);
          matchesDate = false; // If the to date is invalid, exclude all
        }
      }

      return matchesSearch && matchesDate;
    });
  }, [allReleases, searchValue, fromDate, toDate]);

  // Apply filters and pagination to displayed releases
  useEffect(() => {
    // Reset to first batch when filters change
    setDisplayedReleases(filteredReleases.slice(0, BATCH_SIZE));
    setHasMore(filteredReleases.length > BATCH_SIZE);
  }, [filteredReleases]);

  // Load more releases
  const loadMoreReleases = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    setTimeout(() => {
      const currentLength = displayedReleases.length;
      const nextReleases = filteredReleases.slice(currentLength, currentLength + BATCH_SIZE);
      setDisplayedReleases(prev => [...prev, ...nextReleases]);
      setHasMore(currentLength + nextReleases.length < filteredReleases.length);
      setLoadingMore(false);
    }, 300); // Simulate network delay
  }, [displayedReleases.length, filteredReleases, hasMore, loadingMore]);

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    if (loading || loadingMore) return;

    // Clean up previous observer
    if (observer.current) {
      observer.current.disconnect();
    }

    // Set up new observer
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loadingMore) {
        loadMoreReleases();
      }
    });

    // Observe the last release element
    if (lastReleaseRef.current) {
      observer.current.observe(lastReleaseRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, loadingMore, loadMoreReleases]);

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
                        ? "card-bg-dark"
                        : "card-bg-light"
                    }`}
      >
        <div className={`${theme === "dark" ? "text-fluent-neutral" : "text-gray-600"} text-lg`}>Loading releases...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`text-center rounded-2xl p-8 shadow-lg
                    ${
                      theme === "dark"
                        ? "card-bg-dark"
                        : "card-bg-light"
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
                        ? "card-bg-dark"
                        : "card-bg-light"
                    }`}
      >
        <h2
          className={`text-xl font-semibold mb-6 ${
            theme === "dark" ? "text-fluent-neutral-dark" : "text-gray-900"
          }`}
        >
          Latest Builds
        </h2>

        <div className="flex flex-col gap-4">
          {filteredReleases.length === 0 ? (
            <p className={`${theme === "dark" ? "text-fluent-neutral" : "text-gray-500"} text-center py-8`}>No results found.</p>
          ) : (
            <>
              {displayedReleases.map((release, index) => {
                // Add ref to the last element for infinite scrolling
                if (index === displayedReleases.length - 1) {
                  return (
                    <div key={release.tag_name} ref={lastReleaseRef}>
                      <ReleaseCard release={release} />
                    </div>
                  );
                }
                return <ReleaseCard key={release.tag_name} release={release} />;
              })}

              {loadingMore && (
                <div className="text-center py-4">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-xbox-green"></div>
                </div>
              )}

              {!hasMore && displayedReleases.length > 0 && (
                <p className={`${theme === "dark" ? "text-fluent-neutral" : "text-gray-500"} text-center py-4`}>No more releases!</p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
