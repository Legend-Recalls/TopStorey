import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Footer, Masthead } from '../components'
import { getRelatedStories, getStoryBySlug, storyPath } from '../data/storyCatalog'
import { getImageShape } from '../utils/imageShape'

function StoryLeadImage({ image }) {
  const [shape, setShape] = useState('unknown')

  if (!image) {
    return null
  }

  return (
    <figure className={`story-lead-image is-${shape}`} data-image-shape={shape}>
      <img
        src={image}
        alt=""
        onLoad={(event) => {
          setShape(getImageShape(event.currentTarget.naturalWidth, event.currentTarget.naturalHeight))
        }}
      />
    </figure>
  )
}

function StoryNotFound({ navItems, footerSections }) {
  return (
    <div className="story-page-shell">
      <Masthead navItems={navItems} />
      <main className="story-reader story-reader-empty">
        <section className="story-empty-state">
          <p className="story-section-label">Story archive</p>
          <h1>That story is not in the edition.</h1>
          <p>
            The article may have moved, or the link may be using an older slug.
          </p>
          <Link to="/" className="story-back-link">
            Back to front page
          </Link>
        </section>
      </main>
      <Footer sections={footerSections} />
    </div>
  )
}

export function StoryPage({ navItems, footerSections }) {
  const { slug } = useParams()
  const story = getStoryBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!story) {
    return <StoryNotFound navItems={navItems} footerSections={footerSections} />
  }

  const relatedStories = getRelatedStories(story.slug, 3)

  return (
    <div className="story-page-shell">
      <Masthead navItems={navItems} />

      <main className="story-reader">
        <article className="story-paper">
          <header className="story-headline-block">
            <div className="story-headline-rail">
              <p className="story-section-label">{story.category}</p>
              <p className="story-taxonomy-inline">{story.taxonomy.join(' / ')}</p>
              <div className="story-byline-row">
                <span>{story.publishedLabel}</span>
                <span>
                  By {story.byline.name}, {story.byline.role}
                </span>
                <span>{story.readTime}</span>
                <span>{story.views}</span>
              </div>
            </div>
            <div className="story-opener">
              <div className="story-headline-main">
                <h1>{story.title}</h1>
                <p className="story-deck">{story.deck}</p>
              </div>
              <StoryLeadImage image={story.image} />
            </div>
          </header>

          <div className="story-layout">
            <aside className="story-sidebar story-sidebar-left" aria-label="Key facts">
              <p className="story-sidebar-title">Key Facts</p>
              <dl className="story-fact-list">
                {story.keyFacts.map((fact) => (
                  <div key={fact.label} className="story-fact-row">
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>

            <div className="story-prose" aria-label="Article body">
              {story.sections.map((section) => (
                <section key={section.heading} className="story-copy-section">
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>

            <aside className="story-sidebar story-sidebar-right" aria-label="More context">
              <figure className="story-pullquote">
                <blockquote>{story.pullQuote.quote}</blockquote>
                <figcaption>{story.pullQuote.attribution}</figcaption>
              </figure>

              <div className="story-related">
                <p className="story-sidebar-title">Related Reads</p>
                <div className="story-related-list">
                  {relatedStories.map((related) => (
                    <Link key={related.slug} to={storyPath(related.slug)}>
                      <span>{related.category}</span>
                      <strong>{related.title}</strong>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>

      <Footer sections={footerSections} />
    </div>
  )
}
