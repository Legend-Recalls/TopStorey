interface ConversationItem {
  title: string
  type?: string
  episode?: string
  image?: string
  meta?: string
}

interface ConversationsProps {
  items: ConversationItem[]
}

export function Conversations({ items }: ConversationsProps) {
  const featured = items[0]
  const rest = items.slice(1)

  return (
    <article className="feature-module">
      <div className="module-head">
        <h3>Conversations</h3>
        {featured?.type && <span className="module-tag">{featured.type}</span>}
      </div>

      {featured?.image && (
        <div
          className="module-hero"
          style={{ backgroundImage: `url(${featured.image})` }}
        >
          <div className="module-overlay">
            {featured.episode && (
              <span className="episode-pill">{featured.episode}</span>
            )}
            <h4>{featured.title}</h4>
          </div>
        </div>
      )}

      {rest.length > 0 && (
        <div className="module-list">
          {rest.map((item) => (
            <article key={item.title} className="module-list-item">
              <span className="play-icon">▶</span>
              <div>
                <h5>{item.title}</h5>
                {item.meta && <p>{item.meta}</p>}
              </div>
            </article>
          ))}
        </div>
      )}
    </article>
  )
}
