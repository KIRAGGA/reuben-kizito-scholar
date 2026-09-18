import Link from "next/link";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div>
        <p className="eyebrow">REUBEN DAVID KIZITO</p>
        <p className="footer-note">Scholarship that stays close to the lived realities of entrepreneurs, families and institutions.</p>
      </div>
      <div className="footer-links">
        <Link href="/publications">Publications</Link>
        <Link href="/book">The book</Link>
        <Link href="/appointments">Appointments</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/privacy">Privacy</Link>
      </div>
      <div className="footer-meta">
        <span>Kampala, Uganda</span>
        <span>© {new Date().getFullYear()} Reuben David Kizito</span>
      </div>
    </div>
  </footer>;
}
