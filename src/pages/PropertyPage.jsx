import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Footer, Masthead } from '../components'
import { RecommendedPropertiesRail } from '../components/RecommendedPropertiesRail'
import { propertyDataset } from '../components/Cities'
import '../styles/14-property-page.css'

export function PropertyPage({ navItems, footerSections }) {
  const { id } = useParams()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [firm, setFirm] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const property = propertyDataset.find((p) => p.id === id)

  if (!property) {
    return (
      <div className="property-page-shell">
        <Masthead navItems={navItems} />
        <main className="property-prospectus">
          <div className="prospectus-nav-bar">
            <Link to="/" className="prospectus-back-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Homepage
            </Link>
          </div>
          <div style={{ padding: '4rem 1rem', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>Prospectus Not Found</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>The property briefing identifier you requested could not be located in our records.</p>
            <Link to="/" style={{ background: 'var(--color-foreground)', color: 'var(--color-background)', padding: '0.75rem 1.5rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'none' }}>Return to Front Page</Link>
          </div>
        </main>
        <Footer sections={footerSections} />
      </div>
    )
  }

  // Recommended properties are now rendered by <RecommendedPropertiesRail>,
  // which pulls the admin-controlled pinned list from Supabase and auto-fills
  // the remaining pool behind it (excluding the current property).

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!name || !email) return
    setFormSubmitted(true)
  }

  // Parse scores for progress bars
  const connWidth = property.connectivity.includes('/')
    ? `${parseFloat(property.connectivity.split('/')[0]) * 10}%`
    : '85%'
  
  const infraWidth = property.infrastructure.includes('/')
    ? `${parseFloat(property.infrastructure.split('/')[0]) * 10}%`
    : '80%'

  return (
    <div className="property-page-shell">
      <Masthead navItems={navItems} />

      <main className="property-prospectus" id="main-content">
        {/* Back and Breadcrumbs */}
        <div className="prospectus-nav-bar">
          <Link to="/" className="prospectus-back-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Real Estate Search
          </Link>
          <span className="prospectus-archive-label">
            Asset Appraisal Dossier — Confidential
          </span>
        </div>

        {/* Hero Section */}
        <div className="prospectus-header-layout">
          <div className="prospectus-hero-media">
            <img src={property.image} alt={property.title} className="prospectus-hero-img" />
            <div className="prospectus-media-badge">{property.type}</div>
          </div>

          <div className="prospectus-meta-box">
            <span className="prospectus-builder">{property.builder}</span>
            <h1 className="prospectus-title">{property.title}</h1>
            <div className="prospectus-locality">
              {property.locality}, {property.city}
            </div>

            <div className="prospectus-valuation-row">
              <div className="prospectus-val-meta">
                <span className="prospectus-val-lbl">Current Appraised Value</span>
                <strong className="prospectus-val-price">{property.price}</strong>
              </div>
              <div className="prospectus-grade-badge">
                <span className="prospectus-grade-lbl">Investment Grade</span>
                <strong className="prospectus-grade-num">{property.score.split(' ')[0]}</strong>
              </div>
            </div>

            <p className="prospectus-desc-lead">{property.description}</p>
          </div>
        </div>

        {/* Detailed Grid (Left: appraisal & financials, Right: inquiry form & ratings) */}
        <div className="prospectus-grid-layout">
          <div className="prospectus-main-content">
            
            {/* Editorial Appraisal */}
            <section className="prospectus-section">
              <h2 className="prospectus-section-title">Top Storey Editorial Appraisal</h2>
              <div className="prospectus-appraisal-quote">
                <p className="prospectus-appraisal-text">
                  "{property.editorialInsight}"
                </p>
              </div>
            </section>

            {/* Financial Performance */}
            <section className="prospectus-section">
              <h2 className="prospectus-section-title">Core Capital Performance Markers</h2>
              <div className="prospectus-financial-cards">
                <div className="prospectus-fin-card">
                  <span className="prospectus-fin-lbl">Rental Yield Spread</span>
                  <strong className="prospectus-fin-val">{property.yield}</strong>
                  <span className="prospectus-fin-sub">vs. 10-Yr sovereign bond spread</span>
                </div>
                <div className="prospectus-fin-card">
                  <span className="prospectus-fin-lbl">Capital Appreciation</span>
                  <strong className="prospectus-fin-val">{property.trend}</strong>
                  <span className="prospectus-fin-sub">Compound annual index growth</span>
                </div>
                <div className="prospectus-fin-card">
                  <span className="prospectus-fin-lbl">Liquidity Profile</span>
                  <strong className="prospectus-fin-val">{property.liquidity}</strong>
                  <span className="prospectus-fin-sub">Velocity of secondary exit trades</span>
                </div>
              </div>
            </section>

            {/* Chart */}
            <section className="prospectus-section">
              <h2 className="prospectus-section-title">Historical Price Projection Index (2021 – 2026)</h2>
              <div className="prospectus-chart-card">
                <svg className="prospectus-chart-svg" viewBox="0 0 500 180">
                  <line x1="40" y1="20" x2="480" y2="20" className="chart-grid-line" />
                  <line x1="40" y1="60" x2="480" y2="60" className="chart-grid-line" />
                  <line x1="40" y1="100" x2="480" y2="100" className="chart-grid-line" />
                  <line x1="40" y1="140" x2="480" y2="140" className="chart-grid-line" />
                  
                  <path
                    d="M 50 135 L 130 115 L 210 95 L 290 85 L 370 50 L 450 35"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  
                  <path
                    d="M 50 135 L 130 115 L 210 95 L 290 85 L 370 50 L 450 35 L 450 140 L 50 140 Z"
                    fill="url(#prospectus-chart-gradient)"
                    opacity="0.12"
                  />
                  
                  <circle cx="50" cy="135" r="4.5" className="chart-dot" />
                  <circle cx="130" cy="115" r="4.5" className="chart-dot" />
                  <circle cx="210" cy="95" r="4.5" className="chart-dot" />
                  <circle cx="290" cy="85" r="4.5" className="chart-dot" />
                  <circle cx="370" cy="50" r="4.5" className="chart-dot" />
                  <circle cx="450" cy="35" r="4.5" className="chart-dot" />

                  <text x="50" y="160" className="chart-label">2021</text>
                  <text x="130" y="160" className="chart-label">2022</text>
                  <text x="210" y="160" className="chart-label">2023</text>
                  <text x="290" y="160" className="chart-label">2024</text>
                  <text x="370" y="160" className="chart-label">2025</text>
                  <text x="450" y="160" className="chart-label">2026 (Est)</text>

                  <defs>
                    <linearGradient id="prospectus-chart-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="prospectus-sidebar">
            
            {/* Ratings Item */}
            <div className="prospectus-sidebar-widget">
              <h3 className="prospectus-widget-title">Civic Quality Ratings</h3>
              <div className="prospectus-rating-card">
                <div className="prospectus-rating-item">
                  <span className="prospectus-rating-lbl">Locality Connectivity</span>
                  <div className="prospectus-rating-bar-wrapper">
                    <div className="prospectus-rating-bar-filled" style={{ width: connWidth }}></div>
                  </div>
                  <span className="prospectus-rating-score">{property.connectivity}</span>
                </div>
                
                <div className="prospectus-rating-item">
                  <span className="prospectus-rating-lbl">Civic Infrastructure</span>
                  <div className="prospectus-rating-bar-wrapper">
                    <div className="prospectus-rating-bar-filled" style={{ width: infraWidth }}></div>
                  </div>
                  <span className="prospectus-rating-score">{property.infrastructure}</span>
                </div>
              </div>
            </div>

            {/* Inquiry Form Form */}
            <div className="prospectus-sidebar-widget">
              <h3 className="prospectus-widget-title">Secure Prospectus Request</h3>
              <div className="prospectus-inquiry-card">
                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2e6930" strokeWidth="3" style={{ marginBottom: '0.75rem' }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#2e6930', marginBottom: '0.35rem' }}>Dossier Requested</h4>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>Your credentials have been authenticated. The private appraisal packet for <strong>{property.title}</strong> has been dispatched to {email}.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <div className="prospectus-inquiry-header">
                      <h4>Request Appraisal Package</h4>
                      <p>Provide your institutional credentials below to request immediate access to the full, confidential valuation ledger.</p>
                    </div>

                    <div className="prospectus-form-group">
                      <label htmlFor="name-input">Full Name</label>
                      <input
                        type="text"
                        id="name-input"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Aarav Sharma"
                      />
                    </div>

                    <div className="prospectus-form-group">
                      <label htmlFor="email-input">Professional Email</label>
                      <input
                        type="email"
                        id="email-input"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. investor@firm.com"
                      />
                    </div>

                    <div className="prospectus-form-group">
                      <label htmlFor="firm-input">Institutional Firm</label>
                      <input
                        type="text"
                        id="firm-input"
                        value={firm}
                        onChange={(e) => setFirm(e.target.value)}
                        placeholder="e.g. Sterling Capital Advisors"
                      />
                    </div>

                    <button type="submit" className="prospectus-submit-btn">
                      Request Access Ledger
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '6px' }}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Recommended Opportunities Rail (admin-controlled, horizontal) */}
        <RecommendedPropertiesRail pageType="property" currentPropertyId={property.id} />

      </main>

      <Footer sections={footerSections} />
    </div>
  )
}
