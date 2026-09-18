import { PageHero } from "@/components/page-hero";
import { PublicationDirectory } from "@/components/publication-directory";
import { getPublications } from "@/lib/content-server";

export const metadata = { title: "Publications" };
export default async function PublicationsPage() { const items = await getPublications(); return <><PageHero eyebrow="Publications" title="A catalogue of research and writing." intro="Browse published articles, the book and manuscripts currently under review." /><section className="section"><div className="container"><PublicationDirectory publications={items} /></div></section></>; }
