import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fbfcfa" };
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  title: "Klyv Inteligência Comercial",
  description: "Do primeiro contato à próxima conquista. Organize clientes, propostas, execução e metas no Klyv. Crie sua conta e comece pelo Trial de 14 dias.",
  robots: siteUrl ? "index, follow" : "noindex, nofollow",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: { type: "website", locale: "pt_BR", title: "Klyv Inteligência Comercial", description: "Clientes, propostas e resultados conectados. Conheça o Klyv e comece com o Trial de 14 dias.", siteName: "Klyv", ...(siteUrl ? { url: siteUrl } : {}) },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={nunito.variable}>
      <body className={`${nunito.className} antialiased`}>{children}</body>
    </html>
  );
}
