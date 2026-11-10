export const lockScroll = () => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = 'hidden'
  if (window.__lenis) window.__lenis.stop()
}

export const unlockScroll = (previous = '') => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = previous
  if (window.__lenis) window.__lenis.start()
}

export const scrollToTop = (immediate = true) => {
  if (window.__lenis) {
    window.__lenis.scrollTo(0, { immediate })
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
  }
}
