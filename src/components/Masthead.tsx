import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../theme/ThemeContext'
import { Menu, X, Sun, Moon, Search } from 'lucide-react'

interface NavChild {
  label: string
  items: string[]
}

interface NavItem {
  label: string
  href: string
  children?: (string | NavChild)[]
}

interface MastheadProps {
  navItems?: NavItem[]
}

function getNavChildCount(children: (string | NavChild)[]) {
  return children.reduce((count, child) => {
    if (typeof child === 'string') {
      return count + 1
    }

    return count + child.items.length
  }, 0)
}

export function Masthead({ navItems = [] }: MastheadProps) {
  const { mode, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [openNav, setOpenNav] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Track scroll to hide inline nav and show hamburger
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
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
      if (e.key === 'Escape') {
        if (isOpen) setIsOpen(false)
        if (openNav) setOpenNav(null)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, openNav])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    setOpenNav(null)
    setTimeout(() => {
      if (!href.startsWith('#')) {
        window.location.href = href
        return
      }

      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' })
      } else {
        window.location.href = `/${href}`
      }
    }, 100)
  }

  return (
    <>
      {/* ---- Unified dark header block ---- */}
      <header
        className={`masthead-block${isScrolled ? ' is-scrolled' : ''}${isOpen ? ' is-open' : ''}`}
      >
        {/* Row 1: Top bar */}
        <div className="masthead-bar">
          {/* Left — hamburger (visible on scroll or when overlay open) */}
          <div className="masthead-left">
            <button
              type="button"
              className="masthead-hamburger"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X size={20} strokeWidth={1.6} />
              ) : (
                <Menu size={20} strokeWidth={1.6} />
              )}
            </button>
          </div>

          {/* Centre — logo */}
          <a
            href="/#latest"
            className="masthead-logo"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#latest')
            }}
          >
            <span className="masthead-logo-text">Top Storey</span>
          </a>

          {/* Right — actions */}
          <div className="masthead-right">
            <button
              type="button"
              className="masthead-theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
            >
              {mode === 'light' ? (
                <Moon size={15} strokeWidth={1.8} />
              ) : (
                <Sun size={15} strokeWidth={1.8} />
              )}
            </button>
            <a href="#" className="masthead-action-link">Sign In</a>
            <a href="#" className="masthead-subscribe-btn">Subscribe</a>
            <button
              type="button"
              className="masthead-search-btn"
              aria-label="Search"
            >
              <Search size={16} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Row 2: Inline navigation with dropdowns (hides on scroll) */}
        {navItems.length > 0 && (
          <nav className="masthead-nav" aria-label="Primary navigation">
            {navItems.map((item) => {
              const children = item.children ?? []
              const hasDropdown = children.length > 0
              const isActive = openNav === item.label

              if (!hasDropdown) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="masthead-nav-link"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                  >
                    {item.label}
                  </a>
                )
              }

              return (
                <div
                  key={item.label}
                  className={`masthead-nav-item${isActive ? ' is-open' : ''}`}
                  onMouseEnter={() => setOpenNav(item.label)}
                  onMouseLeave={() => setOpenNav(null)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                      setOpenNav(null)
                    }
                  }}
                >
                  <button
                    type="button"
                    className="masthead-nav-link masthead-nav-trigger"
                    aria-haspopup="menu"
                    aria-expanded={isActive}
                    onClick={() => setOpenNav(isActive ? null : item.label)}
                    onFocus={() => setOpenNav(item.label)}
                  >
                    {item.label}
                  </button>

                  <div
                    className={`masthead-dropdown${getNavChildCount(children) > 8 ? ' masthead-dropdown-wide' : ''}`}
                    role="menu"
                    aria-label={`${item.label} subcategories`}
                  >
                    {/* Bridge element for hover gap */}
                    <div className="masthead-dropdown-bridge" />
                    {children.map((child) =>
                      typeof child === 'string' ? (
                        <a
                          key={`${item.label}-${child}`}
                          href={item.href}
                          className="masthead-dropdown-link"
                          role="menuitem"
                          onClick={(e) => {
                            e.preventDefault()
                            setOpenNav(null)
                            handleNavClick(item.href)
                          }}
                        >
                          {child}
                        </a>
                      ) : (
                        <div className="masthead-dropdown-section" key={`${item.label}-${child.label}`}>
                          <span className="masthead-dropdown-section-title">{child.label}</span>
                          <div className="masthead-dropdown-section-links">
                            {child.items.map((sectionItem) => (
                              <a
                                key={`${item.label}-${child.label}-${sectionItem}`}
                                href={item.href}
                                className="masthead-dropdown-link"
                                role="menuitem"
                                onClick={(e) => {
                                  e.preventDefault()
                                  setOpenNav(null)
                                  handleNavClick(item.href)
                                }}
                              >
                                {sectionItem}
                              </a>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            })}
          </nav>
        )}
      </header>

      {/* ---- Full-screen menu overlay ---- */}
      <div
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
              {navItems.map((item) => {
                const children = item.children ?? []

                return (
                  <li
                    key={item.label}
                    className={`menu-nav-item${children.length > 0 ? ' has-children' : ''}`}
                  >
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

                    {children.length > 0 ? (
                      <div className="menu-subnav" aria-label={`${item.label} subcategories`}>
                        {children.map((child) =>
                          typeof child === 'string' ? (
                            <a
                              key={`${item.label}-${child}`}
                              href={item.href}
                              className="menu-subnav-link"
                              onClick={(e) => {
                                e.preventDefault()
                                handleNavClick(item.href)
                              }}
                              tabIndex={isOpen ? 0 : -1}
                            >
                              {child}
                            </a>
                          ) : (
                            <div className="menu-subnav-group" key={`${item.label}-${child.label}`}>
                              <span className="menu-subnav-title">{child.label}</span>
                              <div className="menu-subnav-links">
                                {child.items.map((sectionItem) => (
                                  <a
                                    key={`${item.label}-${child.label}-${sectionItem}`}
                                    href={item.href}
                                    className="menu-subnav-link"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleNavClick(item.href)
                                    }}
                                    tabIndex={isOpen ? 0 : -1}
                                  >
                                    {sectionItem}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
