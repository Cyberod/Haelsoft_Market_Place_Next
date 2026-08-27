import { Inter } from "next/font/google";
import "./globals.css";

// Self-hosted by next/font — replaces the Google Fonts @import the Vite app used,
// removing a render-blocking third-party round-trip. Variable axes cover the
// 100..900 weight range the original stylesheet requested.
const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-inter-sans",
});

// Placeholder only. Full metadata (OG/Twitter defaults, canonical, GA,
// search-console verification) lands in Step 2.3.
export const metadata = {
  title: "Haelsoft Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
