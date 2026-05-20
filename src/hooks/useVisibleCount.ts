import { useState, useEffect } from 'react'

/**
 * Returns the number of list items to display based on viewport height.
 * Breakpoints: ≤600px → 2, ≤750px → 3, ≤900px → 4, >900px → 5
 */
export function useVisibleCount(max: number): number {
  const [count, setCount] = useState(max)

  useEffect(() => {
    function calc() {
      const h = window.innerHeight
      if (h <= 600) setCount(Math.min(max, 2))
      else if (h <= 750) setCount(Math.min(max, 3))
      else if (h <= 900) setCount(Math.min(max, 4))
      else setCount(Math.min(max, 5))
    }

    calc()
    window.addEventListener('resize', calc, { passive: true })
    return () => window.removeEventListener('resize', calc)
  }, [max])

  return count
}
