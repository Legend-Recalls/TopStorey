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
  return (
    <section className="featured-trending-section snap-section" id="featured">
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
            <div className="trending-track">
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
