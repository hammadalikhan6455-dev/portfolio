import { useEffect, useRef, useState } from 'react'

/* ─── useScrollReveal ────────────────────────────────────
   Adds 'visible' class when element enters viewport.
   Pairs with .reveal / .reveal.visible CSS classes.      */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.15, rootMargin: '-40px', ...options }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ─── useCountUp ─────────────────────────────────────────
   Animates a number from 0 to `target` once in view.     */
export function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0)
  const ref    = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start    = performance.now()
        const numeric  = parseFloat(String(target).replace(/[^0-9.]/g, ''))
        const tick     = (now) => {
          const elapsed  = now - start
          const progress = Math.min(elapsed / duration, 1)
          const eased    = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * numeric))
          if (progress < 1) requestAnimationFrame(tick)
          else setCount(numeric)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return { count, ref }
}

/* ─── useDebounce ────────────────────────────────────────*/
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

/* ─── useLocalStorage ────────────────────────────────────*/
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial }
    catch { return initial }
  })
  const set = (v) => {
    setValue(v)
    localStorage.setItem(key, JSON.stringify(v))
  }
  return [value, set]
}
