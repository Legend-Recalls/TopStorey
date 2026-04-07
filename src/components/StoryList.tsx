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
          <div
            className="story-image latest-image"
            style={{ backgroundImage: `linear-gradient(180deg, rgba(23, 21, 18, 0.08), rgba(23, 21, 18, 0.28)), url(${story.image})` }}
            aria-hidden="true"
          />
          <span className="story-rank">{`${index + 1}`.padStart(2, '0')}</span>
          <div className="story-body">
            <p className="story-category">{story.category}</p>
            <h3>{story.title}</h3>
            <p className="story-meta">{story.meta}</p>
            <p>{story.summary}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
