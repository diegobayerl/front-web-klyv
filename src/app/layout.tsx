import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { siteDescription, siteTitle, siteUrl } from "../lib/site";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const indexable = process.env.NODE_ENV === "production";
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fbfcfa" };
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Klyv",
  category: "business",
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
    },
  },
  title: {
    default: siteTitle,
    template: "%s | Klyv",
  },
  description: siteDescription,
  authors: [{ name: "Klyv", url: siteUrl }],
  creator: "Klyv",
  publisher: "Klyv",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: indexable,
    follow: true,
    googleBot: {
      index: indexable,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Klyv",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1024,
        height: 480,
        type: "image/jpeg",
        alt: "Klyv — Cada negociação no lugar. O próximo passo, claro.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={nunito.variable}>
      <head><link rel="describedby" href="/llms.txt" type="text/plain" /></head>
      <body className={`${nunito.className} antialiased`}>{children}</body>
    </html>
  );
}
