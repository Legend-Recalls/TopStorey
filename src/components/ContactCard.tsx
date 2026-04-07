interface ContactCardProps {
  title: string
  description: string
  bullets: string[]
}

export function ContactCard({ title, description, bullets }: ContactCardProps) {
  return (
    <div className="contact-card">
      <div className="section-heading">
        <p className="eyebrow">Contact</p>
        <h2>{title}</h2>
      </div>
      <p className="lead">{description}</p>
      <div className="bullet-card compact-card">
        {bullets.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  )
}
