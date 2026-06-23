import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Footer, Masthead } from '../components'
import { RecommendedPropertiesRail } from '../components/RecommendedPropertiesRail'
import eventsData from '../data/events.json'
import '../styles/15-event-page.css'

export function EventPage({ navItems, footerSections }) {
  const { slug } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!slug) {
    const upcomingEvents = eventsData
      .filter((e) => e.date >= '2026-05-28')
      .sort((a, b) => a.date.localeCompare(b.date))
    const pastEvents = eventsData
      .filter((e) => e.date < '2026-05-28')
      .sort((a, b) => b.date.localeCompare(a.date))

    return (
      <div className="event-page-shell">
        <Masthead navItems={navItems} />

        <main className="event-briefing-container" id="main-content">
          {/* Navigation & Breadcrumbs */}
          <div className="briefing-nav-bar">
            <Link to="/" className="briefing-back-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Front Page
            </Link>
            <span className="briefing-confidential-label">
              Editorial Events Directory
            </span>
          </div>

          <header className="archive-header">
            <p className="archive-subtitle">Top Storey Events</p>
            <h1 className="archive-title">Press Briefings & Summit Archives</h1>
            <p className="archive-description">
              A comprehensive archive of past press briefings, editorial summits, and agendas for upcoming industry engagements.
            </p>
          </header>

          <div className="archive-sections-layout">
            {/* Upcoming Events Column */}
            <div className="archive-column">
              <h2 className="archive-column-title">
                Upcoming Briefings
                <span className="archive-column-count">({upcomingEvents.length})</span>
              </h2>
              <div className="archive-list">
                {upcomingEvents.map((evt) => (
                  <Link key={evt.slug} to={`/events/${evt.slug}`} className="archive-card">
                    <div className="archive-card-meta">
                      <span className="archive-card-badge">{evt.label || 'Upcoming'}</span>
                      {evt.location && <span className="archive-card-location">{evt.location}</span>}
                    </div>
                    <h3 className="archive-card-title">{evt.title}</h3>
                    <p className="archive-card-description">{evt.description}</p>
                    <div className="archive-card-footer">
                      <span className="archive-card-date">
                        {evt.date ? new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}
                      </span>
                      <span className="archive-card-action">
                        View Briefing
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Past Events Column */}
            <div className="archive-column">
              <h2 className="archive-column-title">
                Past Archives
                <span className="archive-column-count">({pastEvents.length})</span>
              </h2>
              <div className="archive-list">
                {pastEvents.map((evt) => (
                  <Link key={evt.slug} to={`/events/${evt.slug}`} className="archive-card">
                    <div className="archive-card-meta">
                      <span className="archive-card-badge past">{evt.label || 'Dossier'}</span>
                      {evt.location && <span className="archive-card-location">{evt.location}</span>}
                    </div>
                    <h3 className="archive-card-title">{evt.title}</h3>
                    <p className="archive-card-description">{evt.description}</p>
                    <div className="archive-card-footer">
                      <span className="archive-card-date">
                        {evt.date ? new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Archive'}
                      </span>
                      <span className="archive-card-action">
                        Read Dossier
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <RecommendedPropertiesRail pageType="event" />
        </main>

        <Footer sections={footerSections} />
      </div>
    )
  }

  const event = eventsData.find((e) => e.slug === slug)

  if (!event) {
    return (
      <div className="event-page-shell">
        <Masthead navItems={navItems} />
        <main className="event-briefing-container">
          <div className="briefing-nav-bar">
            <Link to="/" className="briefing-back-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Front Page
            </Link>
          </div>
          <div style={{ padding: '6rem 1rem', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginBottom: '1rem', fontWeight: 600 }}>Event Briefing Not Found</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}>
              The press briefing or archived dossier you requested could not be located in our records.
            </p>
            <Link to="/" style={{ background: 'var(--color-foreground)', color: 'var(--color-background)', padding: '0.85rem 1.75rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.05em' }}>
              Return to Front Page
            </Link>
          </div>
        </main>
        <Footer sections={footerSections} />
      </div>
    )
  }

  // Determine if the event is in the past (mock cutoff May 28, 2026)
  const isPast = event.date < '2026-05-28'

  // Format the display date
  const displayDate = event.date ? new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'TBD'

  return (
    <div className="event-page-shell">
      <Masthead navItems={navItems} />

      <main className="event-briefing-container" id="main-content">
        {/* Navigation & Breadcrumbs */}
        <div className="briefing-nav-bar">
          <Link to="/" className="briefing-back-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Front Page
          </Link>
          <span className="briefing-confidential-label">
            {isPast ? 'Editorial Press Archive — Public Access' : 'Upcoming Event Briefing — Private Access'}
          </span>
        </div>

        {/* Hero Header Block */}
        <header className="briefing-header">
          <div className="briefing-meta-row">
            {event.label && <span className="briefing-label-badge">{event.label}</span>}
            {event.location && <span className="briefing-location">{event.location}</span>}
          </div>
          
          <h1 className="briefing-title">{event.title}</h1>
          
          <div className="briefing-date-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {displayDate}
          </div>
        </header>

        {/* Layout Grid */}
        <div className="briefing-grid">
          
          {/* Left Column: Analytical Coverage & Briefing */}
          <div className="briefing-main-col">
            <section className="briefing-section">
              <h2 className="briefing-section-title">
                {isPast ? 'Post-Event Editorial Report' : 'Pre-Event Analytical Briefing'}
              </h2>
              <div className="briefing-paragraphs">
                {event.pressBriefing && event.pressBriefing.map((paragraph, index) => (
                  <p key={index} className="briefing-p">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Countdown Widget for Upcoming Events */}
            {!isPast && event.countdown && (
              <section className="briefing-section countdown-section">
                <h3 className="countdown-title-label">Live Broadcast Countdown</h3>
                <div className="briefing-countdown-grid">
                  {event.countdown.map((item) => (
                    <div key={item.unit} className="briefing-countdown-card">
                      <strong>{item.value}</strong>
                      <span>{item.unit}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Agenda, Speakers, Takeaways */}
          <div className="briefing-side-col">
            
            {/* Speakers / Panelists Widget */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="briefing-widget">
                <h3 className="briefing-widget-title">
                  {isPast ? 'Featured Press Speakers' : 'Anticipated Speakers'}
                </h3>
                <ul className="briefing-speakers-list">
                  {event.speakers.map((speaker, idx) => (
                    <li key={idx} className="speaker-item">
                      <span className="speaker-dot"></span>
                      {speaker}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Takeaways for Past Events */}
            {isPast && event.keyTakeaways && event.keyTakeaways.length > 0 && (
              <div className="briefing-widget highlight-widget">
                <h3 className="briefing-widget-title">Key Editorial Takeaways</h3>
                <ol className="briefing-takeaways-list">
                  {event.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="takeaway-item">
                      <span className="takeaway-number">{`${idx + 1}`.padStart(2, '0')}</span>
                      <p className="takeaway-text">{takeaway}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Agenda for Future Events */}
            {!isPast && event.agenda && event.agenda.length > 0 && (
              <div className="briefing-widget highlight-widget">
                <h3 className="briefing-widget-title">Expected Press Agenda</h3>
                <div className="briefing-agenda-timeline">
                  {event.agenda.map((item, idx) => (
                    <div key={idx} className="agenda-timeline-item">
                      <span className="agenda-time">{item.time}</span>
                      <p className="agenda-topic">{item.topic}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        <RecommendedPropertiesRail pageType="event" />
      </main>

      <Footer sections={footerSections} />
    </div>
  )
}
