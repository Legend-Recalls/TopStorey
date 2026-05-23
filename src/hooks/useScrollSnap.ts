/**
 * useScrollSnap — wheel / trackpad / touch smooth-snap to sections.
 *
 * Design constraints, learned the hard way:
 *
 * 1. The page contains a GSAP pinned scrub section (`FeaturedTrendingSection`)
 *    that consumes many viewport-heights of vertical scroll to drive a
 *    *horizontal* scrub. If we snap while the user is inside that pin we will
 *    fight ScrollTrigger and the horizontal animation breaks. So before doing
 *    anything we ask ScrollTrigger if any pin is currently active and, if so,
 *    we step aside.
 *
 * 2. Section heights are NOT all 100vh (markets/search grids, about block).
 *    Targets must come from `getBoundingClientRect().top + scrollY`, measured
 *    at the moment of the snap — not at mount time.
 *
 * 3. Native CSS `scroll-snap-type: y mandatory` would be simpler but it
 *    a) cannot be conditionally disabled per-region (so it'd break the pin),
 *    b) overrides GSAP's programmatic `scrollTo`, and
 *    c) jitters on macOS trackpads with inertial scrolling. We implement it in
 *    JS so we can opt out during pins and during our own snap animations.
 *
 * 4. The masthead is sticky (≈2.75rem). The hook subtracts the live
 *    `--masthead-h` CSS var so headings don't hide under it.
 *
 * 5. Programmatic GSAP scrolls trigger `wheel`/`scroll` events too. We guard
 *    against re-entrancy with an `isAnimating` flag and a short cool-down.
 */

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

interface Options {
  /** Min wheel delta to count as a deliberate scroll gesture (filters trackpad jitter). */
  wheelThreshold?: number
  /** ms of wheel-idle before we commit to a snap (lets trackpad inertia finish). */
  idleMs?: number
  /** Duration of the snap tween in seconds. */
  duration?: number
  /** Easing for the snap tween. */
  ease?: string
  /** Cool-down after a snap before another can fire. */
  cooldownMs?: number
}

const isEditable = (el: EventTarget | null): boolean => {
  if (!(el instanceof HTMLElement)) return false
  const tag = el.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  if (el.isContentEditable) return true
  return false
}

const getMastheadOffset = (): number => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--masthead-h').trim()
  if (raw.endsWith('rem')) {
    const rem = parseFloat(raw)
    const base = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    return rem * base
  }
  if (raw.endsWith('px')) return parseFloat(raw)
  // fallback matches the `2.75rem` used in 15-about.css
  return 2.75 * 16
}

/**
 * Is the viewport currently inside a *pinned* ScrollTrigger?
 * If yes, the user is scrubbing the pinned animation — leave them alone.
 */
const isInsideActivePin = (): boolean => {
  const triggers = ScrollTrigger.getAll()
  const scrollY = window.scrollY
  for (const t of triggers) {
    if (!t.pin) continue
    // Fast path: isActive flag
    if (t.isActive) return true
    // Fallback 1: check if scroll position is within the pin range
    if (typeof t.start === 'number' && typeof t.end === 'number') {
      if (scrollY >= t.start - 2 && scrollY <= t.end + 2) return true
    }
    // Fallback 2: check if the pinned element is currently position:fixed
    // (GSAP sets this during pin with pinType: 'fixed')
    const pinStyle = getComputedStyle(t.pin)
    if (pinStyle.position === 'fixed') return true
  }
  return false
}

const isInsideNativeScrollRegion = (): boolean => {
  const probeY = window.innerHeight * 0.5
  const regions = document.querySelectorAll<HTMLElement>('[data-scroll-region="native"]')
  for (const region of regions) {
    const rect = region.getBoundingClientRect()
    if (rect.top <= probeY && rect.bottom >= probeY) return true
  }
  return false
}

