import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export default function useSmoothScroll() {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      autoRaf: true,
    })
    lenisRef.current = lenis
    window.__lenis = lenis

    return () => {
      lenis.destroy()
      lenisRef.current = null
      if (window.__lenis === lenis) delete window.__lenis
    }
  }, [])

  return lenisRef
}
