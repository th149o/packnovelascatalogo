import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/config";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novelasverticais.com.br"),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "novelas verticais",
    "streaming celular",
    "novelas curtas",
    "pack novelas",
    "drama vertical",
    "romance bilionario",
    "maratonar novelas",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/capas/a vida secreta do meu marido bilionário.jpg",
        width: 720,
        height: 1280,
        alt: siteConfig.title,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`dark ${font.variable}`}>
      <body className="font-sans antialiased bg-[#09090B] text-slate-100 selection:bg-brand-pink selection:text-white">
        {children}
      </body>
    </html>
  );
}
