import { useTheme, type Theme } from '../theme/ThemeContext'

// Base button props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  style,
  ...props
}: ButtonProps) {
  const { theme } = useTheme()

  const variantStyles = {
    primary: {
      backgroundColor: theme.colors.primary,
      color: '#fffaf6',
      border: 'none',
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
      color: '#fff',
      border: 'none',
    },
    outline: {
      backgroundColor: 'transparent',
      color: theme.colors.primary,
      border: `1px solid ${theme.colors.border}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: theme.colors.text.primary,
      border: 'none',
    },
  }

  const sizeStyles = {
    sm: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: '0.875rem',
    },
    md: {
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      fontSize: '1rem',
    },
    lg: {
      padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
      fontSize: '1.125rem',
    },
  }

  return (
    <button
      className={className}
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        borderRadius: '999px',
        cursor: 'pointer',
        transition: 'all 180ms ease',
        width: fullWidth ? '100%' : 'auto',
        fontWeight: 700,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  )
}
