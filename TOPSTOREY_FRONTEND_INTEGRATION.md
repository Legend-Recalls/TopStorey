# TopStorey Frontend Supabase Integration Guide

This document explains how to connect your main frontend website (`topstorey`) directly to your hosted **Supabase** backend. By following this guide, you will transition the site from static boilerplate objects (`featuredStories`, `leadStory`, `sideLeadStories`, etc.) into dynamic, live components populated directly from the database.

---

## 1. Setup & Dependencies

First, navigate to your main frontend project directory (`topstorey`) in your terminal and install the official Supabase JS SDK:

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

## 4. Frontend API Client (`src/services/storiesApi.js`)

Create a clean client wrapper at `src/services/storiesApi.js` to manage all querying, category filters, sorting, and atomic view-incrementing logic:

```javascript
import { supabase } from './supabaseClient'

/**
 * Maps database schema (snake_case) to React props (camelCase)
 */
const mapFromDatabase = (row) => {
  if (!row) return null
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    coverImage: row.cover_image,
    body: row.body,
    summary: row.summary,
    readTimeMinutes: row.read_time_minutes,
    views: row.views,
    isFeatured: row.is_featured,
    isMostRead: row.is_most_read,
    heroPlacement: row.hero_placement,
    status: row.status,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
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

## 5. Wiring into your Homepage (`src/App.jsx`)

Here is an elegant example showing how to replace your static variables with state hooks inside `src/App.jsx`:

```jsx
import { useState, useEffect } from 'react'
import { storiesApi } from './services/storiesApi'

export default function App() {
  const [leadStory, setLeadStory] = useState(null)
  const [sideStories, setSideStories] = useState([])
  const [featuredStories, setFeaturedStories] = useState([])
  const [mostReadStories, setMostReadStories] = useState([])
  const [tickerItems, setTickerItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)

        // 1. Fetch Lead Hero Story
        const leads = await storiesApi.getPublishedStories({ heroPlacement: 'lead' })
        setLeadStory(leads[0] || null)

        // 2. Fetch Side Hero Stories (Limit to 2)
        const sides = await storiesApi.getPublishedStories({ heroPlacement: 'side' })
        setSideStories(sides.slice(0, 2))

        // 3. Fetch Pinned Featured Stories
        const featured = await storiesApi.getPublishedStories({ isFeatured: true })
        setFeaturedStories(featured)

        // 4. Fetch Trending / Most Read Stories
        const trending = await storiesApi.getPublishedStories({ isMostRead: true })
        setMostReadStories(trending)

        // 5. Generate Dynamic News Ticker from titles
        const allStories = await storiesApi.getPublishedStories()
        const titles = allStories.slice(0, 5).map(s => `${s.category}: ${s.title}`)
        setTickerItems(titles.length > 0 ? titles : [
          'Top Storey: Real estate intelligence platform. Pinned data feeds active.'
        ])

      } catch (error) {
        console.error("Error loading live stories from database:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="loading-screen" style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
        background: '#09090b', color: '#f4f4f5', fontFamily: 'sans-serif'
      }}>
        <p style={{ letterSpacing: '0.1em', fontSize: '1rem', textTransform: 'uppercase' }}>
          Loading Intelligence...
        </p>
      </div>
    )
  }

  // Render components below, passing leadStory, sideStories, featuredStories, mostReadStories, tickerItems...
}
```

---

## 6. Rendering Article Body Content (TipTap HTML)

Since the administrator panel creates articles using the high-end **TipTap** editor, the body of the article is saved as pure HTML strings (e.g. `<p>Hello</p>`).

To render this markup cleanly in your detailed article view component, use React's built-in `dangerouslySetInnerHTML`:

```jsx
import React, { useEffect } from 'react'
import { storiesApi } from '../../services/storiesApi'

export function ArticleViewer({ article }) {
  
  // Track that a user opened the page to read this article
  useEffect(() => {
    if (article?.id) {
      storiesApi.incrementViews(article.id)
    }
  }, [article?.id])

  if (!article) return null

  return (
    <article className="article-container">
      <header className="article-header">
        <span className="category-badge">{article.category}</span>
        <h1>{article.title}</h1>
        <div className="meta">
          <span>{article.readTimeMinutes} min read</span> · <span>{article.views} views</span>
        </div>
      </header>

      {article.coverImage && (
        <img className="cover" src={article.coverImage} alt={article.title} />
      )}

      {/* Render the TipTap styled HTML safely */}
      <div 
        className="article-body prose"
        dangerouslySetInnerHTML={{ __html: article.body }} 
      />
    </article>
  )
}
```

### Styling TipTap Prose
To ensure headings, blockquotes, code blocks, lists, and spacing look stunning, define clean styling rules in your `index.css` matching TipTap's output layout:

```css
.article-body.prose {
  line-height: 1.75;
  color: #a1a1aa;
}

.article-body.prose h1, 
.article-body.prose h2, 
.article-body.prose h3 {
  color: #fafafa;
  font-weight: 700;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.article-body.prose p {
  margin-bottom: 1.25em;
}

.article-body.prose blockquote {
  border-left: 3px solid #fafafa;
  padding-left: 1rem;
  margin-left: 0;
  font-style: italic;
  color: #d4d4d8;
}

.article-body.prose ul, 
.article-body.prose ol {
  padding-left: 1.5rem;
  margin-bottom: 1.25em;
}
```
