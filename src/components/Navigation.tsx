import { useState } from 'react'

interface NavItem {
  label: string
  href: string
  children?: NavChild[]
}

type NavChild =
  | string
  | {
      label: string
      items: string[]
    }

function getItemCount(children: NavChild[]) {
  return children.reduce((count, child) => {
    if (typeof child === 'string') {
      return count + 1
    }

    return count + child.items.length
  }, 0)
}

function getMenuSummary(label: string, itemCount: number) {
  const summaries: Record<string, string> = {
    Cities: 'Track the metros, corridors, and local shifts shaping demand.',
    Markets: 'Browse asset classes, cycles, policy signals, and emerging formats.',
    Conversations: 'Interviews, roundtables, and sharp voices from the industry.',
    Events: 'Summits, webinars, partnerships, and rooms worth being in.',
    About: 'How TopStorey thinks, selects, and explains the market.',
  }

  return summaries[label] ?? `${itemCount} ways into the newsroom.`
}

interface NavigationProps {
  items: NavItem[]
}

export function Navigation({ items }: NavigationProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <nav className="section-nav" aria-label="Primary">
      <div className="nav-links">
        <span className="nav-group-label">Newsroom</span>
        {items.map((item) => {
          const children = item.children ?? []
          const hasDropdown = children.length > 0
          const isWide = hasDropdown && getItemCount(children) > 8
          const isOpen = openMenu === item.label

          return (
            <div
              key={item.label}
              className={`nav-item${hasDropdown ? ' has-dropdown' : ''}${isOpen ? ' is-open' : ''}`}
              onMouseEnter={() => hasDropdown && setOpenMenu(item.label)}
              onMouseLeave={() => hasDropdown && setOpenMenu(null)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setOpenMenu(null)
                }
              }}
            >
              {hasDropdown ? (
                <button
                  type="button"
                  className="nav-link nav-trigger"
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  onClick={() => setOpenMenu(isOpen ? null : item.label)}
                  onFocus={() => setOpenMenu(item.label)}
                >
                  {item.label}
                </button>
              ) : (
                <a href={item.href} className="nav-link">
                  {item.label}
                </a>
              )}
              {hasDropdown ? (
                <div
                  className={`dropdown-menu${isWide ? ' dropdown-menu-wide' : ''}`}
                  role="menu"
                  aria-label={`${item.label} subcategories`}
                >
                  <div className="dropdown-intro">
                    <span className="dropdown-kicker">{item.label}</span>
                    <p>{getMenuSummary(item.label, getItemCount(children))}</p>
                  </div>
                  {children.map((child) =>
                    typeof child === 'string' ? (
                      <a
                        key={`${item.label}-${child}`}
                        href={item.href}
                        className="dropdown-link"
                        role="menuitem"
                        onClick={() => setOpenMenu(null)}
                      >
                        {child}
                      </a>
                    ) : (
                      <div className="dropdown-section" key={`${item.label}-${child.label}`}>
                        <span className="dropdown-section-title">{child.label}</span>
                        <div className="dropdown-section-links">
                          {child.items.map((sectionItem) => (
                            <a
                              key={`${item.label}-${child.label}-${sectionItem}`}
                              href={item.href}
                              className="dropdown-link"
                              role="menuitem"
                              onClick={() => setOpenMenu(null)}
                            >
                              {sectionItem}
                            </a>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                  <a className="dropdown-view-all" href={item.href} onClick={() => setOpenMenu(null)}>
                    View all {item.label}
                  </a>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
