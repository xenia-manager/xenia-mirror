import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import BackgroundLayers from "@/components/BackgroundLayers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xenia Canary Mirror",
  description: "Browse Xenia Canary builds with direct download links",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              const savedTheme = localStorage.getItem("theme");
              const theme = savedTheme || "dark";
              document.documentElement.classList.remove("dark", "light");
              document.documentElement.classList.add(theme);
              document.documentElement.style.colorScheme = theme;
            })();`,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <ThemeProvider>
          <BackgroundLayers />
          <Header />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
