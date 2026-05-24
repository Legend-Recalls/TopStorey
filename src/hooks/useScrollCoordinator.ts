import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Slot = {
  x: number
  y: number
  width: number
  height: number
  autoAlpha: number
  scale: number
  zIndex: number
  '--hero-title-size': string
}

type ScrollMapItem = {
  id: string
  type: 'pinned' | 'normal'
  start: number
  end: number
  length: number
}

declare global {
  interface Window {
    __scrollMap?: ScrollMapItem[]
    __scrollRefresh?: () => void
  }
}

const SECTION_IDS = ['latest', 'featured', 'search', 'markets', 'studio', 'about']
const MINIMUM_STORIES = 3

const getMastheadOffset = () => {
  const root = document.documentElement
  const cssVar = getComputedStyle(root).getPropertyValue('--masthead-h').trim()
  if (cssVar.endsWith('rem')) {
    return Number.parseFloat(cssVar) * (Number.parseFloat(getComputedStyle(root).fontSize) || 16)
  }

  const px = Number.parseFloat(cssVar)
  if (!Number.isNaN(px)) return px
  return (Number.parseFloat(getComputedStyle(root).fontSize) || 16) * 2.75
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const normalSectionTop = (id: string) => {
  const el = document.getElementById(id)
  return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : 0
}

export function useScrollCoordinator() {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const cleanupFns: Array<() => void> = []
    const triggers: ScrollTrigger[] = []
    const tweens: gsap.core.Tween[] = []
    let refreshTimer = 0
    let refreshFrame = 0

    const scheduleRefresh = () => {
      window.cancelAnimationFrame(refreshFrame)
      window.clearTimeout(refreshTimer)

      refreshFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.sort()
        ScrollTrigger.refresh()
        updateScrollMap()
      })

      refreshTimer = window.setTimeout(() => {
        ScrollTrigger.sort()
        ScrollTrigger.refresh()
        updateScrollMap()
      }, 300)
    }

    const createLatest = () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 641px)', () => {
      const section = document.getElementById('latest')
      const stage = section?.querySelector<HTMLElement>('.hero-rotation-stage')
      const cards = stage ? gsap.utils.toArray<HTMLElement>('[data-hero-card]', stage) : []
      if (!section || !stage || cards.length < MINIMUM_STORIES) return

      const transitionCount = Math.max(0, cards.length - MINIMUM_STORIES)
      let activeIndex = 0
      let slots: {
        lead: Slot
        sideOne: Slot
        sideTwo: Slot
        buffer: Slot
        exit: Slot
        hidden: Slot
      } | null = null

      const setRoles = (windowStart: number) => {
        cards.forEach((card, index) => {
          card.classList.toggle('is-lead', index === windowStart)
          card.classList.toggle('is-side-1', index === windowStart + 1)
          card.classList.toggle('is-side-2', index === windowStart + 2)
          card.classList.toggle(
            'is-offstage',
            ![windowStart, windowStart + 1, windowStart + 2].includes(index),
          )
        })
      }

      const getSlotForIndex = (index: number, windowStart: number) => {
        if (!slots) return {}
        if (index === windowStart) return slots.lead
        if (index === windowStart + 1) return slots.sideOne
        if (index === windowStart + 2) return slots.sideTwo
        if (index === windowStart + 3) return slots.buffer
        if (index < windowStart) return slots.exit
        return slots.hidden
      }

      const applyWindow = (windowStart: number, animate: boolean) => {
        if (!slots) return
        activeIndex = windowStart
        setRoles(windowStart)

        cards.forEach((card, index) => {
          const target = getSlotForIndex(index, windowStart)
          if (animate) {
            gsap.to(card, {
              ...target,
              duration: 0.95,
              ease: 'power3.inOut',
              overwrite: true,
            })
          } else {
            gsap.set(card, target)
          }
        })
      }

      const buildSlots = () => {
        const bounds = stage.getBoundingClientRect()
        const style = window.getComputedStyle(stage)
        const gap = Number.parseFloat(style.columnGap || style.gap || '8') || 8
        const leadWidth = (bounds.width - gap) * (1.4 / (1.4 + 0.85))
        const sideWidth = bounds.width - leadWidth - gap
        const sideHeight = (bounds.height - gap) / 2
        const sideX = leadWidth + gap
        const side2Y = sideHeight + gap
        const leadTitleSize = window.innerWidth < 1180 ? '2.15rem' : '2.55rem'

        slots = {
          lead: {
            x: 0,
            y: 0,
            width: leadWidth,
            height: bounds.height,
            autoAlpha: 1,
            scale: 1,
            zIndex: 4,
            '--hero-title-size': leadTitleSize,
          },
          sideOne: {
            x: sideX,
            y: 0,
            width: sideWidth,
            height: sideHeight,
            autoAlpha: 1,
            scale: 1,
            zIndex: 3,
            '--hero-title-size': '1.18rem',
          },
          sideTwo: {
            x: sideX,
            y: side2Y,
            width: sideWidth,
            height: sideHeight,
            autoAlpha: 1,
            scale: 1,
            zIndex: 2,
            '--hero-title-size': '1.18rem',
          },
          buffer: {
            x: sideX,
            y: bounds.height + gap * 2,
            width: sideWidth,
            height: sideHeight,
            autoAlpha: 0,
            scale: 0.98,
            zIndex: 1,
            '--hero-title-size': '1.18rem',
          },
          exit: {
            x: -leadWidth * 0.34,
            y: 0,
            width: leadWidth,
            height: bounds.height,
            autoAlpha: 0,
            scale: 0.96,
            zIndex: 1,
            '--hero-title-size': leadTitleSize,
          },
          hidden: {
            x: sideX,
            y: bounds.height + gap * 3,
            width: sideWidth,
            height: sideHeight,
            autoAlpha: 0,
            scale: 0.98,
            zIndex: 0,
            '--hero-title-size': '1.18rem',
          },
        }

        gsap.set(cards, { left: 0, top: 0 })
        applyWindow(activeIndex, false)
      }

      buildSlots()

      const trigger = ScrollTrigger.create({
        id: 'section:latest',
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * (transitionCount + 1))}`,
        pin: true,
        pinSpacing: 'margin',
        pinType: 'fixed',
        invalidateOnRefresh: true,
        refreshPriority: 300,
        onRefreshInit: buildSlots,
        onToggle: (self) => section.classList.toggle('is-latest-pinned', self.isActive),
        onUpdate: (self) => {
          const checkpoint = Math.min(
            transitionCount,
            Math.max(0, Math.floor(self.progress * (transitionCount + 1))),
          )

          if (checkpoint !== activeIndex) applyWindow(checkpoint, true)
        },
      })

      triggers.push(trigger)
        return () => {
          section.classList.remove('is-latest-pinned')
          gsap.killTweensOf(cards)
          gsap.set(cards, { clearProps: 'all' })
        }
      })

      cleanupFns.push(() => mm.revert())
    }

    const createFeatured = () => {
      const section = document.getElementById('featured')
      const track = section?.querySelector<HTMLElement>('.trending-track')
      if (!section || !track) return

      const getScrollAmount = () => {
        const containerWidth = track.parentElement?.clientWidth || window.innerWidth
        return Math.max(0, track.scrollWidth - containerWidth)
      }

      const getDwell = () => Math.round(window.innerHeight * 0.5)
      const state = { scroll: 0, dwell: 0, total: 1 }
      const recalc = () => {
        state.scroll = getScrollAmount()
        state.dwell = getDwell()
        state.total = state.scroll + state.dwell * 2 || 1
      }
      recalc()

      const trigger = ScrollTrigger.create({
        id: 'section:featured',
        trigger: section,
        start: 'top top',
        end: () => `+=${state.total}`,
        pin: true,
        pinSpacing: 'margin',
        pinType: 'fixed',
        invalidateOnRefresh: true,
        refreshPriority: 200,
        onRefresh: recalc,
        onUpdate: (self) => {
          const px = self.progress * state.total
          let x = 0
          if (px <= state.dwell) x = 0
          else if (px >= state.dwell + state.scroll) x = -state.scroll
          else x = -(px - state.dwell)
          gsap.set(track, { x })
        },
      })

      triggers.push(trigger)
    }

    const createMarkets = () => {
      const section = document.getElementById('markets')
      const track = section?.querySelector<HTMLElement>('.markets-track')
      const progressBar = section?.querySelector<HTMLElement>('.markets-scrollbar')
      if (!section || !track || !progressBar) return

      const columns = track.querySelectorAll('.market-chapter').length
      const updateActiveIndex = (idx: number) => {
        section.querySelectorAll('.markets-rail-progress li').forEach((item, i) => {
          item.classList.toggle('is-active', i === idx)
        })

        track.querySelectorAll('.market-chapter').forEach((chapter, i) => {
          chapter.classList.toggle('is-active', i === idx)
        })

        progressBar.querySelectorAll('.markets-scrollbar-segment').forEach((segment, i) => {
          segment.classList.toggle('is-active', i === idx)
        })
      }

      const getScrollDistance = () => {
        const viewport = track.parentElement
        const viewportWidth = viewport?.clientWidth ?? window.innerWidth
        return Math.max(0, track.scrollWidth - viewportWidth)
      }

      const getScrollLength = () => {
        const portion = clamp(window.innerHeight * 0.72, 420, 680)
        return Math.max(portion * columns, getScrollDistance())
      }

      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px)', () => {
        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            id: 'section:markets',
            trigger: section,
            start: 'top top',
            end: () => `+=${getScrollLength()}`,
            pin: true,
            pinSpacing: 'margin',
            pinType: 'fixed',
            scrub: 0.45,
            invalidateOnRefresh: true,
            refreshPriority: 100,
            onUpdate: (self) => {
              const progress = clamp(self.progress, 0, 1)
              progressBar.style.setProperty('--markets-progress', progress.toString())
              updateActiveIndex(Math.min(columns - 1, Math.floor(progress * columns)))
            },
            onRefresh: () => {
              progressBar.style.setProperty('--markets-progress', '0')
              updateActiveIndex(0)
            },
          },
        })

        tweens.push(tween)
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
          gsap.set(track, { clearProps: 'transform' })
        }
      })

      mm.add('(max-width: 899px)', () => {
        gsap.set(track, { clearProps: 'transform' })
        progressBar.style.setProperty('--markets-progress', '0')
        updateActiveIndex(0)
      })

      cleanupFns.push(() => mm.revert())
    }

    const updateScrollMap = () => {
      const triggerById = new Map<string, ScrollTrigger>()
      ScrollTrigger.getAll().forEach((trigger) => {
        const id = String(trigger.vars.id || '')
        if (id.startsWith('section:')) triggerById.set(id.replace('section:', ''), trigger)
      })

      window.__scrollMap = SECTION_IDS.map((id) => {
        const trigger = triggerById.get(id)
        if (trigger) {
          return {
            id,
            type: 'pinned',
            start: Math.round(trigger.start),
            end: Math.round(trigger.end),
            length: Math.round(trigger.end - trigger.start),
          }
        }

        const start = normalSectionTop(id)
        const el = document.getElementById(id)
        return {
          id,
          type: 'normal',
          start,
          end: Math.round(start + (el?.offsetHeight || window.innerHeight)),
          length: Math.round(el?.offsetHeight || window.innerHeight),
        }
      })
    }

    const getTargetTop = (id: string) => {
      const item = window.__scrollMap?.find((entry) => entry.id === id)
      if (item) return Math.max(0, item.start - getMastheadOffset())
      return Math.max(0, normalSectionTop(id) - getMastheadOffset())
    }

    const currentIndex = () => {
      const y = window.scrollY + getMastheadOffset() + 4
      const map = window.__scrollMap || []
      let idx = 0
      map.forEach((item, index) => {
        if (item.start <= y) idx = index
      })
      return idx
    }

    const jumpToId = (id: string, behavior: ScrollBehavior = 'smooth') => {
      window.scrollTo({ top: getTargetTop(id), behavior })
    }

    const onKey = (event: KeyboardEvent) => {
      const target = event.target
      if (target instanceof HTMLElement) {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return
        if (target.isContentEditable) return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) return

      const map = window.__scrollMap || []
      if (!map.length) return

      if (['ArrowDown', 'PageDown', ' '].includes(event.key) && !event.shiftKey) {
        event.preventDefault()
        jumpToId(map[Math.min(map.length - 1, currentIndex() + 1)].id)
      } else if (['ArrowUp', 'PageUp'].includes(event.key) || (event.key === ' ' && event.shiftKey)) {
        event.preventDefault()
        jumpToId(map[Math.max(0, currentIndex() - 1)].id)
      } else if (event.key === 'Home') {
        event.preventDefault()
        jumpToId(map[0].id)
      } else if (event.key === 'End') {
        event.preventDefault()
        jumpToId(map[map.length - 1].id)
      }
    }

    const onHashChange = () => {
      const id = window.location.hash.replace('#', '')
      if (SECTION_IDS.includes(id)) jumpToId(id)
    }

    createLatest()
    createFeatured()
    createMarkets()
    scheduleRefresh()

    document.fonts?.ready.then(scheduleRefresh)
    window.addEventListener('load', scheduleRefresh)
    window.addEventListener('resize', scheduleRefresh)
    window.addEventListener('keydown', onKey)
    window.addEventListener('hashchange', onHashChange)
    window.__scrollRefresh = scheduleRefresh

    return () => {
      window.cancelAnimationFrame(refreshFrame)
      window.clearTimeout(refreshTimer)
      window.removeEventListener('load', scheduleRefresh)
      window.removeEventListener('resize', scheduleRefresh)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('hashchange', onHashChange)
      delete window.__scrollRefresh
      delete window.__scrollMap
      cleanupFns.forEach((cleanup) => cleanup())
      triggers.forEach((trigger) => trigger.kill())
      tweens.forEach((tween) => tween.kill())
    }
  }, [])
}
