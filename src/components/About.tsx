interface AboutLink {
  title: string
  description: string
}

interface FounderProfile {
  image: string
  name?: string
  role: string
  summary: string
}

interface AboutProps {
  links: AboutLink[]
  founder?: FounderProfile
}

export function About({ links, founder }: AboutProps) {
  return (
    <div className="approach-panel">
      <div className="about-lead">
        <div className="section-heading">
          <p className="eyebrow">About</p>
          <h2>Method before momentum.</h2>
        </div>

        {founder ? (
          <figure className="founder-card">
            <div className="founder-portrait">
              <span className="founder-image-fallback">CEO</span>
              <img
                src={founder.image}
                alt={founder.name ? `${founder.name}, ${founder.role}` : founder.role}
              />
            </div>
            <figcaption className="founder-caption">
              <span className="founder-kicker">Leadership Desk</span>
              {founder.name ? <strong>{founder.name}</strong> : null}
              <span>{founder.role}</span>
              <p>{founder.summary}</p>
            </figcaption>
          </figure>
        ) : null}
      </div>

      <div className="timeline">
        {links.map((link, index) => (
          <article key={link.title} className="timeline-item">
            <span>{`0${index + 1}`}</span>
            <div>
              <h3>{link.title}</h3>
              <p>{link.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