export const useScrollSnap = (sectionIds: string[], options: Options = {}): void => {
  const {
    wheelThreshold = 8,
    idleMs = 90,
    duration = 0.75,
    ease = 'power2.inOut',
    cooldownMs = 250,
  } = options

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return // honor accessibility — no auto-snap

    let isAnimating = false
    let lastSnapAt = 0
    let idleTimer: number | undefined
    let accumulatedDelta = 0
    let lastDirection: 1 | -1 | 0 = 0
    let touchStartY: number | null = null

    /** Get fresh, sorted section positions (top of each, masthead-corrected). */
    const measure = (): { id: string; top: number }[] => {
      const offset = getMastheadOffset()
      return sectionIds
        .map((id) => {
          const el = document.getElementById(id)
          if (!el) return null
          const rect = el.getBoundingClientRect()
          return { id, top: Math.max(0, rect.top + window.scrollY - offset) }
        })
        .filter((s): s is { id: string; top: number } => s !== null)
        .sort((a, b) => a.top - b.top)
    }

    /** Find the index of the section the viewport "belongs to" right now. */
    const currentIndex = (sections: { id: string; top: number }[]): number => {
      const y = window.scrollY
      // Add a small fudge so we count as "on" a section once we're within ~1/3 vp.
      const fudge = window.innerHeight * 0.33
      let idx = 0
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].top <= y + fudge) idx = i
        else break
      }
      return idx
    }

    const snapTo = (top: number) => {
      if (isAnimating) return
      isAnimating = true
      lastSnapAt = performance.now()
      gsap.to(window, {
        duration,
        ease,
        scrollTo: { y: top, autoKill: true }, // autoKill lets a real user scroll abort the tween
        onComplete: () => {
          isAnimating = false
          accumulatedDelta = 0
          lastDirection = 0
        },
        onInterrupt: () => {
          isAnimating = false
          accumulatedDelta = 0
          lastDirection = 0
        },
      })
    }

    const commitSnap = (direction: 1 | -1) => {
      if (isAnimating) return
      if (performance.now() - lastSnapAt < cooldownMs) return
      if (isInsideNativeScrollRegion()) return
      if (isInsideActivePin()) return // ⬅️ critical: don't fight the GSAP pin

      const sections = measure()
      if (sections.length === 0) return

      const idx = currentIndex(sections)
      const targetIdx = Math.min(sections.length - 1, Math.max(0, idx + direction))
      const target = sections[targetIdx]

      // Don't fire if we're effectively already there (avoids twitch at boundaries).
      if (Math.abs(window.scrollY - target.top) < 4) return

      snapTo(target.top)
    }

    const onWheel = (e: WheelEvent) => {
      if (isEditable(e.target)) return
      if (isAnimating) {
        // Swallow further wheel input while we animate so trackpad inertia
        // doesn't queue a second snap on top of the first.
        e.preventDefault()
        return
      }
      if (isInsideNativeScrollRegion()) return
      if (isInsideActivePin()) return // inside the horizontal scrub — native scroll drives GSAP

      // Extra guard: if event target is inside a pinned section (position:fixed),
      // step aside — catches cases where ScrollTrigger.isActive hasn't synced yet.
      let el = e.target as HTMLElement | null
      while (el) {
        if (el.classList.contains('snap-section') && getComputedStyle(el).position === 'fixed') return
        el = el.parentElement
      }

      // Normalize: deltaMode 1 = lines, 2 = pages
      const delta =
        e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY
      if (Math.abs(delta) < wheelThreshold) return

      const dir: 1 | -1 = delta > 0 ? 1 : -1
      if (dir !== lastDirection) {
        accumulatedDelta = 0
        lastDirection = dir
      }
      accumulatedDelta += delta

      // Debounce: wait until wheel events go quiet before snapping. This is what
      // makes trackpad inertia (which fires dozens of small events) feel right —
      // we don't snap on the first tick; we snap when the gesture *settles*.
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        if (Math.abs(accumulatedDelta) >= wheelThreshold) commitSnap(dir)
      }, idleMs)
    }

    const onTouchStart = (e: TouchEvent) => {
      if (isEditable(e.target)) return
      touchStartY = e.touches[0]?.clientY ?? null
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY == null) return
      if (isEditable(e.target)) {
        touchStartY = null
        return
      }
      const endY = e.changedTouches[0]?.clientY ?? touchStartY
      const dy = touchStartY - endY // positive = swipe up = scroll down
      touchStartY = null
      if (Math.abs(dy) < 30) return // ignore taps / tiny drags
      commitSnap(dy > 0 ? 1 : -1)
    }

    // Use { passive: false } on wheel so we can preventDefault during an active
    // tween. (We deliberately do NOT preventDefault during pinned regions —
    // GSAP needs the native scroll there.)
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      window.clearTimeout(idleTimer)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [sectionIds, wheelThreshold, idleMs, duration, ease, cooldownMs])
}
