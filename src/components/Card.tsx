import { useTheme } from '../theme/ThemeContext'

export interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
}: CardProps) {
  const { theme } = useTheme()

  const variantStyles = {
    default: {
      backgroundColor: theme.colors.surfaceStrong,
      border: `1px solid ${theme.colors.border}`,
      boxShadow: theme.shadows.md,
    },
    elevated: {
      backgroundColor: theme.colors.surfaceStrong,
      border: `1px solid ${theme.colors.border}`,
      boxShadow: theme.shadows.lg,
    },
    outlined: {
      backgroundColor: 'transparent',
      border: `1px solid ${theme.colors.border}`,
      boxShadow: 'none',
    },
  }

  const paddingStyles = {
    none: { padding: 0 },
    sm: { padding: theme.spacing.sm },
    md: { padding: theme.spacing.md },
    lg: { padding: theme.spacing.lg },
  }

  return (
    <div
      className={className}
      style={{
        ...variantStyles[variant],
        ...paddingStyles[padding],
        borderRadius: theme.borderRadius.xl,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

// Card subcomponents for compound pattern
export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { theme } = useTheme()

  return (
    <div
      className={className}
      style={{
        padding: theme.spacing.lg,
        borderBottom: `1px solid ${theme.colors.border}`,
      }}
    >
      {children}
    </div>
  )
}

export function CardBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { theme } = useTheme()

  return (
    <div
      className={className}
      style={{
        padding: theme.spacing.lg,
        color: theme.colors.text.primary,
      }}
    >
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { theme } = useTheme()

  return (
    <div
      className={className}
      style={{
        padding: theme.spacing.lg,
        borderTop: `1px solid ${theme.colors.border}`,
        backgroundColor: theme.colors.surface,
      }}
    >
      {children}
    </div>
  )
}
