"use client";

export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 mica-surface backdrop-blur-xl border-t border-[var(--border-color)] border-b-0 border-l-0 border-r-0">
      <div className="max-w-5xl mx-auto space-y-2 text-center">
        <p className="text-fluent-secondary text-sm">
          Powered by Xenia Manager • Not affiliated with Xenia Team
        </p>
        <div className="flex items-center justify-center gap-8 text-sm">
          <div className="flex flex-col items-center gap-1">
            <a
              href="https://github.com/xenia-manager/xenia-mirror"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xbox-green hover:text-xbox-hover transition-colors link-style"
              title="Xenia Mirror Source Code"
            >
              Source Code
            </a>
          </div>
          <div className="flex flex-col items-center gap-1">
            <a
              href="https://github.com/xenia-canary/xenia-canary/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xbox-green hover:text-xbox-hover transition-colors link-style"
            >
              Xenia Canary Main Repository
            </a>
            <a
              href="https://github.com/xenia-canary/xenia-canary-releases/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xbox-green hover:text-xbox-hover transition-colors link-style"
            >
              Xenia Canary Releases Repository
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
