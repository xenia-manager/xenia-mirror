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
  const [sortOption, setSortOption] = useState<'newest' | 'oldest'>('newest');

  // Refs for infinite scrolling
  const observer = useRef<IntersectionObserver | null>(null);
  const lastReleaseRef = useRef<HTMLDivElement>(null);

  // Fetch all releases initially
  useEffect(() => {
    async function fetchReleases() {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/xenia-manager/database/refs/heads/main/data/xenia-releases/canary.json"
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

  // Sort filtered releases based on sortOption
  const sortedReleases = useMemo(() => {
    return [...filteredReleases].sort((a, b) => {
      const dateA = new Date(a.published_at).getTime();
      const dateB = new Date(b.published_at).getTime();

      if (sortOption === 'newest') {
        return dateB - dateA; // Newest first
      } else {
        return dateA - dateB; // Oldest first
      }
    });
  }, [filteredReleases, sortOption]);

  // Load more releases
  const loadMoreReleases = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    setTimeout(() => {
      const currentLength = displayedReleases.length;
      const nextReleases = sortedReleases.slice(currentLength, currentLength + BATCH_SIZE);
      setDisplayedReleases(prev => [...prev, ...nextReleases]);
      setHasMore(currentLength + nextReleases.length < sortedReleases.length);
      setLoadingMore(false);
    }, 300); // Simulate network delay
  }, [displayedReleases.length, sortedReleases, hasMore, loadingMore]);

  // Apply filters and pagination to displayed releases
  useEffect(() => {
    // Reset to first batch when filters or sort option change
    setDisplayedReleases(sortedReleases.slice(0, BATCH_SIZE));
    setHasMore(sortedReleases.length > BATCH_SIZE);
  }, [sortedReleases]);

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

    // Use a small delay to ensure DOM has updated before observing
    const timer = setTimeout(() => {
      // Observe the last release element
      if (lastReleaseRef.current && observer.current) {
        observer.current.observe(lastReleaseRef.current);
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, loadingMore, loadMoreReleases, displayedReleases.length, sortOption]);

  const handleClear = () => {
    setSearchValue("");
    setFromDate("");
    setToDate("");
  };

  if (loading) {
    return (
      <div
        className={`text-center rounded-2xl p-12 shadow-lg
                    ${
                      theme === "dark"
                        ? "bg-dark-secondary"
                        : "bg-light-secondary"
                    }`}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="spinner mb-4"></div>
          <div className={`${theme === "dark" ? "text-fluent-neutral" : "text-gray-600"} text-lg`}>Loading releases...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`rounded-2xl p-8 shadow-lg
                    ${
                      theme === "dark"
                        ? "bg-dark-secondary"
                        : "bg-light-secondary"
                    }`}
      >
        <div className="notification notification-error">
          <span className="text-xl">⚠️</span>
          <div>
            <h3 className="font-semibold">Error loading releases</h3>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <FilterBar
        searchValue={searchValue}
        fromDate={fromDate}
        toDate={toDate}
        sortOption={sortOption}
        onSearchChange={setSearchValue}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
        onSortChange={setSortOption}
        onClear={handleClear}
      />

      <section
        className={`rounded-2xl p-6 shadow-lg
                    ${
                      theme === "dark"
                        ? "bg-dark-secondary"
                        : "bg-light-secondary"
                    }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-xl font-semibold ${
              theme === "dark" ? "text-fluent-neutral-dark" : "text-gray-900"
            }`}
          >
            Releases
          </h2>
          <div className={`text-sm ${theme === "dark" ? "text-fluent-neutral" : "text-gray-500"}`}>
            {sortedReleases.length} {sortedReleases.length === 1 ? 'release' : 'releases'} found
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {sortedReleases.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🔍</div>
              <p className={`${theme === "dark" ? "text-fluent-neutral" : "text-gray-500"} text-lg mb-2`}>No results found</p>
              <p className={`${theme === "dark" ? "text-fluent-neutral" : "text-gray-500"}`}>Try adjusting your search or filter criteria</p>
            </div>
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
                <div className="flex justify-center py-6">
                  <div className="spinner"></div>
                </div>
              )}

              {!hasMore && displayedReleases.length > 0 && (
                <div className="text-center py-6">
                  <div className="inline-flex items-center gap-2 text-lg font-medium">
                    <span className={`${theme === "dark" ? "text-fluent-neutral" : "text-gray-500"}`}>You've reached the end!</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
