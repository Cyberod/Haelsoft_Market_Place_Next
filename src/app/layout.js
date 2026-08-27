import { Inter } from "next/font/google";
import Script from "next/script";
import { SITE_NAME, SITE_URL } from "@/lib/metadata";
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

const GA_MEASUREMENT_ID = "G-R9QNJYNSMP";

/**
 * Ported from the Vite app's index.html <head>.
 *
 * Deliberately absent: `alternates.canonical`. Metadata inherits down the
 * segment tree, so a canonical here would be applied to every page that does
 * not override it — reproducing the live site's worst SEO bug, where every URL
 * currently declares itself a duplicate of the homepage. Pages set their own
 * canonical via buildMetadata().
 */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Haelsoft Marketplace — Buy & Sell Digital Products & Online Courses",
    // Pages pass a bare title; this matches the SPA's "<name> | Haelsoft" format.
    template: "%s | Haelsoft",
  },
  description:
    "Haelsoft Marketplace is Nigeria's premier platform to buy and sell digital products, online courses, and creative assets in Tech, Business, Health, and more.",
  applicationName: SITE_NAME,
  robots: { index: true, follow: true },
  verification: { google: "YWdQVrxRTfKGOMJ4uS6wr9IImRicMRZaLpKA_BjVQQ8" },
  // Page-agnostic defaults only. buildMetadata() re-applies these per page,
  // because a page defining `openGraph` replaces this object wholesale.
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_NG",
  },
  twitter: { card: "summary" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}

        {/* GA4, same measurement ID as the SPA so the property sees both apps
            as one site while the migration is in progress. afterInteractive
            keeps it off the critical path — the SPA loaded it render-blocking
            in <head>. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
      </body>
    </html>
  );
}
