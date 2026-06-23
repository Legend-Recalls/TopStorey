import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { propertyDataset, Property } from './Cities'

const categories = [
  { key: 'all', label: 'All' },
  { key: 'luxury', label: 'Luxury' },
  { key: 'highyield', label: 'High Yield' },
  { key: 'new', label: 'New' },
]

function getFilteredProperties(category: string): Property[] {
  switch (category) {
    case 'luxury':
      return propertyDataset.filter((p) => p.priceValue >= 500)
    case 'highyield':
      return propertyDataset.filter((p) => parseFloat(p.yield) >= 8)
    case 'new':
      return propertyDataset.filter((p) => p.purpose === 'new launches')
    default:
      return propertyDataset
  }
}

function PropertyCard({ property }: { property: Property }) {
  const navigate = useNavigate()

  return (
    <div
      className="rec-card"
      onClick={() => navigate(`/properties/${property.id}`)}
    >
      <div className="rec-card__image-wrap">
        <img src={property.image} alt={property.title} className="rec-card__image" />
        <div className="rec-card__badge">{property.type}</div>
        {property.purpose === 'new launches' && (
          <div className="rec-card__new-badge">New</div>
        )}
      </div>
      <div className="rec-card__content">
        <div className="rec-card__location">
          <span className="rec-card__locality">{property.locality}</span>
          <span className="rec-card__sep">,</span>
          <span className="rec-card__city">{property.city}</span>
        </div>
        <h4 className="rec-card__title">{property.title}</h4>
        <div className="rec-card__metrics">
          <span className="rec-card__metric">{property.score.split(' ')[0]}</span>
          <span className="rec-card__metric-sep">/</span>
          <span className="rec-card__metric rec-card__metric--green">{property.trend}</span>
          <span className="rec-card__metric-sep">/</span>
          <span className="rec-card__metric">{property.price}</span>
        </div>
      </div>
    </div>
  )
}

export function RecommendedProperties() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('all')
  const properties = getFilteredProperties(activeCategory)
  const heroProperty = properties[0]
  const gridProperties = properties.slice(1, 7)

  return (
    <div className="recommended-properties-module">
      {/* Top Bar: Heading + Tabs + Stats */}
      <div className="rec-top-bar">
        <div className="rec-top-left">
          <p className="eyebrow">Properties</p>
          <h2 className="rec-heading">Curated investments backed by editorial insight.</h2>
        </div>
        <div className="rec-top-right">
          <div className="rec-tabs">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`rec-tab ${activeCategory === cat.key ? 'rec-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="rec-stats">
            <span className="rec-stat">{properties.length} Properties</span>
            <span className="rec-stat-sep">|</span>
            <span className="rec-stat">8 Cities</span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="rec-layout">
        {/* Hero Property */}
        {heroProperty && (
          <div
            className="rec-hero"
            onClick={() => navigate(`/properties/${heroProperty.id}`)}
          >
            <div className="rec-hero__image-wrap">
              <img src={heroProperty.image} alt={heroProperty.title} className="rec-hero__image" />
              <div className="rec-hero__overlay" />
              <div className="rec-hero__badge">{heroProperty.type}</div>
              {heroProperty.purpose === 'new launches' && (
                <div className="rec-hero__new-badge">New Launch</div>
              )}
              <div className="rec-hero__price">{heroProperty.price}</div>
            </div>
            <div className="rec-hero__content">
              <div className="rec-hero__location">
                <span>{heroProperty.locality}</span>
                <span className="rec-hero__sep">,</span>
                <span className="rec-hero__city">{heroProperty.city}</span>
              </div>
              <h3 className="rec-hero__title">{heroProperty.title}</h3>
              <p className="rec-hero__desc">{heroProperty.description}</p>
              <div className="rec-hero__metrics">
                <div className="rec-hero__metric">
                  <span className="rec-hero__metric-label">Score</span>
                  <span className="rec-hero__metric-value">{heroProperty.score.split(' ')[0]}</span>
                </div>
                <div className="rec-hero__metric">
                  <span className="rec-hero__metric-label">YoY</span>
                  <span className="rec-hero__metric-value rec-hero__metric-value--green">{heroProperty.trend}</span>
                </div>
                <div className="rec-hero__metric">
                  <span className="rec-hero__metric-label">Yield</span>
                  <span className="rec-hero__metric-value">{heroProperty.yield.split(' ')[0]}</span>
                </div>
              </div>
              <button className="rec-hero__cta">
                View Details
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Grid Properties */}
        <div className="rec-grid">
          {gridProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rec-bottom-cta">
        <span className="rec-bottom-cta__text">
          Get a personalized investment briefing from our analysts
        </span>
        <button className="rec-bottom-cta__btn">
          Request Briefing
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
