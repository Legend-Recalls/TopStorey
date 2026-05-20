import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../theme/ThemeContext'
import { Search, X, Menu, Contrast } from 'lucide-react'

interface NavChild {
  label: string
  items: string[]
}

interface NavItem {
  label: string
  href: string
  children?: NavChild[]
}

interface GlobalHeaderProps {
  items: NavItem[]
}

export function GlobalHeader({ items }: GlobalHeaderProps) {
  const { mode, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run once on mount to check initial scroll position
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Focus search input when menu opens
      setTimeout(() => searchInputRef.current?.focus(), 300)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    // Small delay to let the overlay close before scrolling
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <>
      {/* ---- Sticky header bar ---- */}
      <header className={`global-header${isOpen ? ' is-open' : ''}${isScrolled ? ' is-scrolled' : ''}`}>
        <button
          type="button"
          className="header-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X size={22} strokeWidth={1.6} />
          ) : (
            <Menu size={22} strokeWidth={1.6} />
          )}
        </button>

        <a href="#latest" className="header-logo" onClick={() => setIsOpen(false)}>
          <span className="header-logo-text">Top Storey</span>
        </a>

        <div className="header-actions">
          <nav className="header-links">
            <a href="#" className="header-link">Sign In</a>
            <a href="#" className="header-link">Newsletter</a>
            <a href="#" className="header-link">Contact</a>
          </nav>
          <button
            type="button"
            className="header-theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
          >
            <Contrast size={16} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* ---- Full-screen menu overlay ---- */}
      <div
        ref={overlayRef}
        className={`menu-overlay${isOpen ? ' is-visible' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className="menu-overlay-inner">
          {/* Search bar */}
          <div className="menu-search-wrapper">
            <Search size={18} className="menu-search-icon" />
            <input
              ref={searchInputRef}
              type="search"
              className="menu-search-input"
              placeholder='Try "Mumbai luxury market"'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              tabIndex={isOpen ? 0 : -1}
            />
            {searchValue && (
              <button
                type="button"
                className="menu-search-cancel"
                onClick={() => setSearchValue('')}
                tabIndex={isOpen ? 0 : -1}
              >
                Cancel
              </button>
            )}
          </div>

          {/* Navigation links */}
          <nav className="menu-nav" aria-label="Main navigation">
            <ul className="menu-nav-list">
              {items.map((item) => (
                <li key={item.label} className="menu-nav-item">
                  <a
                    href={item.href}
                    className="menu-nav-link"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    tabIndex={isOpen ? 0 : -1}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </div>
    </>
  )
}
