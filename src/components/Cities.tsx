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
    editorialInsight: 'Indiranagar remains Bengaluru’s primary residential bullseye. High rental retention and strong commercial proximity shelter this micro-market from broader outer-ring supply pressures.'
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
    description: 'Ultra-luxury signature residence overlooking Gurugram’s elite championship golf course.',
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
    editorialInsight: 'Lower Parel’s skyline remains congested, but Lodha’s specific coastal positioning preserves long-term light and air corridors, supporting premium valuation over land-locked towers.'
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
    description: 'Rare gated residential land parcel in Pune’s most canopy-sheltered elite neighborhood.',
    yield: 'N/A (Capital Play)',
    trend: '+11.5% YoY',
    score: '8.7 / 10',
    connectivity: '9.0/10',
    infrastructure: '9.2/10',
    liquidity: 'High',
    editorialInsight: 'Clear-title land in Koregaon Park is virtually non-existent. Panchshil’s aggregated parcel offers a rare estate building opportunity for HNIs seeking privacy and elite positioning.'
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
    editorialInsight: 'Chennai’s ECR continues to see solid premium residential migration. Seaside assets command high lifestyle valuations, though global warming/coastal norms warrant long-term study.'
  },
  {
    id: 'prop-7',
    title: 'Ecospace Tech Suite',
    city: 'Kolkata',
    locality: 'New Town',
    type: 'Co-working',
    purpose: 'rent',
    price: '₹3.5 L / mo',
    priceValue: 3.5,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    builder: 'Ambuja Neotia',
    description: 'Fully managed shared workspace designed for deep-tech start-ups.',
    yield: '9.4% rental yield',
    trend: '+5.5% YoY',
    score: '8.0 / 10',
    connectivity: '8.8/10',
    infrastructure: '8.5/10',
    liquidity: 'High',
    editorialInsight: 'Fully-managed co-working space yielding over 9% in Kolkata’s tech district. Ideal cash flow instrument for institutional family offices wanting immediate yield.'
  },
  {
    id: 'prop-8',
    title: 'Verdant Hills Estate',
    city: 'Emerging Markets',
    locality: 'Dehradun Valley',
    type: 'Plots/Land',
    purpose: 'new launches',
    price: '₹1.8 Cr',
    priceValue: 180,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    builder: 'Taj Valley Developers',
    description: 'Scenic high-altitude resort villa plots, ideal for boutique organic estates and holiday retreats.',
    yield: 'N/A (Capital Play)',
    trend: '+16.0% YoY',
    score: '8.5 / 10',
    connectivity: '7.8/10',
    infrastructure: '8.2/10',
    liquidity: 'Moderate',
    editorialInsight: 'Dehradun’s emerging luxury second-home market is fueled by Delhi-NCR out-migration. Elite, gated plotted communities enjoy strong capital upside with RERA protections.'
  },
  {
    id: 'prop-9',
    title: 'WeWork Premium Flex Center',
    city: 'Mumbai Metropolitan Region',
    locality: 'BKC (Bandra Kurla Complex)',
    type: 'Co-working',
    purpose: 'rent',
    price: '₹8.2 L / mo',
    priceValue: 8.2,
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80',
    builder: 'BKC Developers',
    description: 'Corporate flex suite in the heart of Mumbai’s most prestigious financial district.',
    yield: '8.2% rental yield',
    trend: '+12.1% YoY',
    score: '9.0 / 10',
    connectivity: '9.9/10',
    infrastructure: '9.8/10',
    liquidity: 'Very High',
    editorialInsight: 'BKC continues to act as Mumbai’s supreme financial core. Demand for high-quality corporate flex spaces remains extreme, supported by international tenant profiles.'
  },
  {
    id: 'prop-10',
    title: 'The Hive Koramangala Suite',
    city: 'Bengaluru',
    locality: 'Koramangala',
    type: 'Co-living',
    purpose: 'rent',
    price: '₹45K / mo',
    priceValue: 0.45,
    bhk: '1 BHK',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    builder: 'Hive Spaces',
    description: 'Premium co-living suites for venture backers and engineers with dynamic social nodes.',
    yield: '7.9% rental yield',
    trend: '+9.2% YoY',
    score: '8.4 / 10',
    connectivity: '9.4/10',
    infrastructure: '9.0/10',
    liquidity: 'High',
    editorialInsight: 'Co-living assets in Koramangala show near-zero vacancy. The high yield profile and constant influx of venture capital-funded professionals support steady occupancy rents.'
  },
  {
    id: 'prop-11',
    title: 'Whitefield Enterprise Plaza',
    city: 'Bengaluru',
    locality: 'Whitefield',
    type: 'Commercial',
    purpose: 'rent',
    price: '₹12.5 L / mo',
    priceValue: 12.5,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    builder: 'Brigade Group',
    description: 'Grade-A corporate shell with double-height lobby in Bengaluru’s premium software corridor.',
    yield: '8.5% rental yield',
    trend: '+6.8% YoY',
    score: '8.3 / 10',
    connectivity: '9.2/10',
    infrastructure: '9.0/10',
    liquidity: 'High',
    editorialInsight: 'Whitefield remains highly resilient as a tech core. Double-height lobby shell specifications cater specifically to MNC tech anchors demanding architectural presence.'
  }
]

