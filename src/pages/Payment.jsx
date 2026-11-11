import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Banknote,
  Check,
  CreditCard,
  Lock,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import PageHero from '../components/common/PageHero'
import CartSummary from '../components/cart/CartSummary'
import EmptyState from '../components/common/EmptyState'
import { PrimaryButton, SecondaryButton } from '../components/common/Button'
import ImageWithFallback from '../components/common/ImageWithFallback'
import { unsplashSrcSet } from '../utils/images'
import { formatINR, makeOrderId, saveJSON } from '../utils/format'
import { DoodlePizza, DoodleStar } from '../components/common/DoodleElements'
import { lockScroll, unlockScroll } from '../utils/scroll'

const methods = [
  {
    id: 'upi',
    label: 'UPI',
    icon: Smartphone,
    description: 'Pay with any UPI app — demo only',
    note: 'Demo UPI ID: biteclub@demo',
  },
  {
    id: 'card',
    label: 'Card',
    icon: CreditCard,
    description: 'Visa, Mastercard or RuPay — demo only',
    note: 'Demo card ending 4242',
  },
  {
    id: 'cod',
    label: 'Cash on delivery',
    icon: Banknote,
    description: 'Pay when your order arrives',
    note: 'Have the exact amount ready if you can',
  },
]

const steps = ['Cart', 'Details', 'Payment']

