interface Story {
  category: string
  image: string
  title: string
  meta: string
  summary: string
}

interface StoryListProps {
  stories: Story[]
}

export function StoryList({ stories }: StoryListProps) {
  return (
    <div className="story-list">
      {stories.map((story, index) => (
        <article key={story.title} className="story-card">
          <span className="story-rank">{`${index + 1}`.padStart(2, '0')}</span>
          <div
            className="story-image latest-image"
            style={{ backgroundImage: `url(${story.image})` }}
            aria-hidden="true"
          />
          <div className="story-body">
            <p className="story-category">{story.category}</p>
            <h3>{story.title}</h3>
            <span className="story-meta">{story.meta}</span>
            <p>{story.summary}</p>
            <a href="#" className="story-read-more">
              Continue reading <span>→</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}
