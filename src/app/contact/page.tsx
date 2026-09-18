import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata = { title: "Contact" };
export default function ContactPage() { return <><PageHero eyebrow="Contact" title="Bring a question, an invitation or a possibility." intro="Use the form to send a message. For a focused appointment, use the scheduling page so the right context is captured from the beginning." /><section className="section"><div className="container contact-grid"><div className="contact-details"><div><strong>Kampala, Uganda</strong><span>Working across research, teaching, enterprise and community initiatives.</span></div><div><strong>Prefer a scheduled conversation?</strong><span><a className="text-link" href="/appointments">Request an appointment ↗</a></span></div></div><ContactForm /></div></section></>; }
