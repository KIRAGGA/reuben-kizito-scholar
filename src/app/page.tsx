import Link from "next/link";
import { getPublications, getPublicProfile } from "@/lib/content-server";
import { PublicationCard } from "@/components/publication-card";
import { SectionHeading } from "@/components/section-heading";

export default async function Home() {
  const profile = await getPublicProfile();
  const pubs = await getPublications();
  return <>
    <section className="hero"><div className="container hero-grid"><div><p className="eyebrow">Scholar · researcher · lecturer · consultant</p><h1>{profile.name}</h1><p className="lead">{profile.tagline} {profile.intro}</p><div className="hero-actions"><Link className="button button-light" href="/publications">Explore the research</Link><Link className="button button-ghost" href="/appointments">Book a conversation</Link></div></div><div className="hero-note"><p>“{profile.heroQuote}”</p><span>Research with a practical pulse</span></div></div></section>
    <section className="section"><div className="container split"><div><SectionHeading eyebrow="A short introduction" title="Ideas that travel between the classroom and the enterprise." /></div><div><p className="lead">{profile.intro}</p><Link className="text-link" href="/about">Read the full profile <span aria-hidden="true">↗</span></Link></div></div><div className="container stat-row"><div className="stat"><strong>{pubs.filter((p) => p.status === "published").length}</strong><span>published works in the catalogue</span></div><div className="stat"><strong>20+</strong><span>years across teaching and practice</span></div><div className="stat"><strong>UG</strong><span>grounded in Uganda, connected outward</span></div></div></section>
    <section className="section section-tint"><div className="container"><SectionHeading eyebrow="Selected work" title="Research that asks useful questions." intro="A growing body of work on the people, structures and choices that shape enterprise in Uganda and beyond." /><div className="publication-list">{pubs.filter((p) => p.featured).slice(0, 3).map((publication) => <PublicationCard key={publication.id} publication={publication} />)}</div><div className="hero-actions"><Link className="button" href="/publications">View all publications</Link></div></div></section>
    <section className="section section-dark"><div className="container split"><div><p className="eyebrow">Work together</p><h2 className="statement">A thoughtful conversation can turn a loose question into a useful next step.</h2><Link className="button button-light" href="/appointments">Find a time to talk</Link></div><ul className="list-clean">{profile.researchInterests.slice(0, 5).map((item) => <li key={item}>{item}</li>)}</ul></div></section>
  </>;
}
