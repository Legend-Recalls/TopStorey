import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const wrapper = wrapperRef.current
    const track = trackRef.current
    if (!section || !wrapper || !track) return

    // Only enable horizontal pin-scroll above a sensible breakpoint —
    // on narrow viewports a normal vertical stack reads better.
    const mm = gsap.matchMedia()

    mm.add('(min-width: 900px)', () => {
      const ctx = gsap.context(() => {
        const getScrollAmount = () => {
          // The track scrolls inside `.markets-track-viewport`, NOT inside
          // `.markets-atlas` (which also contains the rail). Measuring against
          // the wrapper undercounts by the rail's width, so the last chapter
          // never reaches the right edge. Use the track's actual parent.
          const viewport = track.parentElement ?? wrapper
          const trackWidth = track.scrollWidth
          const viewportWidth = viewport.clientWidth
          return -(trackWidth - viewportWidth)
        }
        const getDwell = () => Math.round(window.innerHeight * 0.5)

        const state = { scroll: 0, dwell: 0, total: 1 }
        const recalc = () => {
          state.scroll = Math.abs(getScrollAmount())
          state.dwell = getDwell()
          state.total = state.scroll + state.dwell * 2 || 1
        }
        recalc()

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${state.total}`,
          pin: true,
          pinType: 'fixed',
          invalidateOnRefresh: true,
          onRefresh: recalc,
          onUpdate: (self) => {
            const px = self.progress * state.total

            // Resolve x with dwell at both ends.
            let x = 0
            if (px <= state.dwell) {
              x = 0
            } else if (px >= state.dwell + state.scroll) {
              x = -state.scroll
            } else {
              x = -(px - state.dwell)
            }
            gsap.set(track, { x })

            // Rail progress tracks the *horizontal* phase only, so it
            // sits at 0 during the leading dwell and at max during the
            // trailing dwell — matches what the user sees on screen.
            const hProgress =
              state.scroll === 0
                ? 0
                : Math.max(0, Math.min(1, (px - state.dwell) / state.scroll))
            const idx = Math.min(
              columns.length - 1,
              Math.round(hProgress * (columns.length - 1)),
            )
            setActiveIndex(idx)
          },
        })
      }, section)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [columns])

  const normalised = columns.map((c) => ({ ...c, items: normalise(c.items) }))

  return (
    <section
      ref={sectionRef}
      className="markets-section snap-section"
      id="markets"
    >
      <div className="markets-section-heading reveal-item">
        <p className="eyebrow">Markets</p>
        <h2>Coverage organised by asset class, cycle, and sector dynamics.</h2>
      </div>

      <div ref={wrapperRef} className="markets-atlas">
      <aside className="markets-rail" aria-hidden="true">
        <div className="markets-rail-head">
          <span className="eyebrow">Coverage Atlas</span>
          <p className="markets-rail-lede">
            Four asset classes. One taxonomy. Scroll to explore how we organise the
            market — by where capital flows, where households live, and where the
            cycle is turning.
          </p>
        </div>
        <ol className="markets-rail-progress">
          {normalised.map((col, i) => (
            <li
              key={col.heading}
              className={i === activeIndex ? 'is-active' : ''}
            >
              <span className="markets-rail-num">{`0${i + 1}`}</span>
              <span className="markets-rail-label">{col.heading}</span>
            </li>
          ))}
        </ol>
        <p className="markets-rail-foot">
          <span aria-hidden="true">→</span> Scroll to advance chapters
        </p>
      </aside>

      <div className="markets-track-viewport">
        <div ref={trackRef} className="markets-track">
          {normalised.map((col, i) => (
            <article
              key={col.heading}
              className={`market-chapter${i === activeIndex ? ' is-active' : ''}`}
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
                          →
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
                    View coverage <span aria-hidden="true">→</span>
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
