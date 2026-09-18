import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const metadataBase =
  siteUrl && /^https?:\/\//.test(siteUrl)
    ? new URL(siteUrl)
    : new URL("https://reuben-kizito-scholar.vercel.app");

export const metadata: Metadata = {
  metadataBase,
  title: { default: "Reuben David Kizito | Scholar, researcher and consultant", template: "%s | Reuben David Kizito" },
  description: "The research, teaching and practical work of Reuben David Kizito in entrepreneurship, family business and sustainable enterprise.",
  keywords: ["Reuben David Kizito", "entrepreneurship researcher Uganda", "family business succession", "business consultant Kampala"],
  openGraph: { type: "website", title: "Reuben David Kizito", description: "Scholarship for entrepreneurs, family businesses and institutions.", siteName: "Reuben David Kizito" },
  twitter: { card: "summary_large_image", title: "Reuben David Kizito", description: "Scholar, researcher, lecturer and consultant." },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col"><SiteHeader /><main className="site-main">{children}</main><SiteFooter /></body>
    </html>
  );
}
