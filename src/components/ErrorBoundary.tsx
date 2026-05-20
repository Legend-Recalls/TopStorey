import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('TopStorey ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            minHeight: '100vh',
            padding: '2rem',
            textAlign: 'center',
            fontFamily: "'Manrope', sans-serif",
            background: 'var(--color-background, #faf8f5)',
            color: 'var(--color-foreground, #1a1816)',
          }}
        >
          <div>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.5 }}>
              TopStorey
            </p>
            <h2 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>Something went wrong</h2>
            <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>
              Please refresh the page to try again.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                marginTop: '1.5rem',
                padding: '0.6rem 1.5rem',
                border: '1px solid var(--color-border, #e0dbd4)',
                borderRadius: '999px',
                background: 'transparent',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.875rem',
              }}
            >
              Refresh
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
