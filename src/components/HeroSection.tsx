import { Link } from 'react-router-dom'
import { storyPath } from '../data/storyCatalog'

interface HeroStory {
  title: string
  image: string
  category: string
  summary?: string
  slug?: string
}

export interface HeroSectionProps {
  stories: HeroStory[]
}

const getInitialRole = (index: number) => {
  if (index === 0) return 'is-lead'
  if (index === 1) return 'is-side-1'
  if (index === 2) return 'is-side-2'
  return 'is-offstage'
}

export function HeroSection({ stories }: HeroSectionProps) {
  return (
    <div className="top-news-band">
      <div className="hero-grid newsroom-hero hero-rotation-stage">
        {stories.map((story, index) => (
          <HeroStoryCard
            key={`${story.category}-${story.title}`}
            story={story}
            index={index}
            initialRole={getInitialRole(index)}
          />
        ))}
      </div>
    </div>
  )
}

interface HeroStoryCardProps {
  story: HeroStory
  index: number
  initialRole: string
}

function HeroStoryCard({ story, index, initialRole }: HeroStoryCardProps) {
  const href = story.slug ? storyPath(story.slug) : '#'

  return (
    <Link
      to={href}
      className={`hero-rotation-card ${initialRole} ${index === 0 ? 'lead-story-card' : 'side-story-card'}`}
      data-hero-card
      data-index={index}
      aria-label={`Read ${story.title}`}
    >
      <div
        className="story-media-layer"
        style={{ backgroundImage: `url(${story.image})` }}
        aria-hidden="true"
      />
      <div className="top-story-copy">
        <span className="top-story-kicker">{story.category}</span>
        <h2 className="hero-rotation-title">{story.title}</h2>
        {story.summary && <p className="lead-summary">{story.summary}</p>}
        {story.summary && (
          <span className="read-full-link">
            Read the full analysis &rarr;
          </span>
        )}
      </div>
    </Link>
  )
}
