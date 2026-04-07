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
    <div className="sidebar-list">
      {items.map((item, index) => (
        <article key={item.title} className="most-read-item">
          <span className="most-read-rank">{`${index + 1}`.padStart(2, '0')}</span>
          <div className="most-read-copy">
            <span className="read-label">{item.label}</span>
            <p>{item.title}</p>
            <span className="most-read-meta">{item.meta}</span>
          </div>
        </article>
      ))}
    </div>
  )
}
