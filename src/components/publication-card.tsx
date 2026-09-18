import Link from "next/link";
import type { Publication } from "@/lib/content";
import { formatAuthors, labelForType } from "@/lib/content";

export function PublicationCard({ publication }: { publication: Publication }) {
  return <article className="publication-card">
    <div className="publication-card-top">
      <span className="tag">{labelForType(publication.publicationType)}</span>
      <span className="publication-year">{publication.year}</span>
    </div>
    <h3><Link href={`/publications/${publication.slug}`}>{publication.title}</Link></h3>
    <p className="authors">{formatAuthors(publication.authors)}</p>
    <p className="venue">{publication.venue}</p>
    <Link className="text-link" href={`/publications/${publication.slug}`}>Read details <span aria-hidden="true">↗</span></Link>
  </article>;
}
