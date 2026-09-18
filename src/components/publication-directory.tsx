"use client";

import { useMemo, useState } from "react";
import type { Publication } from "@/lib/content";
import { PublicationCard } from "@/components/publication-card";

export function PublicationDirectory({ publications }: { publications: Publication[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => publications.filter((publication) => {
    const haystack = `${publication.title} ${publication.authors.join(" ")} ${publication.venue}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (filter === "all" || publication.publicationType === filter);
  }), [publications, query, filter]);

  return <>
    <div className="directory-toolbar">
      <label className="search-field"><span className="sr-only">Search publications</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, author or journal" /></label>
      <label className="select-field"><span className="sr-only">Filter publications</span><select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="all">All work</option><option value="journal_article">Journal articles</option><option value="book">Books</option><option value="manuscript">Under review</option></select></label>
    </div>
    <div className="publication-list">
      {filtered.map((publication) => <PublicationCard key={publication.id} publication={publication} />)}
      {!filtered.length && <div className="empty-state">No publications match that search.</div>}
    </div>
  </>;
}
