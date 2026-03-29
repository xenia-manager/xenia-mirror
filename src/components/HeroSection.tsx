"use client";

export default function HeroSection() {
  return (
    <section className="text-center mb-8 rounded-2xl p-8 shadow-lg bg-[var(--bg-secondary)]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
          📦 Xenia Canary Releases Mirror
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-4 text-fluent-secondary">
          Browse the most recent Canary builds with direct links for Linux and
          Windows.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-accent)] text-fluent-secondary">
          <span className="text-sm">
            NOTE: Nothing is hosted here. Every download link is from official Xenia sources
          </span>
        </div>
      </div>
    </section>
  );
}
