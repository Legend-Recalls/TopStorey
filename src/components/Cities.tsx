import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export interface Property {
  id: string
  title: string
  city: string
  locality: string
  type: 'Residential' | 'Commercial' | 'Plots/Land' | 'Co-living' | 'Co-working'
  purpose: 'buy' | 'rent' | 'new launches'
  price: string
  priceValue: number
  bhk?: string
  image: string
  builder: string
  description: string
  yield: string
  trend: string
  score: string
  connectivity: string
  infrastructure: string
  liquidity: string
  editorialInsight: string
}

const propertyTypes = ['Residential', 'Commercial', 'Plots/Land', 'Co-living', 'Co-working'] as const
const budgetRanges = [
  { label: 'Under ₹50L', filter: (v: number) => v < 50 },
  { label: '₹50L – ₹1Cr', filter: (v: number) => v >= 50 && v <= 100 },
  { label: '₹1Cr – ₹3Cr', filter: (v: number) => v > 100 && v <= 300 },
  { label: '₹3Cr – ₹5Cr', filter: (v: number) => v > 300 && v <= 500 },
  { label: '₹5Cr+', filter: (v: number) => v > 500 },
]
const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'] as const

const cities = [
  'Delhi/NCR',
  'Mumbai Metropolitan Region',
  'Bengaluru',
  'Hyderabad',
  'Pune',
  'Chennai',
  'Kolkata',
  'Emerging Markets',
]

export const propertyDataset: Property[] = [
  {
    id: 'prop-1',
    title: 'The Sovereign Penthouse',
    city: 'Bengaluru',
    locality: 'Indiranagar',
    type: 'Residential',
    purpose: 'buy',
    price: '₹8.4 Cr',
    priceValue: 840,
    bhk: '4 BHK',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    builder: 'Prestige Group',
    description: 'Premium duplex penthouse with panoramic garden city views and a private lap pool.',
    yield: '3.8% rental yield',
    trend: '+14.2% YoY',
    score: '9.2 / 10',
    connectivity: '9.5/10',
    infrastructure: '8.8/10',
    liquidity: 'High',
    editorialInsight: 'Indiranagar remains Bengaluru\'s primary residential bullseye. High rental retention and strong commercial proximity shelter this micro-market from broader outer-ring supply pressures.'
  },
  {
    id: 'prop-2',
    title: 'DLF Camellias II',
    city: 'Delhi/NCR',
    locality: 'Golf Course Road, Gurugram',
    type: 'Residential',
    purpose: 'new launches',
    price: '₹24.5 Cr',
    priceValue: 2450,
    bhk: '4+ BHK',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    builder: 'DLF',
    description: 'Ultra-luxury signature residence overlooking Gurugram\'s elite championship golf course.',
    yield: '3.1% rental yield',
    trend: '+18.5% YoY',
    score: '9.5 / 10',
    connectivity: '9.8/10',
    infrastructure: '9.5/10',
    liquidity: 'Very High',
    editorialInsight: 'Camellias II commands a premium that defies Gurugram volume metrics. The asset quality and gatekeeper prestige make it a true capital haven rather than a simple residential investment.'
  },
  {
    id: 'prop-3',
    title: 'Cybercity Corporate Landmark',
    city: 'Hyderabad',
    locality: 'Hitec City',
    type: 'Commercial',
    purpose: 'buy',
    price: '₹18.2 Cr',
    priceValue: 1820,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    builder: 'Cybercity Builders',
    description: 'Grade-A pre-leased corporate headquarters with multi-national tech anchors.',
    yield: '8.7% rental yield',
    trend: '+8.9% YoY',
    score: '8.8 / 10',
    connectivity: '9.2/10',
    infrastructure: '9.0/10',
    liquidity: 'Moderate',
    editorialInsight: 'Pre-leased assets in Hitec City offer a highly attractive yield spread over 10-year government bonds. Multi-national lease covenants provide strong downside protection.'
  },
  {
    id: 'prop-4',
    title: 'Lodha Sea Reserve',
    city: 'Mumbai Metropolitan Region',
    locality: 'Lower Parel, Mumbai',
    type: 'Residential',
    purpose: 'new launches',
    price: '₹12.5 Cr',
    priceValue: 1250,
    bhk: '3 BHK',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    builder: 'Lodha Group',
    description: 'Sky villa with dynamic views of the Arabian Sea, featuring interior styling by international design firms.',
    yield: '3.5% rental yield',
    trend: '+9.8% YoY',
    score: '8.9 / 10',
    connectivity: '9.6/10',
    infrastructure: '9.2/10',
    liquidity: 'High',
    editorialInsight: 'Lower Parel\'s skyline remains congested, but Lodha\'s specific coastal positioning preserves long-term light and air corridors, supporting premium valuation over land-locked towers.'
  },
  {
    id: 'prop-5',
    title: 'Elysian Canopy Groves',
    city: 'Pune',
    locality: 'Koregaon Park',
    type: 'Plots/Land',
    purpose: 'buy',
    price: '₹4.8 Cr',
    priceValue: 480,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    builder: 'Panchshil Realty',
    description: 'Rare gated residential land parcel in Pune\'s most canopy-sheltered elite neighborhood.',
    yield: 'N/A (Capital Play)',
    trend: '+11.5% YoY',
    score: '8.7 / 10',
    connectivity: '9.0/10',
    infrastructure: '9.2/10',
    liquidity: 'High',
    editorialInsight: 'Clear-title land in Koregaon Park is virtually non-existent. Panchshil\'s aggregated parcel offers a rare estate building opportunity for HNIs seeking privacy and elite positioning.'
  },
  {
    id: 'prop-6',
    title: 'Aurelia Coastal Residences',
    city: 'Chennai',
    locality: 'ECR (East Coast Road)',
    type: 'Residential',
    purpose: 'buy',
    price: '₹5.2 Cr',
    priceValue: 520,
    bhk: '3 BHK',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    builder: 'Akshaya',
    description: 'Coastal modern villa with direct access to private beach and high-end smart home systems.',
    yield: '4.1% rental yield',
    trend: '+7.2% YoY',
    score: '8.2 / 10',
    connectivity: '8.5/10',
    infrastructure: '8.0/10',
    liquidity: 'Moderate',
    editorialInsight: 'Chennai\'s ECR continues to see solid premium residential migration. Seaside assets command high lifestyle valuations, though global warming/coastal norms warrant long-term study.'
  },
]

