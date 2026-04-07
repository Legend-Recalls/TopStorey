interface LeadStoryData {
  title: string
  image: string
  category: string
  summary?: string
}

interface SideStoryData {
  title: string
  image: string
  category: string
}

export interface HeroSectionProps {
  leadStory: LeadStoryData
  sideStories?: SideStoryData[]
}

export function HeroSection({ leadStory, sideStories = [] }: HeroSectionProps) {
  return (
    <div className="top-news-band">
      <div className="hero-grid newsroom-hero">
        <LeadStory {...leadStory} />
        {sideStories.length > 0 && (
          <div className="side-story-panel">
            {sideStories.map((story, i) => (
              <SideStory key={i} {...story} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function LeadStory({ title, image, category }: LeadStoryData) {
  return (
    <article
      className="lead-story-card"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="top-story-copy">
        <span className="top-story-kicker">{category}</span>
        <h1>{title}</h1>
      </div>
    </article>
  )
}

export function SideStory({ title, image, category }: SideStoryData) {
  return (
    <article
      className="side-story-card"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="top-story-copy">
        <span className="top-story-kicker">Top Story</span>
        <h2>{title}</h2>
      </div>
    </article>
  )
}
