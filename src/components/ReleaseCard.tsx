"use client";

import { Release } from "@/lib/types";
import { useTheme } from "./ThemeProvider";

interface ReleaseCardProps {
  release: Release;
}

export default function ReleaseCard({ release }: ReleaseCardProps) {
  const { theme } = useTheme();

  const dateFormatted = new Date(release.published_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const getAssetLabel = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("linux")) return "🐧 Linux";
    return "🪟 Windows";
  };

  return (
    <div
      className={`rounded-xl p-5 shadow-lg
                  transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                  ${
                    theme === "dark"
                      ? "card-bg-dark"
                      : "card-bg-light"
                  }`}
    >
      {/* Title */}
      <div className="text-lg font-semibold mb-2">
        <a
          href={release.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:text-xbox-hover hover:underline transition-colors
                     ${theme === "dark" ? "text-fluent-neutral-dark" : "text-gray-900"}`}
        >
          {release.changelog.title || release.tag_name}
        </a>
      </div>

      {/* Changes */}
      {release.changelog.changes && (
        <div className={`text-sm mb-4 whitespace-pre-wrap ${
          theme === "dark" ? "text-fluent-neutral" : "text-gray-600"
        }`}>
          {release.changelog.changes}
        </div>
      )}

      {/* Meta */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div className="text-xbox-green font-medium">
          <a
            href={`https://github.com/xenia-canary/xenia-canary/commit/${release.tag_name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-xbox-hover hover:underline transition-colors"
          >
            <code
              className={`px-2 py-1 rounded-md text-sm font-mono
                         ${
                           theme === "dark"
                             ? "bg-dark-accent text-fluent-neutral-dark"
                             : "bg-light-accent text-gray-900"
                         }`}
            >
              {release.tag_name}
            </code>
          </a>
        </div>
        <div className={`${theme === "dark" ? "text-fluent-neutral" : "text-gray-500"} text-sm`}>Released on {dateFormatted}</div>
      </div>

      {/* Download Links */}
      <div className="flex flex-wrap gap-3">
        {release.assets.map((asset, index) => (
          <a
            key={index}
            href={asset.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-3 px-4 btn-xbox rounded-lg
                       transition-all duration-200 min-w-[120px]"
          >
            {getAssetLabel(asset.name)}
          </a>
        ))}
      </div>
    </div>
  );
}
