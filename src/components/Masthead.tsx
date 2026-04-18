import { useTheme } from '../theme/ThemeContext'
import { Search } from 'lucide-react'

export function Masthead() {
  const { mode, toggleTheme } = useTheme()

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

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
          <label className="search-shell" aria-label="Search">
            <Search className="search-icon" size={18} />
            <input type="search" placeholder="Search stories, markets, cities…" />
          </label>
          <a href="#" className="sign-in-link">Sign In</a>
          <button type="button" className="button button-primary subscribe-button">
            Subscribe
          </button>
        </div>
      </div>
    </>
  )
}
