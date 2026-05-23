import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Story {
  category: string
  image: string
  title: string
  meta: string
  summary: string
}

interface TrendingItem {
  label: string
  title: string
  meta: string
}

interface FeaturedTrendingProps {
  featured: Story[]
  trending: TrendingItem[]
}

export function FeaturedTrendingSection({ featured, trending }: FeaturedTrendingProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const section = sectionRef.current
      const track = trackRef.current

      if (!section || !track) return

      // Distance the track must travel horizontally.
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth
        const containerWidth = track.parentElement?.clientWidth || window.innerWidth
        return -(trackWidth - containerWidth)
      }

      // Dwell at start/end (in px of vertical scroll) so the first and
      // last cards have time on stage before/after the horizontal scrub.
      const getDwell = () => Math.round(window.innerHeight * 0.5)

      // Single tween, but the pinned range is padded with dwell distance
      // before and after. A custom onUpdate maps the overall progress so
      // x stays at 0 during the leading dwell, scrubs through the middle,
      // then holds at the end position during the trailing dwell.
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
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: recalc,
        onUpdate: (self) => {
          const px = self.progress * state.total
          let x = 0
          if (px <= state.dwell) {
            x = 0
          } else if (px >= state.dwell + state.scroll) {
            x = -state.scroll
          } else {
            x = -(px - state.dwell)
          }
          gsap.set(track, { x })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [trending])

  return (
    <section ref={sectionRef} className="featured-trending-section snap-section" id="featured">
      <div className="featured-trending-grid">
        {/* Left: Featured Stories (Static while pinned) */}
        <div className="featured-column">
          <div className="section-heading reveal-item">
            <p className="eyebrow">Featured</p>
            <h2>The most important stories and market updates.</h2>
          </div>
          <div className="featured-list">
            {featured.map((story, index) => (
              <article key={story.title} className="story-card reveal-item">
                <span className="story-rank">{`${index + 1}`.padStart(2, '0')}</span>
                <div
                  className="story-image"
                  style={{ backgroundImage: `url(${story.image})` }}
                  aria-hidden="true"
                />
                <div className="story-body">
                  <p className="story-category">{story.category}</p>
                  <h3>{story.title}</h3>
                  <span className="story-meta">{story.meta}</span>
                  <p>{story.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right: Trending News (Scrolls horizontally via GSAP) */}
        <div className="trending-column">
          <div className="trending-header reveal-item">
            <span className="eyebrow">Trending Now</span>
          </div>
          <div className="trending-track-wrapper">
            <div ref={trackRef} className="trending-track">
              {trending.map((item, index) => (
                <article key={item.title} className="trending-card">
                  <div className="trending-rank-bar">
                    <span className="trending-rank">{`${index + 1}`.padStart(2, '0')}</span>
                    <span className="trending-label">{item.label}</span>
                  </div>
                  <p className="trending-title">{item.title}</p>
                  <span className="trending-meta">{item.meta}</span>
                </article>
              ))}
              {/* Duplicated for horizontal scroll length */}
              {trending.map((item, index) => (
                <article key={item.title + '-dup'} className="trending-card">
                  <div className="trending-rank-bar">
                    <span className="trending-rank">{`${index + 4}`.padStart(2, '0')}</span>
                    <span className="trending-label">{item.label}</span>
                  </div>
                  <p className="trending-title">{item.title}</p>
                  <span className="trending-meta">{item.meta}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
