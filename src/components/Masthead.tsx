import { useTheme } from '../theme/ThemeContext'
import { Search, MapPin, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const majorCities = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Ahmedabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Jaipur',
  'Surat',
]

export function Masthead() {
  const { mode, toggleTheme } = useTheme()
  const [selectedCity, setSelectedCity] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  
  const handleCitySelect = (city: string) => {
    setSelectedCity(city)
    setIsDropdownOpen(false)
  }

  return (
    <>
      <div className="masthead-date-line">
        <span>{dateStr}</span>
        <span className="date-line-right">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
          >
            {mode === 'light' ? '☽' : '☀'}
          </button>
        </span>
      </div>
      <div className="masthead">
        <div className="brand">
          <span className="brand-mark">TS</span>
          <div>
            <p>Top Storey</p>
            <span>Elevated Real Estate Insight</span>
          </div>
        </div>

        <div className="masthead-actions">
          <div className="search-shell cities-dropdown">
            <div 
              className="cities-select-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <MapPin size={16} className="city-icon" />
              <span className="selected-city-text">
                {selectedCity || 'Select City'}
              </span>
              <ChevronDown size={14} className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} />
            </div>
            
            {isDropdownOpen && (
              <div className="cities-dropdown-menu">
                <div className="dropdown-section">
                  <span className="dropdown-section-title">Major Cities</span>
                  {majorCities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      className={`dropdown-item ${selectedCity === city ? 'active' : ''}`}
                      onClick={() => handleCitySelect(city)}
                    >
                      {city}
                    </button>
                  ))}
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-section">
                  <button
                    type="button"
                    className={`dropdown-item other-cities ${selectedCity === 'Other Cities' ? 'active' : ''}`}
                    onClick={() => handleCitySelect('Other Cities')}
                  >
                    <Search size={14} />
                    Other Cities
                  </button>
                </div>
              </div>
            )}
          </div>
          <a href="#" className="sign-in-link">Sign In</a>
          <button type="button" className="button button-primary subscribe-button">
            Subscribe
          </button>
        </div>
      </div>
    </>
  )
}
