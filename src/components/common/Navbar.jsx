import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Menu as MenuIcon, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { navLinks } from '../../data/siteData'
import { PrimaryButton } from './Button'
import { DoodleStar, DoodleSquiggle, DoodleSparkle } from './DoodleElements'
import { lockScroll, unlockScroll } from '../../utils/scroll'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuHeaderVisible, setMenuHeaderVisible] = useState(true)
  const { count, openCart } = useCart()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    lockScroll()
    const onKey = (e) => e.key === 'Escape' && setMobileOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      unlockScroll(prev)
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileOpen])

  const solid = scrolled || !isHome

  return (
    <>
      <header className="fixed inset-x-0 top-2 z-50 px-2 sm:top-4 sm:px-5">
       
<div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3">

  {/* PART 1 — BRAND */}
  <Link
    to="/"
    className={`group flex w-fit items-center gap-2 rounded-full border-[3px] border-choco px-4 py-2 ${
      solid
        ? 'bg-cream/95 shadow-[4px_4px_0_0_#553B32]'
        : 'bg-cream/45 shadow-[3px_3px_0_0_rgba(85,59,50,0.55)]'
    }`}
    aria-label="Bite Club home"
  >
    <span className="relative grid h-10 w-10 place-items-center rounded-full border-[3px] border-choco bg-butter transition-transform duration-300 group-hover:rotate-12">
      <span className="font-display text-lg leading-none">B</span>
      <DoodleStar className="absolute -right-2 -top-2 h-4 w-4" />
    </span>

    <span className="leading-none">
      <span className="block font-display text-lg tracking-wide sm:text-xl">
        BITE CLUB
      </span>
      <span className="hidden text-[9px] font-semibold uppercase tracking-[0.24em] text-choco/60 sm:block">
        Kitchen &amp; Good Moods
      </span>
    </span>
  </Link>


  {/* PART 2 — NAVIGATION */}
  <nav
    className={`hidden items-center gap-1 rounded-full border-[3px] border-choco p-1.5 lg:flex ${
      solid
        ? 'bg-cream/95 shadow-[4px_4px_0_0_#553B32]'
        : 'bg-cream/45 shadow-[3px_3px_0_0_rgba(85,59,50,0.55)]'
    }`}
    aria-label="Main navigation"
  >
    {navLinks.map((link) => (
      <NavLink
        key={link.to}
        to={link.to}
        end={link.to === '/'}
        className={({ isActive }) =>
          `rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
            isActive
              ? 'bg-choco text-cream'
              : 'text-choco/80 hover:bg-white/70 hover:text-choco'
          }`
        }
      >
        {link.label}
      </NavLink>
    ))}
  </nav>


  {/* PART 3 — ACTIONS */}
  <div className="flex items-center justify-self-end gap-1.5 sm:gap-2">

    <Link
      to="/reservation"
    className="hidden items-center gap-1.5 rounded-full border-2 border-choco bg-cream px-4 py-2 text-sm font-semibold text-choco shadow-[2px_2px_0_0_#553B32] transition hover:-translate-y-0.5 hover:bg-butter xl:flex"    >
      <CalendarDays className="h-4 w-4" />
      Reserve
    </Link>

    <button
      type="button"
      onClick={openCart}
      className="relative grid h-11 w-11 place-items-center rounded-full border-2 border-choco bg-white transition hover:-translate-y-0.5 hover:bg-butter"
      aria-label={`Open cart, ${count} items`}
    >
      <ShoppingBag className="h-5 w-5" strokeWidth={2.2} />

      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
            className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full border-2 border-choco bg-coral px-1 font-display text-[10px] leading-none"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>

    <PrimaryButton
      to="/menu"
      size="sm"
      icon={ArrowRight}
      className="hidden sm:inline-flex"
    >
      Order Now
    </PrimaryButton>

    <button
      type="button"
      onClick={() => setMobileOpen(true)}
      className="grid h-11 w-11 place-items-center rounded-full border-2 border-choco bg-white transition hover:bg-butter lg:hidden"
      aria-label="Open navigation menu"
    >
      <MenuIcon className="h-5 w-5" strokeWidth={2.4} />
    </button>

  </div>
</div>

      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[70] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-choco/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l-[3px] border-choco bg-cream"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="halftone pointer-events-none absolute inset-0 opacity-10" aria-hidden="true" />
              <div className="relative flex items-center justify-between border-b-2 border-dashed border-choco/30 px-5 py-4">
                <span className="font-display text-2xl">MENU</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="grid h-11 w-11 place-items-center rounded-full border-2 border-choco bg-white transition hover:bg-coral"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="relative flex flex-1 flex-col justify-center gap-1 px-5" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `group flex items-center justify-between border-b-2 border-dashed border-choco/20 py-3 font-display text-4xl transition-colors ${
                          isActive ? 'text-coral' : 'text-choco hover:text-orange'
                        }`
                      }
                    >
                      {link.label}
                      <ArrowRight className="h-6 w-6 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </NavLink>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <NavLink
                    to="/reservation"
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center justify-between border-b-2 border-dashed border-choco/20 py-3 font-display text-4xl text-choco transition-colors hover:text-orange"
                  >
                    Reserve
                    <CalendarDays className="h-6 w-6" />
                  </NavLink>
                </motion.div>
              </nav>

              <div className="relative space-y-3 px-5 pb-8">
                <DoodleSquiggle className="h-4 w-24 text-choco/50" />
                <PrimaryButton to="/menu" icon={ArrowRight} className="w-full" onClick={() => setMobileOpen(false)}>
                  Order Now
                </PrimaryButton>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false)
                    openCart()
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full border-[3px] border-choco bg-white px-6 py-3 font-semibold"
                >
                  <ShoppingBag className="h-5 w-5" />
                  View Cart ({count})
                </button>
                <p className="flex items-center gap-2 pt-2 text-xs text-choco/50">
                  <DoodleSparkle className="h-3 w-3" /> Demo restaurant experience
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
