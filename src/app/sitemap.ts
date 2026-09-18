import type { MetadataRoute } from "next";
import { publications } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://reuben-kizito-scholar.vercel.app"; const routes = ["", "/about", "/research", "/teaching", "/consultancy", "/community", "/book", "/publications", "/appointments", "/contact", "/privacy"]; return [...routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: route === "" ? 1 : .7 })), ...publications.map((publication) => ({ url: `${base}/publications/${publication.slug}`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: .6 }))]; }
