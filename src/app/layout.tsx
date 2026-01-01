import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter } from "next/font/google";
import "./globals.css";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-dark-primary text-white transition-colors duration-500`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