export function PropertySearch() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'new launches'>('buy')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedBudgetLabel, setSelectedBudgetLabel] = useState<string>('')
  const [selectedBhk, setSelectedBhk] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  // Results display
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])

  // Real-time filtering logic
  useEffect(() => {
    let result = propertyDataset

    // 1. Tab purpose filter
    result = result.filter((p) => p.purpose === activeTab)

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

    // 5. BHK filter
    if (selectedBhk) {
      result = result.filter((p) => p.bhk === selectedBhk)
    }

    // 6. Search query string
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q) ||
          p.builder.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    setFilteredProperties(result)
  }, [activeTab, selectedCity, selectedType, selectedBudgetLabel, selectedBhk, searchQuery])

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
    setSelectedBhk('')
    setSearchQuery('')
  }

  const isAnyFilterActive =
    selectedCity || selectedType || selectedBudgetLabel || selectedBhk || searchQuery

  return (
    <div className="property-search-module search-dashboard-layout">
      {/* ==========================================
          LEFT COLUMN: SEARCH CONTROLS PANE
          ========================================== */}
      <div className="search-controls-pane">
        {/* Tab switcher */}
        <div className="search-tabs-compact">
          {(['buy', 'rent', 'new launches'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              className={`search-tab-compact-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* City and query row */}
        <div className="search-inputs-box">
          <div className="search-city-select-box">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              aria-label="Select City"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="search-query-input-box">
            <input
              type="text"
              placeholder="Search locality, project..."
              className="search-compact-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Scrollable Section */}
        <div className="controls-filters-section">
          {/* Property Type Group */}
          <div className="control-filter-group">
            <span className="control-group-label">Property Type</span>
            <div className="compact-chips">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`compact-chip ${selectedType === type ? 'active' : ''}`}
                  onClick={() => setSelectedType(selectedType === type ? '' : type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Group */}
          <div className="control-filter-group">
            <span className="control-group-label">Budget Range</span>
            <div className="compact-chips">
              {budgetRanges.map((range) => (
                <button
                  key={range.label}
                  type="button"
                  className={`compact-chip ${selectedBudgetLabel === range.label ? 'active' : ''}`}
                  onClick={() => setSelectedBudgetLabel(selectedBudgetLabel === range.label ? '' : range.label)}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* BHK Group */}
          <div className="control-filter-group">
            <span className="control-group-label">BHK Configuration</span>
            <div className="compact-chips">
              {bhkOptions.map((bhk) => (
                <button
                  key={bhk}
                  type="button"
                  className={`compact-chip ${selectedBhk === bhk ? 'active' : ''}`}
                  onClick={() => setSelectedBhk(selectedBhk === bhk ? '' : bhk)}
                >
                  {bhk}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Popular & Reset controls */}
        <div className="controls-footer">
          <div className="quick-popular-title">Popular:</div>
          <div className="popular-cities-flex">
            {cities.slice(0, 5).map((city) => (
              <button
                key={city}
                type="button"
                className={`popular-city-pill ${selectedCity === city ? 'active' : ''}`}
                onClick={() => setSelectedCity(selectedCity === city ? '' : city)}
              >
                {city.split('/')[0].split(' ')[0]}
              </button>
            ))}
          </div>

          {isAnyFilterActive && (
            <button
              type="button"
              className="controls-reset-btn"
              onClick={handleClearFilters}
            >
              Reset Filters
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ==========================================
          RIGHT COLUMN: RESULTS PANES
          ========================================== */}
      <div className="search-results-pane">
        
        {/* HEADER */}
        <div className="results-pane-header">
          <div className="results-pane-header-title">
            <span>
              {filteredProperties.length === 0
                ? 'No Matches Found'
                : `${filteredProperties.length} Investment Briefings`}
            </span>
          </div>
          <span className="results-pane-market-badge">
            {selectedCity ? `${selectedCity} Micro-Market` : 'All Micro-Markets'}
          </span>
        </div>

        {/* INTERNAL SCROLLABLE LIST */}
        <div className="pane-content-scrollable">
          {filteredProperties.length > 0 ? (
            <div className="pane-grid-view">
              {filteredProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="dashboard-property-card"
                  onClick={() => navigate(`/properties/${prop.id}`)}
                >
                  <div className="dashboard-card-img-box">
                    <img src={prop.image} alt={prop.title} className="dashboard-card-img" />
                    <div className="dashboard-card-badge">{prop.type}</div>
                  </div>
                  <div className="dashboard-card-body">
                    <div className="dashboard-card-meta">
                      <span className="dashboard-card-locality">{prop.locality}</span>
                      <span className="dashboard-card-city">· {prop.city}</span>
                    </div>
                    <h4 className="dashboard-card-title">{prop.title}</h4>
                    <p className="dashboard-card-desc">{prop.description}</p>
                    
                    <div className="dashboard-card-stats-flex">
                      <div className="dashboard-card-stat">
                        <span className="db-stat-lbl">Intel Score</span>
                        <strong className="db-stat-val">{prop.score.split(' ')[0]}</strong>
                      </div>
                      <div className="dashboard-card-stat">
                        <span className="db-stat-lbl">YoY Growth</span>
                        <strong className="db-stat-val">{prop.trend}</strong>
                      </div>
                      <div className="dashboard-card-stat">
                        <span className="db-stat-lbl">Appraisal Price</span>
                        <strong className="db-stat-val">{prop.price}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="pane-fallback-view">
              <svg
                className="fallback-search-icon"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
              <h4>No matching investments mapped</h4>
              <p>
                No direct real-estate listings match your current filters in our highly curated database. Reset your filters to see premium properties in top cities.
              </p>
              <button
                type="button"
                className="fallback-reset-btn"
                onClick={handleClearFilters}
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
