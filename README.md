# Xenia Canary Mirror

A modern, responsive web application for browsing Xenia Canary builds with direct download links. Built with Next.js 16 and featuring a beautiful mica-inspired design.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-38B2AC?logo=tailwind-css)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)

## Features

- **Release Browser** - Browse all Xenia Canary builds with direct download links
- **Advanced Filtering** - Filter by search, date range, and sort by newest/oldest
- **Infinite Scroll** - Load more releases as you scroll

## Getting Started

### Prerequisites

- [Node.js 18+](https://nodejs.org) or [Bun](https://bun.sh/)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Xenia Mirror
```

2. Install dependencies:

```bash
npm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Data Sources

The application fetches release data from:

- **Xenia Releases**: [xenia-manager/database](https://raw.githubusercontent.com/xenia-manager/database/refs/heads/main/data/xenia-releases/canary.json)

All download links point to official Xenia sources - nothing is hosted on this mirror site.

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles with mica theme
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main releases page
├── components/
│   ├── BackgroundLayers.tsx # Mica background effect
│   ├── CustomSelect.tsx     # Custom dropdown component
│   ├── DatePicker.tsx       # Custom date picker with theme support
│   ├── FilterBar.tsx        # Search and filter controls
│   ├── Footer.tsx           # Site footer
│   ├── Header.tsx           # Site header with theme toggle
│   ├── HeroSection.tsx      # Hero/banner section
│   ├── ReleaseCard.tsx      # Individual release card
│   ├── ReleasesList.tsx     # Main list with infinite scroll
│   └── ThemeProvider.tsx    # Theme context provider
└── lib/
    └── types.ts             # TypeScript type definitions
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Technologies Used

- **Next.js 16.1.1** - React framework with App Router
- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety throughout the codebase
- **Tailwind CSS v4.2** - Utility-first styling with custom theme
- **Mica Design** - Translucent material effects with backdrop blur
- **Inter Font** - Clean, modern typography

## Release Information

Each release card displays:

- **Title** - Release name/timestamp
- **Commit Hash** - Link to the specific commit
- **Changelog** - List of changes in the release
- **Published Date** - When the release was published
- **Download Links** - Direct downloads for Windows and Linux

## Filtering Options

- **Search** - Filter by tag name or commit title
- **From Date** - Show releases from a specific date onwards
- **To Date** - Show releases up to a specific date
- **Sort By** - Sort releases by newest or oldest first

## License

This project is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Xenia Project](https://github.com/xenia-project/xenia) - Xbox 360 emulator
- [Xenia Canary](https://github.com/xenia-canary/xenia-canary) - Experimental Xenia build
- [Xenia Manager Database](https://github.com/xenia-manager/database) - Release data source
- Design inspired by Windows 11 Mica material and Fluent UI
