interface NewsTickerProps {
  items: string[]
}

export function NewsTicker({ items }: NewsTickerProps) {
  const doubled = [...items, ...items]

  return (
    <div className="news-ticker">
      <span className="ticker-badge">
        <span className="live-dot" />
        Live
      </span>
      <div className="ticker-track">
        <div className="ticker-content">
          {doubled.map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
