interface MarketColumn {
  heading: string
  items: string[]
}

interface MarketsProps {
  columns: MarketColumn[]
}

export function Markets({ columns }: MarketsProps) {
  return (
    <div className="taxonomy-grid">
      {columns.map((col) => (
        <div key={col.heading} className="taxonomy-card">
          <h3>{col.heading}</h3>
          <ul>
            {col.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
