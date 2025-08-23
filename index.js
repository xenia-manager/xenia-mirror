let allReleases = []; // Global cache

async function loadReleases() {
    const response = await fetch("data/canary_releases.json");
    allReleases = await response.json();
    applyFilters(); // Render with filters (defaults)
}

function applyFilters() {
    const searchVal = document.getElementById("search-input").value.toLowerCase();
    const fromVal = document.getElementById("from-date").value;
    const toVal = document.getElementById("to-date").value;

    let filtered = allReleases.filter(rel => {
        // Search filter
        const inTitle = rel.changelog.title.toLowerCase().includes(searchVal);
        const inTag = rel.tag_name.toLowerCase().includes(searchVal);
        let matchesSearch = searchVal === "" || inTitle || inTag;

        // Date filter
        const releaseDate = new Date(rel.published_at);
        let matchesDate = true;

        if (fromVal) {
            const fromDate = new Date(fromVal);
            if (releaseDate < fromDate) matchesDate = false;
        }
        if (toVal) {
            const toDate = new Date(toVal);
            if (releaseDate > toDate) matchesDate = false;
        }

        return matchesSearch && matchesDate;
    });

    renderReleases(filtered);
}

function renderReleases(list) {
    const container = document.getElementById("releases-list");
    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p style='color:var(--text-secondary);'>No results found.</p>";
        return;
    }

    list.forEach(rel => {
        const dateFormatted = new Date(rel.published_at).toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric"
        });

        const card = document.createElement("div");
        card.className = "release-card";

        card.innerHTML = `
      <div class="release-title"><a href="${rel.url}">${rel.changelog.title || rel.tag_name}</a></div>
      ${rel.changelog.changes
                ? `<div class="release-changes">${rel.changelog.changes}</div>`
                : ""
            }
      <div class="release-meta">
        <div class="release-tag">
    <a href="https://github.com/xenia-canary/xenia-canary/commit/${rel.tag_name}" 
       target="_blank" rel="noopener"><code>${rel.tag_name}</code>
    </a>
  </div>
        <div class="release-date">Released on ${dateFormatted}</div>
      </div>
      <div class="download-links">
        ${rel.assets.map(asset => {
                let label = "🪟 Windows";
                const lower = asset.name.toLowerCase();
                if (lower.includes("windows")) {
                    label = "🪟 Windows";
                } else if (lower.includes("linux")) {
                    label = "🐧 Linux";
                }
                return `<a href="${asset.url}" target="_blank">${label}</a>`;
            }).join("")}
      </div>
    `;

        container.appendChild(card);
    });
}

// Setup event listeners
document.addEventListener("DOMContentLoaded", () => {
    loadReleases();

    document.getElementById("search-input").addEventListener("input", applyFilters);
    document.getElementById("from-date").addEventListener("change", applyFilters);
    document.getElementById("to-date").addEventListener("change", applyFilters);

    document.getElementById("clear-filters").addEventListener("click", () => {
        document.getElementById("search-input").value = "";
        document.getElementById("from-date").value = "";
        document.getElementById("to-date").value = "";
        applyFilters();
    });

    // ---------------- THEME TOGGLER ----------------
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        const iconSpan = themeToggle.querySelector(".toggle-icon");

        if (localStorage.getItem("theme") === "light") {
            document.body.classList.add("light-mode");
            iconSpan.textContent = "☀️";
        }

        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            const isLight = document.body.classList.contains("light-mode");
            iconSpan.textContent = isLight ? "☀️" : "🌙";
            localStorage.setItem("theme", isLight ? "light" : "dark");
        });
    }
});