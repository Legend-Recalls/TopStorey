import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { propertyDataset, Property } from './Cities'
import { recommendedApi } from '../services/recommendedApi'

type PageType = 'property' | 'story' | 'event'

interface RecommendedConfig {
  pinnedPropertyIds: string[]
  enabledPropertyPage: boolean
  enabledStoryPage: boolean
  enabledEventPage: boolean
}

interface RecommendedPropertiesRailProps {
  pageType: PageType
  /** On property pages, pass the current id so it is never recommended to itself. */
  currentPropertyId?: string
  /** Optional heading override; defaults to an editorial label per page type. */
  heading?: string
}

const MAX_ITEMS = 10

const DEFAULT_HEADINGS: Record<PageType, string> = {
  property: 'More Investment Opportunities',
  story: 'Properties to Watch',
  event: 'Featured Properties',
}

function isPageEnabled(config: RecommendedConfig, pageType: PageType): boolean {
  switch (pageType) {
    case 'property':
      return config.enabledPropertyPage
    case 'story':
      return config.enabledStoryPage
    case 'event':
      return config.enabledEventPage
    default:
      return true
  }
}

function RailCard({ property }: { property: Property }) {
  const navigate = useNavigate()
  const scoreNum = property.score.split(' ')[0]

  return (
    <article
      className="rec-rail-card"
      onClick={() => navigate(`/properties/${property.id}`)}
    >
      <div className="rec-rail-card__media">
        <img src={property.image} alt={property.title} loading="lazy" />
        <span className="rec-rail-card__type">{property.type}</span>
        {property.purpose === 'new launches' && (
          <span className="rec-rail-card__new">New</span>
        )}
      </div>
      <div className="rec-rail-card__body">
        <p className="rec-rail-card__location">
          {property.locality}, <span className="rec-rail-card__city">{property.city}</span>
        </p>
        <h4 className="rec-rail-card__title">{property.title}</h4>
        <div className="rec-rail-card__metrics">
          <span>{scoreNum}</span>
          <span className="rec-rail-card__dot" aria-hidden="true" />
          <span className="rec-rail-card__trend">{property.trend}</span>
        </div>
        <div className="rec-rail-card__foot">
          <span className="rec-rail-card__price">{property.price}</span>
          <span className="rec-rail-card__cta">View</span>
        </div>
      </div>
    </article>
  )
}

export function RecommendedPropertiesRail({
  pageType,
  currentPropertyId,
  heading,
}: RecommendedPropertiesRailProps) {
  const [config, setConfig] = useState<RecommendedConfig | null>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    let active = true
    recommendedApi
      .getConfig()
      .then((c) => {
        if (active) setConfig(c)
      })
      .catch(() => {
        // Fail-safe: never break a page because the config fetch failed.
        if (active) {
          setConfig({
            pinnedPropertyIds: [],
            enabledPropertyPage: true,
            enabledStoryPage: true,
            enabledEventPage: true,
          })
        }
      })
    return () => {
      active = false
    }
  }, [])

  // Build the ordered list: pinned first (admin order), then auto-fill the
  // remaining static pool, always excluding the current property.
  const items = useMemo<Property[]>(() => {
    if (!config) return []
    const excludeId = currentPropertyId

    const byId = new Map(propertyDataset.map((p) => [p.id, p]))
    const pinned = config.pinnedPropertyIds
      .map((id) => byId.get(id))
      .filter((p): p is Property => Boolean(p) && p.id !== excludeId)

    const shown = new Set(pinned.map((p) => p.id))
    if (excludeId) shown.add(excludeId)

    const fillers = propertyDataset.filter((p) => {
      if (shown.has(p.id)) return false
      shown.add(p.id)
      return true
    })

    return [...pinned, ...fillers].slice(0, MAX_ITEMS)
  }, [config, currentPropertyId])

  // Track horizontal scroll position to show/hide arrow controls.
  const updateScrollState = () => {
    const el = scrollerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    updateScrollState()
    const el = scrollerRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [items.length])

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: 'smooth' })
  }

  // Loading: render the section shell so layout doesn't jump.
  if (!config) {
    return (
      <section className="rec-rail rec-rail--loading" aria-busy="true">
        <header className="rec-rail__head">
          <p className="rec-rail__eyebrow">Properties</p>
          <h2 className="rec-rail__heading">{heading || DEFAULT_HEADINGS[pageType]}</h2>
        </header>
        <div className="rec-rail__scroller rec-rail__scroller--skeleton" />
      </section>
    )
  }

  // Per-page enable gate. If disabled for this page type, show nothing.
  if (!isPageEnabled(config, pageType)) return null

  return (
    <section className="rec-rail">
      <header className="rec-rail__head">
        <div className="rec-rail__head-left">
          <p className="rec-rail__eyebrow">Properties</p>
          <h2 className="rec-rail__heading">{heading || DEFAULT_HEADINGS[pageType]}</h2>
        </div>
        {items.length > 0 && (
          <div className="rec-rail__nav">
            <span className="rec-rail__count">{items.length} listings</span>
            <button
              type="button"
              className="rec-rail__arrow"
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="rec-rail__arrow"
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </header>

      <div className="rec-rail__viewport">
        <div className="rec-rail__scroller" ref={scrollerRef}>
          {items.length === 0 ? (
            <p className="rec-rail__empty">No recommended properties available.</p>
          ) : (
            items.map((p) => <RailCard key={p.id} property={p} />)
          )}
        </div>
      </div>
    </section>
  )
}

export default RecommendedPropertiesRail
