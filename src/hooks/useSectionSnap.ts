import { useEffect } from 'react'

/**
 * useSectionSnap
 * ----------------
 * Dynamic "jump to next/previous section" navigation that doesn't rely on
 * `index * window.innerHeight`. Instead, every keystroke re-measures the
 * actual top of each section via `getBoundingClientRect`, so the jump is
 * always perfectly aligned regardless of:
 *   - viewport height changes (resize, mobile URL bar, devtools)
 *   - section heights that aren't exactly 100vh (padding, dynamic content)
 *   - font scaling / zoom
 *   - the fixed masthead height (read from CSS var --masthead-h, fallback 2.75rem)
 *
 * Bindings:
 *   ArrowDown / PageDown / Space      -> next section
 *   ArrowUp   / PageUp   / Shift+Space -> previous section
 *   Home                              -> first section
 *   End                               -> last section
 *
 * The hook is a no-op if the user is typing inside an input, textarea, or
 * contenteditable element.
 */
export function useSectionSnap(sectionIds: string[]) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const getMastheadOffset = (): number => {
      const root = document.documentElement
      const cssVar = getComputedStyle(root).getPropertyValue('--masthead-h').trim()
      if (cssVar) {
        // Support px or rem
        if (cssVar.endsWith('rem')) {
          const rem = parseFloat(getComputedStyle(root).fontSize) || 16
          return parseFloat(cssVar) * rem
        }
        const px = parseFloat(cssVar)
        if (!Number.isNaN(px)) return px
      }
      // Fallback: 2.75rem (matches the value used in 15-about.css)
      const rem = parseFloat(getComputedStyle(root).fontSize) || 16
      return 2.75 * rem
    }

    const getSectionTops = (): { id: string; top: number; el: HTMLElement }[] => {
      const scrollY = window.scrollY
      const els: HTMLElement[] = []
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) els.push(el)
      }
      const out = els.map(el => {
        const top = Math.round(el.getBoundingClientRect().top + scrollY)
        return { id: el.id, el: el, top: top }
      })
      out.sort((a, b) => a.top - b.top)
      return out
    }

    const isTypingTarget = (target: EventTarget | null): boolean => {
      if (!(target instanceof HTMLElement)) return false
      const tag = target.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
      if (target.isContentEditable) return true
      return false
    }

    let isAnimating = false
    const scrollToIndex = (idx: number) => {
      const tops = getSectionTops()
      if (!tops.length) return
      const clamped = Math.max(0, Math.min(tops.length - 1, idx))
      const offset = getMastheadOffset()
      const targetY = Math.max(0, tops[clamped].top - offset)

      isAnimating = true
      window.scrollTo({ top: targetY, behavior: 'smooth' })
      // Release the lock once the smooth scroll settles
      window.setTimeout(() => {
        isAnimating = false
      }, 700)
    }

    const currentIndex = (tops: { top: number }[]): number => {
      const offset = getMastheadOffset()
      const y = window.scrollY + offset + 4 // small fudge so we don't match exactly
      let idx = 0
      for (let i = 0; i < tops.length; i++) {
        if (tops[i].top <= y) idx = i
      }
      return idx
    }

    const jump = (direction: 1 | -1) => {
      const tops = getSectionTops()
      if (!tops.length) return
      const idx = currentIndex(tops)
      scrollToIndex(idx + direction)
    }

    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault()
          jump(1)
          break
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          jump(-1)
          break
        case ' ':
          e.preventDefault()
          jump(e.shiftKey ? -1 : 1)
          break
        case 'Home':
          e.preventDefault()
          scrollToIndex(0)
          break
        case 'End':
          e.preventDefault()
          scrollToIndex(9999)
          break
      }
    }

    // Hash navigation: if user clicks an in-page link like /#markets,
    // realign using our offset so the section doesn't sit under the masthead.
    const onHashChange = () => {
      const id = window.location.hash.replace('#', '')
      if (!id) return
      const tops = getSectionTops()
      const match = tops.find(t => t.id === id)
      if (!match) return
      const offset = getMastheadOffset()
      window.scrollTo({ top: Math.max(0, match.top - offset), behavior: 'smooth' })
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('hashchange', onHashChange)

    // Expose a tiny debug helper on window for manual testing in the console.
    ;(window as unknown as { __snapJump?: (dir: 1 | -1) => void }).__snapJump = jump

    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('hashchange', onHashChange)
      delete (window as unknown as { __snapJump?: unknown }).__snapJump
      void isAnimating // keep reference; reserved for future wheel/touch hookup
    }
  }, [sectionIds])
}

export default useSectionSnap
