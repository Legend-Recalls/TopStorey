interface ContactCardProps {
  title: string
  description: string
  bullets: string[]
}

export function ContactCard({ title, description, bullets }: ContactCardProps) {
  return (
    <div className="contact-card">
      <div className="contact-card-rule" aria-hidden="true" />
      <div className="section-heading">
        <p className="eyebrow">Contact</p>
        <h2>{title}</h2>
      </div>
      <p className="lead">{description}</p>
      <div className="contact-proof-strip" aria-label="Editorial operating principles">
        <span>Independent</span>
        <span>Research-led</span>
        <span>Accountable</span>
      </div>
      <div className="editorial-list">
        {bullets.map((item, index) => (
          <p key={item}>
            <span>{`0${index + 1}`}</span>
            {item}
          </p>
        ))}
      </div>
    </div>
  )
}
