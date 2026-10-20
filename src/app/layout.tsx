import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://klyv.com.br").replace(/\/$/, "");
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
    default: "Klyv | Inteligência Comercial, Propostas, Clientes e IA com a Lia",
    template: "%s | Klyv",
  },
  description: "Do primeiro contato à próxima conquista. Organize clientes, conduza propostas, acompanhe entregas, pesquisas de satisfação e opere com a Lia no Klyv. Teste grátis por 14 dias.",
  keywords: [
    "Klyv",
    "Klyv Inteligência Comercial",
    "inteligência comercial",
    "gestão comercial",
    "propostas comerciais",
    "funil de vendas",
    "kanban de propostas",
    "assistente IA comercial",
    "Lia IA",
    "IA no WhatsApp para vendas",
    "pesquisa de satisfação NPS",
    "gestão de clientes B2B",
    "follow-up comercial",
    "pós-venda e execução",
    "metas comerciais",
  ],
  authors: [{ name: "Klyv", url: siteUrl }],
  creator: "Klyv",
  publisher: "Klyv",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
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
    title: "Klyv | Inteligência Comercial, Propostas, Clientes e IA com a Lia",
    description: "Do primeiro contato à próxima conquista. Clientes, propostas, execução, metas e a assistente Lia conectados em um só lugar. Teste grátis por 14 dias.",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 480,
        type: "image/png",
        alt: "Klyv — Seu comercial mais próximo e mais à frente",
      },
      {
        url: "/og-image.svg",
        width: 1024,
        height: 480,
        type: "image/svg+xml",
        alt: "Klyv — Plataforma de Inteligência Comercial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klyv | Inteligência Comercial, Propostas e IA com a Lia",
    description: "Organize clientes, propostas, metas e pesquisas com o apoio da Lia no Klyv. Teste grátis por 14 dias.",
    images: ["/og-image.png"],
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={nunito.variable}>
      <body className={`${nunito.className} antialiased`}>{children}</body>
    </html>
  );
}