export function PropertySearch() {
  const navigate = useNavigate()
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedBudgetLabel, setSelectedBudgetLabel] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'all' | 'residential' | 'commercial'>('all')

  // Results display
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])

  // Real-time filtering logic
  useEffect(() => {
    let result = propertyDataset

    // 1. Only show buy properties
    result = result.filter((p) => p.purpose === 'buy')

    // 2. City filter
    if (selectedCity) {
      result = result.filter((p) => p.city.toLowerCase() === selectedCity.toLowerCase())
    }

    // 3. Property Type filter
    if (selectedType) {
      result = result.filter((p) => p.type === selectedType)
    }

    // 4. Budget filter
    if (selectedBudgetLabel) {
      const budgetObj = budgetRanges.find((r) => r.label === selectedBudgetLabel)
      if (budgetObj) {
        result = result.filter((p) => budgetObj.filter(p.priceValue))
      }
    }

    // 5. Tab filter
    if (activeTab === 'residential') {
      result = result.filter((p) => p.type === 'Residential')
    } else if (activeTab === 'commercial') {
      result = result.filter((p) => p.type === 'Commercial' || p.type === 'Co-working')
    }

    setFilteredProperties(result)
  }, [selectedCity, selectedType, selectedBudgetLabel, activeTab])

  // Coordinate GSAP refresh on layout changes
  useEffect(() => {
    const timer = setTimeout(() => {
      window.__scrollRefresh?.()
    }, 150)
    return () => clearTimeout(timer)
  }, [filteredProperties])

  const handleClearFilters = () => {
    setSelectedCity('')
    setSelectedType('')
    setSelectedBudgetLabel('')
    setActiveTab('all')
  }

  const isAnyFilterActive = selectedCity || selectedType || selectedBudgetLabel || activeTab !== 'all'

  // Get featured property (first one with highest score)
  const featuredProperty = filteredProperties[0]
  const remainingProperties = filteredProperties.slice(1)

  return (
    <div className="recommended-properties-module">
      {/* Header Section */}
      <div className="rec-header">
        <div className="rec-header-content">
          <div className="rec-eyebrow">
            <span className="rec-eyebrow-line"></span>
            <span className="rec-eyebrow-text">Curated for You</span>
            <span className="rec-eyebrow-line"></span>
          </div>
          <h2 className="rec-title">Premium Investment Opportunities</h2>
          <p className="rec-subtitle">
            Handpicked properties across India's most promising real estate markets
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="rec-tabs-section">
        <div className="rec-tabs">
          <button 
            className={`rec-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Properties
          </button>
          <button 
            className={`rec-tab ${activeTab === 'residential' ? 'active' : ''}`}
            onClick={() => setActiveTab('residential')}
          >
            Residential
          </button>
          <button 
            className={`rec-tab ${activeTab === 'commercial' ? 'active' : ''}`}
            onClick={() => setActiveTab('commercial')}
          >
            Commercial
          </button>
        </div>

        {/* Filter Chips */}
        <div className="rec-filters">
          <div className="rec-filter-group">
            <label className="rec-filter-label">Location</label>
            <select 
              className="rec-filter-select"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="rec-filter-group">
            <label className="rec-filter-label">Budget</label>
            <select 
              className="rec-filter-select"
              value={selectedBudgetLabel}
              onChange={(e) => setSelectedBudgetLabel(e.target.value)}
            >
              <option value="">Any Budget</option>
              {budgetRanges.map((range) => (
                <option key={range.label} value={range.label}>{range.label}</option>
              ))}
            </select>
          </div>

          {isAnyFilterActive && (
            <button className="rec-clear-btn" onClick={handleClearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Properties Grid */}
      <div className="rec-properties-grid">
        {/* Featured Property Card */}
        {featuredProperty && (
          <div 
            className="rec-featured-card"
            onClick={() => navigate(`/properties/${featuredProperty.id}`)}
          >
            <div className="rec-featured-image">
              <img src={featuredProperty.image} alt={featuredProperty.title} />
              <div className="rec-featured-overlay">
                <div className="rec-featured-badge">Featured</div>
                <div className="rec-featured-stats">
                  <div className="rec-stat-item">
                    <span className="rec-stat-label">Intel Score</span>
                    <span className="rec-stat-value">{featuredProperty.score}</span>
                  </div>
                  <div className="rec-stat-item">
                    <span className="rec-stat-label">Growth</span>
                    <span className="rec-stat-value">{featuredProperty.trend}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rec-featured-content">
              <div className="rec-featured-location">
                <span className="rec-location-city">{featuredProperty.city}</span>
                <span className="rec-location-dot">·</span>
                <span className="rec-location-locality">{featuredProperty.locality}</span>
              </div>
              <h3 className="rec-featured-title">{featuredProperty.title}</h3>
              <p className="rec-featured-description">{featuredProperty.description}</p>
              <div className="rec-featured-meta">
                <div className="rec-meta-item">
                  <span className="rec-meta-label">Price</span>
                  <span className="rec-meta-value">{featuredProperty.price}</span>
                </div>
                <div className="rec-meta-item">
                  <span className="rec-meta-label">Yield</span>
                  <span className="rec-meta-value">{featuredProperty.yield}</span>
                </div>
                <div className="rec-meta-item">
                  <span className="rec-meta-label">Builder</span>
                  <span className="rec-meta-value">{featuredProperty.builder}</span>
                </div>
              </div>
              <button className="rec-cta-btn">
                View Investment Briefing
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Remaining Properties Grid */}
        <div className="rec-other-properties">
          {remainingProperties.map((prop) => (
            <div 
              key={prop.id} 
              className="rec-property-card"
              onClick={() => navigate(`/properties/${prop.id}`)}
            >
              <div className="rec-card-image">
                <img src={prop.image} alt={prop.title} />
                <div className="rec-card-type-badge">{prop.type}</div>
              </div>
              <div className="rec-card-content">
                <div className="rec-card-location">
                  <span className="rec-card-city">{prop.city}</span>
                  <span className="rec-card-dot">·</span>
                  <span className="rec-card-locality">{prop.locality}</span>
                </div>
                <h4 className="rec-card-title">{prop.title}</h4>
                <p className="rec-card-description">{prop.description}</p>
                <div className="rec-card-stats">
                  <div className="rec-card-stat">
                    <span className="rec-card-stat-label">Score</span>
                    <span className="rec-card-stat-value">{prop.score}</span>
                  </div>
                  <div className="rec-card-stat">
                    <span className="rec-card-stat-label">Growth</span>
                    <span className="rec-card-stat-value">{prop.trend}</span>
                  </div>
                  <div className="rec-card-stat">
                    <span className="rec-card-stat-label">Price</span>
                    <span className="rec-card-stat-value">{prop.price}</span>
                  </div>
                </div>
                <div className="rec-card-footer">
                  <span className="rec-card-yield">{prop.yield}</span>
                  <button className="rec-card-btn">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="rec-bottom-cta">
        <div className="rec-cta-content">
          <h3 className="rec-cta-title">Looking for Something Specific?</h3>
          <p className="rec-cta-text">
            Our analysts can provide personalized investment recommendations based on your portfolio goals.
          </p>
        </div>
        <button className="rec-cta-secondary-btn">
          Get Custom Recommendations
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  )
}