export default function Payment() {
  const { items, totals, count, clearCart } = useCart()
  const navigate = useNavigate()
  const [method, setMethod] = useState('upi')
  const [processing, setProcessing] = useState(false)
  const timer = useRef(null)
  const [customer] = useState(() => {
    try {
      const raw = window.sessionStorage.getItem('biteclub.pendingCustomer')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => () => clearTimeout(timer.current), [])

  useEffect(() => {
    if (!processing) return
    const previous = document.body.style.overflow
    lockScroll()
    return () => {
      unlockScroll(previous)
    }
  }, [processing])

  const selected = methods.find((m) => m.id === method)

  const pay = () => {
    if (processing) return
    setProcessing(true)
    timer.current = setTimeout(() => {
      const order = {
        orderId: makeOrderId(),
        items: items.map(({ id, name, price, qty, image }) => ({ id, name, price, qty, image })),
        totals,
        paymentMethod: selected.label,
        customer,
        placedAt: new Date().toISOString(),
        eta: '30–40 minutes',
      }
      saveJSON('biteclub.lastOrder', order)
      window.sessionStorage.removeItem('biteclub.pendingCustomer')
      clearCart()
      navigate('/order-success', { replace: true })
    }, 2200)
  }

  const ready = items.length > 0 && customer

  return (
    <>
      <PageHero
        eyebrow="Payment"
        title="PAYMENT"
        script="time"
        description="A completely simulated payment step. Pick a method, watch the demo process, and get a mock order confirmation. No real money moves."
        tone="pistachio"
        oversized="pay"
      >
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-choco bg-cream/80 px-4 py-2 text-xs font-bold uppercase tracking-wide">
          <Lock className="h-4 w-4" />
          Step 2 of 2
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-choco bg-cream/80 px-4 py-2 text-xs font-bold uppercase tracking-wide">
          <ShieldCheck className="h-4 w-4" />
          No real payment
        </span>
      </PageHero>

      <section className="relative overflow-hidden bg-cream py-12 sm:py-16">
        <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-butter/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex items-center justify-center gap-2 sm:gap-4">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`grid h-7 w-7 place-items-center rounded-full border-2 border-choco text-xs font-bold ${
                      i <= 1 ? 'bg-pistachio' : 'bg-butter'
                    }`}
                  >
                    {i <= 1 ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                  </span>
                  <span
                    className={`text-xs font-semibold uppercase tracking-wide sm:text-sm ${
                      i === 2 ? 'text-choco' : 'text-choco/45'
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <span className="h-0.5 w-6 bg-choco/25 sm:w-10" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          {!ready ? (
            <div className="mx-auto max-w-2xl">
              <EmptyState
                title={items.length === 0 ? 'Nothing to pay for yet' : 'Your details are missing'}
                description={
                  items.length === 0
                    ? 'Add a few dishes to your bag and come back to complete the demo payment.'
                    : 'We need your delivery details before payment. Head back to checkout and fill in the form.'
                }
                action={
                  <PrimaryButton to={items.length === 0 ? '/menu' : '/checkout'} icon={ArrowRight}>
                    {items.length === 0 ? 'Browse the Menu' : 'Back to Checkout'}
                  </PrimaryButton>
                }
              />
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div className="order-2 lg:order-1">
                <div className="rounded-[1.8rem] border-[3px] border-choco bg-white/70 p-5 shadow-[5px_5px_0_0_#553B32] sm:p-7">
                  <h2 className="text-2xl">Choose a payment method</h2>
                  <p className="mt-1 text-sm text-choco/55">
                    All three options are simulated for this demo.
                  </p>

                  <div className="mt-5 space-y-3">
                    {methods.map((option) => {
                      const Icon = option.icon
                      const active = method === option.id
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setMethod(option.id)}
                          aria-pressed={active}
                          className={`flex w-full items-center gap-4 rounded-2xl border-[3px] p-4 text-left transition ${
                            active
                              ? 'border-choco bg-butter shadow-[4px_4px_0_0_#553B32]'
                              : 'border-choco/25 bg-white hover:border-choco hover:bg-cream'
                          }`}
                        >
                          <span
                            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-choco ${
                              active ? 'bg-choco text-cream' : 'bg-cream'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-display text-lg leading-none">
                              {option.label}
                            </span>
                            <span className="mt-1 block text-xs text-choco/55">
                              {option.description}
                            </span>
                          </span>
                          <span
                            className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-choco ${
                              active ? 'bg-pistachio' : 'bg-transparent'
                            }`}
                          >
                            {active && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-5 rounded-2xl border-2 border-dashed border-choco/30 bg-cream/60 p-4">
                    {method === 'upi' && (
                      <div className="flex flex-col items-center gap-4 sm:flex-row">
                        <FakeQr />
                        <div>
                          <p className="font-display text-lg">Scan &amp; pay (not really)</p>
                          <p className="mt-1 text-sm text-choco/60">{selected.note}</p>
                          <p className="mt-2 text-xs text-choco/45">
                            No UPI app is opened and no request is sent.
                          </p>
                        </div>
                      </div>
                    )}

                    {method === 'card' && (
                      <div className="flex flex-col items-center gap-4 sm:flex-row">
                        <div className="relative h-32 w-52 shrink-0 rotate-[-4deg] overflow-hidden rounded-2xl border-[3px] border-choco bg-choco p-4 text-cream shadow-[4px_4px_0_0_#F7A36C]">
                          <div className="halftone-cream absolute inset-0 opacity-20" />
                          <div className="relative flex h-full flex-col justify-between">
                            <div className="flex items-center justify-between">
                              <span className="font-display text-sm tracking-widest">BITE CLUB</span>
                              <DoodleStar className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-body text-lg tracking-[0.2em]">•••• 4242</p>
                              <p className="mt-1 text-[9px] uppercase tracking-widest text-cream/50">
                                demo card · not valid
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="font-display text-lg">Demo card</p>
                          <p className="mt-1 text-sm text-choco/60">{selected.note}</p>
                          <p className="mt-2 text-xs text-choco/45">
                            Card details are never collected, entered or stored.
                          </p>
                        </div>
                      </div>
                    )}

                    {method === 'cod' && (
                      <div className="flex items-start gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-choco bg-pistachio">
                          <Banknote className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-display text-lg">Pay at the door</p>
                          <p className="mt-1 text-sm text-choco/60">
                            In a real restaurant you would hand over cash or card on delivery.
                            For this demo, we simply mark the order as paid.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 border-t-2 border-dashed border-choco/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <SecondaryButton to="/checkout" size="sm">
                      Back to details
                    </SecondaryButton>
                    <PrimaryButton onClick={pay} icon={ArrowRight} className="w-full sm:w-auto">
                      Pay {formatINR(totals.total)} (demo)
                    </PrimaryButton>
                  </div>
                </div>

                <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-choco/45">
                  <Lock className="h-3.5 w-3.5" />
                  Demonstration only. No payment gateway is connected.
                </p>
              </div>

              <aside className="order-1 lg:sticky lg:top-28 lg:order-2">
                <div className="rounded-[1.8rem] border-[3px] border-choco bg-white/70 p-5 shadow-[5px_5px_0_0_#553B32]">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-2xl">Your order</h2>
                    <span className="rounded-full border-2 border-choco bg-butter px-2.5 py-0.5 text-xs font-bold">
                      {count} items
                    </span>
                  </div>

                  <ul className="mt-4 max-h-56 space-y-2.5 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <li key={item.id} className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border-2 border-choco bg-butter">
                          <ImageWithFallback
                            src={item.image}
                            srcSet={unsplashSrcSet(item.image, [96, 144, 192])}
                            sizes="48px"
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{item.name}</p>
                          <p className="text-xs text-choco/50">Qty {item.qty}</p>
                        </div>
                        <span className="shrink-0 text-sm font-semibold">
                          {formatINR(item.price * item.qty)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <CartSummary totals={totals} className="mt-4 border-choco/20 bg-transparent p-0" />

                  <div className="mt-4 rounded-xl border-2 border-choco/20 bg-cream/70 p-3 text-xs text-choco/60">
                    <p className="font-semibold text-choco">Delivering to</p>
                    <p className="mt-1">{customer.fullName}</p>
                    <p>
                      {customer.address}, {customer.city} {customer.postalCode}
                    </p>
                    <p className="mt-1">{customer.phone}</p>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {processing && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-choco/85 p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="status"
            aria-live="assertive"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="w-full max-w-sm rounded-[2rem] border-[3px] border-cream bg-cream p-8 text-center shadow-2xl"
            >
              <div className="relative mx-auto h-24 w-24">
                <DoodlePizza className="spin-slow h-24 w-24 text-choco" />
                <span className="absolute -right-1 -top-1 grid h-8 w-8 place-items-center rounded-full border-2 border-choco bg-butter">
                  <span className="h-2.5 w-2.5 animate-ping rounded-full bg-choco" />
                </span>
              </div>
              <h2 className="mt-5 text-3xl">Processing…</h2>
              <p className="mt-2 text-sm text-choco/65">
                Simulating a {selected.label.toLowerCase()} payment. Do not refresh — this
                will only take a moment.
              </p>
              <div className="mt-5 h-3 w-full overflow-hidden rounded-full border-2 border-choco bg-white">
                <motion.div
                  className="h-full bg-pistachio"
                  initial={{ width: '8%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.1, ease: 'easeInOut' }}
                />
              </div>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-choco/40">
                Demo payment · no real charge
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function FakeQr() {
  const cells = Array.from({ length: 49 }, (_, i) => {
    const row = Math.floor(i / 7)
    const col = i % 7
    const corner =
      (row < 2 && col < 2) || (row < 2 && col > 4) || (row > 4 && col < 2)
    return corner || (row * 3 + col * 5 + i) % 3 === 0
  })

  return (
    <div className="grid h-28 w-28 shrink-0 grid-cols-7 gap-0.5 rounded-lg border-[3px] border-choco bg-white p-2">
      {cells.map((filled, i) => (
        <span key={i} className={`rounded-[1px] ${filled ? 'bg-choco' : 'bg-transparent'}`} />
      ))}
    </div>
  )
}
