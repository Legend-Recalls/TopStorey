import { createContext, useContext, useState, useCallback, useEffect } from 'react'

// Theme types
export interface Theme {
  colors: {
    primary: string
    secondary: string
    background: string
    foreground: string
    surface: string
    surfaceStrong: string
    border: string
    text: {
      primary: string
      secondary: string
      muted: string
    }
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  shadows: {
    sm: string
    md: string
    lg: string
  }
}

// Light theme
export const lightTheme: Theme = {
  colors: {
    primary: '#8b2e24',
    secondary: '#4f7ce5',
    background: '#f4efe6',
    foreground: '#171512',
    surface: '#f8f3eb',
    surfaceStrong: '#fffdf8',
    border: '#d7cbbb',
    text: {
      primary: '#171512',
      secondary: '#5f584f',
      muted: '#8d7f71',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  shadows: {
    sm: '0 2px 4px rgba(32, 24, 16, 0.05)',
    md: '0 10px 30px rgba(32, 24, 16, 0.08)',
    lg: '0 20px 40px rgba(32, 24, 16, 0.12)',
  },
}

// Dark theme
export const darkTheme: Theme = {
  colors: {
    primary: '#b64b3d',
    secondary: '#6b9fff',
    background: '#0f0d0a',
    foreground: '#f8f3eb',
    surface: '#1a1714',
    surfaceStrong: '#24201c',
    border: '#3a3530',
    text: {
      primary: '#f8f3eb',
      secondary: '#c6b7a5',
      muted: '#8d7f71',
    },
  },
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.3)',
    md: '0 10px 30px rgba(0, 0, 0, 0.4)',
    lg: '0 20px 40px rgba(0, 0, 0, 0.5)',
  },
}

// Theme context
interface ThemeContextValue {
  theme: Theme
  mode: 'light' | 'dark'
  toggleTheme: () => void
  setMode: (mode: 'light' | 'dark') => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

// Theme provider
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  const theme = mode === 'light' ? lightTheme : darkTheme

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement
    const t = theme.colors

    root.style.setProperty('--color-primary', t.primary)
    root.style.setProperty('--color-secondary', t.secondary)
    root.style.setProperty('--color-background', t.background)
    root.style.setProperty('--color-foreground', t.foreground)
    root.style.setProperty('--color-surface', t.surface)
    root.style.setProperty('--color-surface-strong', t.surfaceStrong)
    root.style.setProperty('--color-border', t.border)
    root.style.setProperty('--color-text-primary', t.text.primary)
    root.style.setProperty('--color-text-secondary', t.text.secondary)
    root.style.setProperty('--color-text-muted', t.text.muted)

    // Apply spacing
    root.style.setProperty('--spacing-xs', theme.spacing.xs)
    root.style.setProperty('--spacing-sm', theme.spacing.sm)
    root.style.setProperty('--spacing-md', theme.spacing.md)
    root.style.setProperty('--spacing-lg', theme.spacing.lg)
    root.style.setProperty('--spacing-xl', theme.spacing.xl)

    // Apply border radius
    root.style.setProperty('--radius-sm', theme.borderRadius.sm)
    root.style.setProperty('--radius-md', theme.borderRadius.md)
    root.style.setProperty('--radius-lg', theme.borderRadius.lg)
    root.style.setProperty('--radius-xl', theme.borderRadius.xl)

    // Apply shadows
    root.style.setProperty('--shadow-sm', theme.shadows.sm)
    root.style.setProperty('--shadow-md', theme.shadows.md)
    root.style.setProperty('--shadow-lg', theme.shadows.lg)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
