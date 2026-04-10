interface MostReadItem {
  label: string
  title: string
  meta: string
}

interface MostReadProps {
  items: MostReadItem[]
}

export function MostRead({ items }: MostReadProps) {
  return (
    <div className="trending-grid">
      {items.map((item, index) => (
        <article key={item.title} className="trending-card">
          <div className="trending-rank-bar">
            <span className="trending-rank">{`${index + 1}`.padStart(2, '0')}</span>
            <span className="trending-label">{item.label}</span>
          </div>
          <p className="trending-title">{item.title}</p>
          <span className="trending-meta">{item.meta}</span>
        </article>
      ))}
    </div>
  )
}
