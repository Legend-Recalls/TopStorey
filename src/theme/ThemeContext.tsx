import { createContext, useContext, useState, useCallback, useEffect } from 'react'

export interface Theme {
  colors: {
    primary: string
    primaryHover: string
    secondary: string
    background: string
    foreground: string
    surface: string
    surfaceStrong: string
    border: string
    borderStrong: string
    rule: string
    text: {
      primary: string
      secondary: string
      muted: string
    }
  }
}

export const lightTheme: Theme = {
  colors: {
    primary: '#8b2e24',
    primaryHover: '#a33d32',
    secondary: '#4f7ce5',
    background: '#faf8f5',
    foreground: '#1a1816',
    surface: '#f5f2ed',
    surfaceStrong: '#fff',
    border: '#e0dbd4',
    borderStrong: '#c8c0b4',
    rule: '#d4cec5',
    text: {
      primary: '#1a1816',
      secondary: '#55524d',
      muted: '#8a837a',
    },
  },
}

export const darkTheme: Theme = {
  colors: {
    primary: '#c4564a',
    primaryHover: '#d4675b',
    secondary: '#6b9fff',
    background: '#0e0d0b',
    foreground: '#e8e4dc',
    surface: '#1a1816',
    surfaceStrong: '#222018',
    border: '#2e2b26',
    borderStrong: '#3d3a34',
    rule: '#2e2b26',
    text: {
      primary: '#e8e4dc',
      secondary: '#a89f92',
      muted: '#6e675e',
    },
  },
}

interface ThemeContextValue {
  theme: Theme
  mode: 'light' | 'dark'
  toggleTheme: () => void
  setMode: (mode: 'light' | 'dark') => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  const theme = mode === 'light' ? lightTheme : darkTheme

  useEffect(() => {
    const root = document.documentElement
    const t = theme.colors

    root.style.setProperty('--color-primary', t.primary)
    root.style.setProperty('--color-primary-hover', t.primaryHover)
    root.style.setProperty('--color-secondary', t.secondary)
    root.style.setProperty('--color-background', t.background)
    root.style.setProperty('--color-foreground', t.foreground)
    root.style.setProperty('--color-surface', t.surface)
    root.style.setProperty('--color-surface-strong', t.surfaceStrong)
    root.style.setProperty('--color-border', t.border)
    root.style.setProperty('--color-border-strong', t.borderStrong)
    root.style.setProperty('--color-rule', t.rule)
    root.style.setProperty('--color-text-primary', t.text.primary)
    root.style.setProperty('--color-text-secondary', t.text.secondary)
    root.style.setProperty('--color-text-muted', t.text.muted)

    // Ticker
    root.style.setProperty('--ticker-bg', t.surface)

    // Sticky nav bg
    if (mode === 'dark') {
      document.querySelectorAll('.section-nav').forEach((el) => {
        ;(el as HTMLElement).style.background = 'rgba(14, 13, 11, 0.92)'
      })
    } else {
      document.querySelectorAll('.section-nav').forEach((el) => {
        ;(el as HTMLElement).style.background = 'rgba(250, 248, 245, 0.92)'
      })
    }
  }, [theme, mode])

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
