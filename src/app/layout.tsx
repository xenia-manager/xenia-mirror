import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xenia Canary Mirror",
  description: "Browse Xenia Canary builds with direct download links",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-dark-primary text-white transition-colors duration-500">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
