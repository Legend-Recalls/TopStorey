# TopStorey Frontend Supabase Integration Guide

This document explains how to connect your main frontend website (`topstorey`) directly to your hosted **Supabase** backend. By following this guide, you will transition the site from static boilerplate objects (`featuredStories`, `leadStory`, `sideLeadStories`, etc.) into dynamic, live components populated directly from the database.

---

## 1. Setup & Dependencies

Navigate to your main frontend project directory (`topstorey`) and install the official Supabase JS SDK:

```bash
npm install @supabase/supabase-js --save
```

---

## 2. Environment Configuration

Create a file named `.env` in the root of your `topstorey` project:

```env
VITE_SUPABASE_URL=https://ajaeypdcetnwldaekaxd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYWV5cGRjZXRud2xkYWVrYXhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNzU4MjYsImV4cCI6MjA5NDg1MTgyNn0.puzpl6Xntg7BgR2HDTQc43NJXBfDaSpni9E1g1qX_PY
```

Make sure to add `.env` to your `topstorey/.gitignore` file so that your credentials are not public.

---

## 3. Initialize Supabase Client

Create a new file at `src/services/supabaseClient.js` (or `.ts` if using TypeScript):

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

## 4. Database Schema

The `public.stories` table contains the following columns:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Auto-generated primary key |
| `title` | TEXT | Story headline |
| `category` | TEXT | e.g. `Markets`, `Cities \| Mumbai Metropolitan Region` |
| `cover_image` | TEXT | URL to cover photo |
| `body` | TEXT | Full HTML article body (TipTap output with `<h2>`, `<p>`) |
| `summary` | TEXT | One-line standfirst for cards |
| `read_time_minutes` | INTEGER | Estimated reading time |
| `views` | INTEGER | View counter |
| `is_featured` | BOOLEAN | Pin to Featured carousel |
| `is_most_read` | BOOLEAN | Pin to Trending section |
| `hero_placement` | TEXT | `none`, `lead`, or `side` |
| `status` | TEXT | `draft` or `published` |
| `published_at` | TIMESTAMPTZ | Publication timestamp |
| `deck` | TEXT | Longer subtitle / standfirst below headline |
| `byline` | JSONB | `{ "name": "Aarav Menon", "role": "Markets Editor" }` |
| `pull_quote` | JSONB | `{ "quote": "...", "attribution": "..." }` |
| `key_facts` | JSONB | `[{ "label": "Signal", "value": "Execution discipline" }]` |
| `taxonomy` | JSONB | `["Markets", "Residential", "Capital"]` |
| `sections` | JSONB | `[{ "heading": "...", "paragraphs": ["...", "..."] }]` |

---

## 5. Frontend API Client (`src/services/storiesApi.js`)

Create a clean client wrapper at `src/services/storiesApi.js`:

```javascript
import { supabase } from './supabaseClient'

/**
 * Maps database schema (snake_case) to React props (camelCase)
 */
const mapFromDatabase = (row) => {
  if (!row) return null
  return {
    id: row.id,
    slug: row.id, // use ID as slug for routing
    title: row.title,
    category: row.category,
    image: row.cover_image,
    coverImage: row.cover_image,
    body: row.body,
    summary: row.summary,
    readTimeMinutes: row.read_time_minutes,
    readTime: `${row.read_time_minutes} min read`,
    views: row.views,
    isFeatured: row.is_featured,
    isMostRead: row.is_most_read,
    heroPlacement: row.hero_placement,
    status: row.status,
    publishedAt: row.published_at,
    publishedLabel: new Date(row.published_at).toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    }),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    // Rich editorial fields
    deck: row.deck || '',
    byline: row.byline || { name: 'Top Storey Newsroom', role: 'Market Desk' },
    pullQuote: row.pull_quote || { quote: '', attribution: '' },
    keyFacts: row.key_facts || [],
    taxonomy: row.taxonomy || [],
    sections: row.sections || [],
    // Formatted meta string for cards
    meta: `${(row.views / 1000).toFixed(0)}K views · ${row.read_time_minutes} min read`,
  }
}

export const storiesApi = {
  /**
   * Fetch all published stories with support for filtering by placement
   */
  async getPublishedStories(filters = {}) {
    let query = supabase
      .from('stories')
      .select('*')
      .eq('status', 'published') // ONLY show published content to visitors!

    if (filters.heroPlacement) {
      query = query.eq('hero_placement', filters.heroPlacement)
    }
    if (filters.isFeatured !== undefined) {
      query = query.eq('is_featured', filters.isFeatured)
    }
    if (filters.isMostRead !== undefined) {
      query = query.eq('is_most_read', filters.isMostRead)
    }
    if (filters.category) {
      query = query.eq('category', filters.category)
    }

    // Newest published stories first
    query = query.order('published_at', { ascending: false })

    const { data, error } = await query
    if (error) throw new Error(error.message)
    return (data || []).map(mapFromDatabase)
  },

  /**
   * Fetch a single story by ID (for detailed article page)
   */
  async getStoryById(id) {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw new Error(error.message)
    return mapFromDatabase(data)
  },

  /**
   * Atomically increment view count by 1 in the database when read
   */
  async incrementViews(id) {
    const { error } = await supabase.rpc('increment_views', { story_id: id })
    if (error) {
      console.error(`Failed to increment views for story ${id}:`, error)
    }
  },
}
```

