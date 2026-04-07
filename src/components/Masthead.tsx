import { useTheme } from '../theme/ThemeContext'

export function Masthead() {
  const { theme, mode, toggleTheme } = useTheme()

  return (
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
          <input type="search" placeholder="Search stories, markets, cities" />
        </label>
        <button
          type="button"
          className="button button-secondary"
          onClick={toggleTheme}
          aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
          style={{ padding: '0.85rem', minWidth: '48px' }}
        >
          {mode === 'light' ? '🌙' : '☀️'}
        </button>
        <button type="button" className="button button-primary subscribe-button">
          Subscribe
        </button>
      </div>
    </div>
  )
}
