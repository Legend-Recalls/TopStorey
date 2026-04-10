interface FooterSection {
  sections: string[]
  company: string[]
  legal: string[]
}

interface FooterProps {
  sections: FooterSection
}

export function Footer({ sections }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <section className="footer-brand">
          <div className="brand footer-brand-mark">
            <span className="brand-mark">TS</span>
            <div>
              <p>Top Storey</p>
            </div>
          </div>
          <p className="footer-description">
            The definitive source for Indian real estate intelligence, data-driven research,
            and authoritative editorial content.
          </p>
          <div className="footer-socials">
            <a href="/" aria-label="X">X</a>
            <a href="/" aria-label="LinkedIn">in</a>
            <a href="/" aria-label="YouTube">▶</a>
          </div>
        </section>

        <section className="footer-column">
          <h3>Sections</h3>
          {sections.sections.map((item) => (
            <a key={item} href="/">{item}</a>
          ))}
        </section>

        <section className="footer-column">
          <h3>Company</h3>
          {sections.company.map((item) => (
            <a key={item} href="/">{item}</a>
          ))}
        </section>

        <section className="footer-column">
          <h3>Legal</h3>
          {sections.legal.map((item) => (
            <a key={item} href="/">{item}</a>
          ))}
        </section>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Top Storey Media Group. All rights reserved.</p>
        <button type="button" className="back-to-top" onClick={scrollToTop}>
          Back to top ↑
        </button>
        <span>Designed for Institutional Research</span>
      </div>
    </footer>
  )
}
