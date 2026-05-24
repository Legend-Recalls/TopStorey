import { type CSSProperties } from 'react'

interface MarketItem {
  label: string
  note?: string
}

interface MarketColumn {
  heading: string
  eyebrow?: string
  framing?: string
  image?: string
  items: Array<string | MarketItem>
  stat?: { value: string; label: string }
}

interface MarketsProps {
  columns: MarketColumn[]
}

function normalise(items: Array<string | MarketItem>): MarketItem[] {
  return items.map((it) => (typeof it === 'string' ? { label: it } : it))
}

export function Markets({ columns }: MarketsProps) {
  const normalised = columns.map((c) => ({ ...c, items: normalise(c.items) }))

  return (
    <section className="markets-section snap-section" id="markets">
      <div className="markets-section-heading reveal-item">
        <p className="eyebrow">Markets</p>
        <h2>Coverage organised by asset class, cycle, and sector dynamics.</h2>
      </div>

      <div
        className="markets-scrollbar"
        aria-hidden="true"
        style={
          {
            '--markets-progress': 0,
            '--markets-segments': normalised.length,
          } as CSSProperties
        }
      >
        {normalised.map((col, i) => (
          <span
            key={col.heading}
            className={`markets-scrollbar-segment${i === 0 ? ' is-active' : ''}`}
          >
            <span className="markets-scrollbar-num">{`0${i + 1}`}</span>
            <span className="markets-scrollbar-label">{col.heading}</span>
          </span>
        ))}
      </div>

      <div className="markets-atlas">
        <aside className="markets-rail" aria-hidden="true">
          <div className="markets-rail-head">
            <span className="eyebrow">Coverage Atlas</span>
            <p className="markets-rail-lede">
              Four asset classes. One taxonomy. Scroll to explore how we organise the
              market - by where capital flows, where households live, and where the
              cycle is turning.
            </p>
          </div>
          <ol className="markets-rail-progress">
            {normalised.map((col, i) => (
              <li key={col.heading} className={i === 0 ? 'is-active' : ''}>
                <span className="markets-rail-num">{`0${i + 1}`}</span>
                <span className="markets-rail-label">{col.heading}</span>
              </li>
            ))}
          </ol>
          <p className="markets-rail-foot">
            <span aria-hidden="true">-&gt;</span> Scroll to advance chapters
          </p>
        </aside>

        <div className="markets-track-viewport">
          <div className="markets-track">
            {normalised.map((col, i) => (
              <article
                key={col.heading}
                className={`market-chapter${i === 0 ? ' is-active' : ''}`}
              >
                {col.image && (
                  <div
                    className="market-chapter-bg"
                    style={{ backgroundImage: `url(${col.image})` }}
                    aria-hidden="true"
                  />
                )}
                <div className="market-chapter-inner">
                  <header className="market-chapter-head">
                    <span className="market-chapter-num">{`0${i + 1}`}</span>
                    <div>
                      <p className="eyebrow">{col.eyebrow ?? 'Asset Class'}</p>
                      <h3>{col.heading}</h3>
                    </div>
                  </header>

                  {col.framing && (
                    <p className="market-chapter-framing">{col.framing}</p>
                  )}

                  <ul className="market-chapter-list">
                    {(col.items as MarketItem[]).map((item) => (
                      <li key={item.label}>
                        <a href="#markets" className="market-chapter-row">
                          <span className="market-chapter-label">{item.label}</span>
                          {item.note && (
                            <span className="market-chapter-note">{item.note}</span>
                          )}
                          <span className="market-chapter-chev" aria-hidden="true">
                            -&gt;
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <footer className="market-chapter-foot">
                    {col.stat && (
                      <div className="market-chapter-stat">
                        <span className="market-chapter-stat-value">
                          {col.stat.value}
                        </span>
                        <span className="market-chapter-stat-label">
                          {col.stat.label}
                        </span>
                      </div>
                    )}
                    <a href="#markets" className="market-chapter-cta">
                      View coverage <span aria-hidden="true">-&gt;</span>
                    </a>
                  </footer>
                </div>
              </article>
            ))}
            <div className="market-chapter-spacer" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