---

## 6. Wiring into your Homepage (`src/App.jsx`)

Replace your static variables with state hooks:

```jsx
import { useState, useEffect } from 'react'
import { storiesApi } from './services/storiesApi'

export default function App() {
  const [leadStory, setLeadStory] = useState(null)
  const [sideStories, setSideStories] = useState([])
  const [featuredStories, setFeaturedStories] = useState([])
  const [latestStories, setLatestStories] = useState([])
  const [tickerItems, setTickerItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)

        // 1. Fetch Lead Hero Story (hero_placement = 'lead')
        const leads = await storiesApi.getPublishedStories({ heroPlacement: 'lead' })
        setLeadStory(leads[0] || null)

        // 2. Fetch Side Hero Stories (hero_placement = 'side', limit 2)
        const sides = await storiesApi.getPublishedStories({ heroPlacement: 'side' })
        setSideStories(sides.slice(0, 2))

        // 3. Fetch Featured Stories (is_featured = true)
        const featured = await storiesApi.getPublishedStories({ isFeatured: true })
        setFeaturedStories(featured)

        // 4. Fetch all published for Latest section
        const all = await storiesApi.getPublishedStories()
        setLatestStories(all)

        // 5. Generate News Ticker from titles
        const titles = all.slice(0, 5).map(s => `${s.category}: ${s.title}`)
        setTickerItems(titles.length > 0 ? titles : [
          'Top Storey: Real estate intelligence platform. Pinned data feeds active.'
        ])

      } catch (error) {
        console.error("Error loading live stories:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // ... render components with leadStory, sideStories, featuredStories, latestStories, tickerItems
}
```

---

## 7. Story Detail Page (`StoryPage.jsx`)

The `StoryPage` component renders a full article. The database now stores all the fields the page needs:

```jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { storiesApi } from '../services/storiesApi'

export function StoryPage() {
  const { id } = useParams()
  const [story, setStory] = useState(null)

  useEffect(() => {
    storiesApi.getStoryById(id).then(setStory)
  }, [id])

  useEffect(() => {
    if (story?.id) storiesApi.incrementViews(story.id)
  }, [story?.id])

  if (!story) return null

  return (
    <article className="story-paper">
      <header className="story-headline-block">
        <p className="story-section-label">{story.category}</p>
        <p className="story-taxonomy-inline">{story.taxonomy.join(' / ')}</p>
        <div className="story-byline-row">
          <span>{story.publishedLabel}</span>
          <span>By {story.byline.name}, {story.byline.role}</span>
          <span>{story.readTime}</span>
        </div>
        <h1>{story.title}</h1>
        <p className="story-deck">{story.deck}</p>
        {story.coverImage && <img src={story.coverImage} alt="" />}
      </header>

      <div className="story-layout">
        {/* Left sidebar: Key Facts */}
        <aside className="story-sidebar story-sidebar-left">
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

        {/* Main prose body: structured sections */}
        <div className="story-prose">
          {story.sections.map((section) => (
            <section key={section.heading} className="story-copy-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        {/* Right sidebar: Pull Quote */}
        <aside className="story-sidebar story-sidebar-right">
          <figure className="story-pullquote">
            <blockquote>{story.pullQuote.quote}</blockquote>
            <figcaption>{story.pullQuote.attribution}</figcaption>
          </figure>
        </aside>
      </div>
    </article>
  )
}
```

---

## 8. Routing (slug → ID)

Since the database uses UUIDs as IDs, update your router to use IDs instead of slugs:

```jsx
// In App.jsx routes
<Route path="/stories/:id" element={<StoryPage />} />
```

When linking to a story from cards:

```jsx
<Link to={`/stories/${story.id}`}>{story.title}</Link>
```

---

## 9. Field Mapping Reference

This table shows how each database column maps to the frontend component props:

| Database Column | Frontend Prop | Used By |
|-----------------|---------------|---------|
| `title` | `title` | Cards, Hero, StoryPage headline |
| `category` | `category` | Section labels, ticker |
| `cover_image` | `image` / `coverImage` | Cards, Hero, StoryPage lead image |
| `summary` | `summary` | Cards, Hero subtitle |
| `deck` | `deck` | StoryPage standfirst below headline |
| `byline` | `byline.name`, `byline.role` | StoryPage byline row |
| `pull_quote` | `pullQuote.quote`, `.attribution` | StoryPage right sidebar |
| `key_facts` | `keyFacts[].label`, `.value` | StoryPage left sidebar |
| `taxonomy` | `taxonomy[]` | StoryPage taxonomy inline |
| `sections` | `sections[].heading`, `.paragraphs[]` | StoryPage prose body |
| `hero_placement` | `heroPlacement` | Homepage hero layout (`lead` / `side` / `none`) |
| `is_featured` | `isFeatured` | Featured carousel |
| `is_most_read` | `isMostRead` | Trending section |
| `read_time_minutes` | `readTime` | Cards meta, StoryPage |
| `views` | `views` | Cards meta, StoryPage |
