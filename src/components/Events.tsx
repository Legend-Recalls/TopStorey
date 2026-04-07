interface Event {
  title: string
  label?: string
  location?: string
  description?: string
  cta?: string
  countdown?: Array<{ value: string; unit: string }>
  month?: string
  day?: string
  meta?: string
}

interface EventsProps {
  items: Event[]
}

export function Events({ items }: EventsProps) {
  const featured = items[0]
  const upcoming = items.slice(1)

  return (
    <article className="feature-module event-module">
      {/* Same header pattern as Conversations */}
      <div className="module-head">
        <h3>Upcoming Events</h3>
        <span className="module-link">Calendar</span>
      </div>

      {/* Featured event — same slot as the podcast hero image in Conversations */}
      {featured && (
        <div className="event-hero">
          <div className="event-meta-row">
            {featured.label && (
              <span className="event-label">{featured.label}</span>
            )}
            {featured.location && (
              <span className="event-location">{featured.location}</span>
            )}
          </div>
          <h4>{featured.title}</h4>
          {featured.description && <p>{featured.description}</p>}
          {featured.countdown && (
            <div className="countdown-grid">
              {featured.countdown.map((item) => (
                <div key={item.unit} className="countdown-card">
                  <strong>{item.value}</strong>
                  <span>{item.unit}</span>
                </div>
              ))}
            </div>
          )}
          {featured.cta && (
            <button type="button" className="button event-button">
              {featured.cta}
            </button>
          )}
        </div>
      )}

      {/* Upcoming list — same slot as the podcast list items in Conversations */}
      {upcoming.length > 0 && (
        <div className="module-list">
          {upcoming.map((event) => (
            <article key={event.title} className="module-list-item">
              <div className="date-badge">
                <span>{event.month}</span>
                <strong>{event.day}</strong>
              </div>
              <div>
                <h5>{event.title}</h5>
                {event.meta && <p>{event.meta}</p>}
              </div>
            </article>
          ))}
        </div>
      )}
    </article>
  )
}
