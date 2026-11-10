import { Suspense, useEffect } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import CartDrawer from '../components/cart/CartDrawer'
import CartToast from '../components/common/CartToast'
import LoadingState from '../components/common/LoadingState'
import useSmoothScroll from '../hooks/useSmoothScroll'
import usePageMeta from '../hooks/usePageMeta'

export default function MainLayout() {
  const location = useLocation()
  const outlet = useOutlet()
  const lenisRef = useSmoothScroll()
  usePageMeta()

  useEffect(() => {
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
    const timer = setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => clearTimeout(timer)
  }, [location.pathname, lenisRef])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border-[3px] focus:border-choco focus:bg-butter focus:px-5 focus:py-3 focus:font-semibold focus:text-choco"
      >
        Skip to content
      </a>
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          id="main-content"
          className="flex-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <Suspense fallback={<LoadingState message="Setting the table…" />}>
            {outlet}
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <CartDrawer />
      <CartToast />
    </div>
  )
}
