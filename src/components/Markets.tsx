import { useLayoutEffect, useRef, type CSSProperties } from 'react'
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
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const activeIndexRef = useRef(0)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const progressBar = progressRef.current
    if (!section || !track || !progressBar) return

    const updateActiveIndex = (idx: number, force = false) => {
      if (!force && activeIndexRef.current === idx) return
      activeIndexRef.current = idx

      section.querySelectorAll('.markets-rail-progress li').forEach((item, i) => {
        item.classList.toggle('is-active', i === idx)
      })

      track.querySelectorAll('.market-chapter').forEach((chapter, i) => {
        chapter.classList.toggle('is-active', i === idx)
      })

      progressBar.querySelectorAll('.markets-scrollbar-segment').forEach((segment, i) => {
        segment.classList.toggle('is-active', i === idx)
      })
    }

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value))

    const getScrollDistance = () => {
      const viewport = track.parentElement
      const viewportWidth = viewport?.clientWidth ?? window.innerWidth
      return Math.max(0, track.scrollWidth - viewportWidth)
    }

    const getScrollLength = () => {
      const portion = clamp(window.innerHeight * 0.72, 420, 680)
      return Math.max(portion * columns.length, getScrollDistance())
    }

    const mm = gsap.matchMedia()

    mm.add('(min-width: 900px)', () => {
      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollLength()}`,
          pin: true,
          pinType: 'fixed',
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = clamp(self.progress, 0, 1)
            progressBar.style.setProperty('--markets-progress', progress.toString())

            const idx = Math.min(
              columns.length - 1,
              Math.floor(progress * columns.length),
            )
            updateActiveIndex(idx)
          },
          onRefresh: () => {
            progressBar.style.setProperty('--markets-progress', '0')
            updateActiveIndex(0, true)
          },
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
        gsap.set(track, { clearProps: 'transform' })
        progressBar.style.setProperty('--markets-progress', '0')
        updateActiveIndex(0, true)
      }
    })

    mm.add('(max-width: 899px)', () => {
      gsap.set(track, { clearProps: 'transform' })
      progressBar.style.setProperty('--markets-progress', '0')
      updateActiveIndex(0, true)
    })

    return () => mm.revert()
  }, [columns])

  const normalised = columns.map((c) => ({ ...c, items: normalise(c.items) }))

  return (
    <section ref={sectionRef} className="markets-section snap-section" id="markets">
      <div className="markets-section-heading reveal-item">
        <p className="eyebrow">Markets</p>
        <h2>Coverage organised by asset class, cycle, and sector dynamics.</h2>
      </div>

      <div
        ref={progressRef}
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
          <div ref={trackRef} className="markets-track">
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
