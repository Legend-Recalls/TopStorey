import { useState } from 'react'

const propertyTypes = ['Residential', 'Commercial', 'Plots/Land', 'Co-living', 'Co-working']
const budgetRanges = ['Under ₹50L', '₹50L – ₹1Cr', '₹1Cr – ₹3Cr', '₹3Cr – ₹5Cr', '₹5Cr+']
const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK']

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

export function PropertySearch() {
  const [activeTab, setActiveTab] = useState('buy')
  const [selectedCity, setSelectedCity] = useState('')

  return (
    <div className="property-search-module">
      {/* Tab bar */}
      <div className="search-tabs">
        {['buy', 'rent', 'new launches'].map((tab) => (
          <button
            key={tab}
            type="button"
            className={`search-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Search bar row */}
      <div className="search-bar-row">
        <div className="search-city-select">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            aria-label="Select City"
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search by locality, project, builder, or landmark..."
            className="search-main-input"
          />
        </div>
        <button type="button" className="search-go-button">
          Search
        </button>
      </div>

      {/* Filter chips */}
      <div className="search-filter-row">
        <div className="filter-group">
          <span className="filter-group-label">Property Type</span>
          <div className="filter-chips">
            {propertyTypes.map((type) => (
              <button key={type} type="button" className="filter-chip">{type}</button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <span className="filter-group-label">Budget</span>
          <div className="filter-chips">
            {budgetRanges.map((range) => (
              <button key={range} type="button" className="filter-chip">{range}</button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <span className="filter-group-label">BHK</span>
          <div className="filter-chips">
            {bhkOptions.map((bhk) => (
              <button key={bhk} type="button" className="filter-chip">{bhk}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick city links */}
      <div className="search-quick-cities">
        <span className="quick-cities-label">Popular:</span>
        {cities.slice(0, 6).map((city) => (
          <a key={city} href={`#${city.toLowerCase().replace(/\//g, '-')}`} className="quick-city-link">
            {city}
          </a>
        ))}
      </div>
    </div>
  )
}
