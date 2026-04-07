import { useTheme } from '../theme/ThemeContext'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

export function Input({ error, label, className = '', style, ...props }: InputProps) {
  const { theme } = useTheme()

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: theme.spacing.sm,
            fontSize: '0.875rem',
            fontWeight: 600,
            color: theme.colors.text.primary,
          }}
        >
          {label}
        </label>
      )}
      <input
        className={className}
        style={{
          width: '100%',
          padding: `${theme.spacing.md} ${theme.spacing.lg}`,
          backgroundColor: theme.colors.surfaceStrong,
          border: `1px solid ${error ? '#ef4444' : theme.colors.border}`,
          borderRadius: '999px',
          color: theme.colors.text.primary,
          fontSize: '1rem',
          outline: 'none',
          transition: 'border-color 180ms ease, box-shadow 180ms ease',
          ...style,
        }}
        {...props}
      />
      {error && (
        <span
          style={{
            display: 'block',
            marginTop: theme.spacing.xs,
            color: '#ef4444',
            fontSize: '0.875rem',
          }}
        >
          {error}
        </span>
      )}
    </div>
  )
}
