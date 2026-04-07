interface NavItem {
  label: string
  href: string
  children?: string[]
}

interface NavigationProps {
  items: NavItem[]
}

export function Navigation({ items }: NavigationProps) {
  return (
    <nav className="section-nav" aria-label="Primary">
      <div className="nav-links">
        {items.map((item) => (
          <div
            key={item.label}
            className={`nav-item${item.children ? ' has-dropdown' : ''}`}
          >
            <a href={item.href} className="nav-link">
              {item.label}
            </a>
            {item.children ? (
              <div className="dropdown-menu" role="menu" aria-label={`${item.label} subcategories`}>
                {item.children.map((child) => (
                  <a
                    key={`${item.label}-${child}`}
                    href={item.href}
                    className="dropdown-link"
                    role="menuitem"
                  >
                    {child}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </nav>
  )
}
