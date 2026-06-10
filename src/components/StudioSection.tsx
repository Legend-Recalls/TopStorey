import { Link } from 'react-router-dom'

interface ConversationItem {
  title: string
  type?: string
  episode?: string
  image?: string
  meta?: string
}

interface EventCountdown {
  value: string
  unit: string
}

interface EventItem {
  title: string
  slug: string
  label?: string
  location?: string
  description?: string
  cta?: string
  countdown?: EventCountdown[]
  month?: string
  day?: string
  meta?: string
}

interface StudioSectionProps {
  conversations: ConversationItem[]
  events: EventItem[]
}

export function StudioSection({ conversations, events }: StudioSectionProps) {
  const [heroConversation, ...allListConversations] = conversations
  const listConversations = allListConversations.slice(0, 2)
  const hasMoreConversations = allListConversations.length > 2

  const [heroEvent, ...allListEvents] = events
  const listEvents = allListEvents.slice(0, 2)
  const hasMoreEvents = allListEvents.length > 2

  return (
    <section className="section studio-section snap-section" id="studio">
      <div className="section-heading reveal-item">
        <p className="eyebrow">Studio</p>
        <h2>Interviews, debates, and industry engagement.</h2>
      </div>

      <div className="studio-grid">
        {/* Conversations Column */}
        <div className="studio-column reveal-item">
          <div className="studio-column-head">
            <h3>Conversations</h3>
          </div>
          
          {heroConversation && (
            <div
              className="studio-hero-card has-bg"
              style={{ backgroundImage: `url(${heroConversation.image})` }}
            >
              <div className="studio-overlay">
                <span className="studio-badge">
                  {heroConversation.type} {heroConversation.episode && `| ${heroConversation.episode}`}
                </span>
                <h4>{heroConversation.title}</h4>
              </div>
            </div>
          )}

          <div className="studio-list">
            {listConversations.map((conv, idx) => (
              <div key={idx} className="studio-list-item">
                <div className="studio-play-icon">▶</div>
                <div className="studio-list-content">
                  <h5>{conv.title}</h5>
                  <p>{conv.meta}</p>
                </div>
              </div>
            ))}
          </div>

          {hasMoreConversations && (
            <div className="studio-view-all">
              <span className="studio-view-all-link">
                All Conversations
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          )}
        </div>

        {/* Events Column */}
        <div className="studio-column reveal-item">
          <div className="studio-column-head">
            <h3>Events</h3>
          </div>

          {heroEvent && (
            <Link
              to={`/events/${heroEvent.slug}`}
              className="studio-hero-card event-hero clickable-event-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="event-meta-row">
                <span className="studio-badge live-badge">● {heroEvent.label}</span>
                {heroEvent.location && (
                  <span className="event-location-tag">{heroEvent.location}</span>
                )}
              </div>
              <h4>{heroEvent.title}</h4>
              
              {heroEvent.countdown && (
                <div className="countdown-grid">
                  {heroEvent.countdown.map((item, idx) => (
                    <div key={idx} className="countdown-card">
                      <strong>{item.value}</strong>
                      <span>{item.unit}</span>
                    </div>
                  ))}
                </div>
              )}
            </Link>
          )}

          <div className="studio-list">
            {listEvents.map((evt, idx) => (
              <Link
                key={idx}
                to={`/events/${evt.slug}`}
                className="studio-list-item event-list-item clickable-event-item"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="event-date">
                  <span className="event-month">{evt.month}</span>
                  <span className="event-day">{evt.day}</span>
                </div>
                <div className="studio-list-content">
                  <h5>{evt.title}</h5>
                  <p>{evt.meta}</p>
                </div>
              </Link>
            ))}
          </div>

          {hasMoreEvents && (
            <div className="studio-view-all">
              <Link to="/events" className="studio-view-all-link" style={{ textDecoration: 'none' }}>
                All Events
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
