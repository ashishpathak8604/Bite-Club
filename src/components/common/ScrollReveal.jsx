import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollReveal({
  children,
  className = '',
  y = 42,
  delay = 0,
  stagger = 0,
  duration = 0.9,
  start = 'top 86%',
  as: Tag = 'div',
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = stagger > 0 ? Array.from(el.children) : el
    if (stagger > 0 && targets.length === 0) return

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        opacity: 0,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [y, delay, stagger, duration, start])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
