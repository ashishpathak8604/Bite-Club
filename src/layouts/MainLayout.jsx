import { Suspense, useEffect } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { motion } from 'framer-motion'
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
      <motion.main
        key={location.pathname}
        id="main-content"
        className="flex-1"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <Suspense fallback={<LoadingState message="Setting the table…" />}>
          {outlet}
        </Suspense>
      </motion.main>
      <Footer />
      <CartDrawer />
      <CartToast />
    </div>
  )
}
