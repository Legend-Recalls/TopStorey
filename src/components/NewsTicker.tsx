import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface NewsTickerProps {
  items: string[]
}

export function NewsTicker({ items }: NewsTickerProps) {
  const doubled = [...items, ...items]
  const tickerRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (!tickerRef.current) return

    // Calculate duration based on content width to keep speed consistent
    const contentWidth = tickerRef.current.offsetWidth / 2
    const duration = 38 // base duration for 50% scroll

    tweenRef.current = gsap.to(tickerRef.current, {
      x: -contentWidth,
      duration: duration,
      ease: 'none',
      repeat: -1,
    })

    return () => {
      tweenRef.current?.kill()
    }
  }, [])

  const handleMouseEnter = () => {
    gsap.to(tweenRef.current, { timeScale: 0.25, duration: 0.5, overwrite: true })
  }

  const handleMouseLeave = () => {
    gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5, overwrite: true })
  }

  return (
    <div
      className="news-ticker"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="ticker-badge">
        <span className="live-dot" />
        Live
      </span>
      <div className="ticker-track">
        <div ref={tickerRef} className="ticker-content">
          {doubled.map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
