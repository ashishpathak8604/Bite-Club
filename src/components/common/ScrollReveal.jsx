import { useEffect, useRef } from 'react'

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

    const targets = stagger > 0 ? Array.from(el.children) : [el]
    if (targets.length === 0) return

    targets.forEach((target, index) => {
      target.style.opacity = '0'
      target.style.transform = `translate3d(0, ${y}px, 0)`
      target.style.transition = `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${
        delay + index * stagger
      }s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay + index * stagger}s`
      target.style.willChange = 'opacity, transform'
    })

    const reveal = () => {
      targets.forEach((target) => {
        target.style.opacity = '1'
        target.style.transform = 'translate3d(0, 0, 0)'

        const done = () => {
          target.style.opacity = ''
          target.style.transform = ''
          target.style.transition = ''
          target.style.willChange = ''
        }
        target.addEventListener('transitionend', done, { once: true })
      })
    }

    const percentage = start.startsWith('top ') ? Number.parseFloat(start.slice(4)) : NaN
    const rootMargin = Number.isFinite(percentage) ? `0px 0px ${percentage - 100}% 0px` : '0px'

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal()
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      targets.forEach((target) => {
        target.style.opacity = ''
        target.style.transform = ''
        target.style.transition = ''
        target.style.willChange = ''
      })
    }
  }, [y, delay, stagger, duration, start])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
