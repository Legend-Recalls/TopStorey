interface AboutLink {
  title: string
  description: string
}

interface AboutProps {
  links: AboutLink[]
}

export function About({ links }: AboutProps) {
  return (
    <div className="approach-panel">
      <div className="section-heading">
        <p className="eyebrow">About</p>
        <h2>Method before momentum.</h2>
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
