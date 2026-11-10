import { useState } from 'react'
import { ArrowRight, CalendarDays, Check, Clock, CreditCard, MapPin, Receipt } from 'lucide-react'
import { motion } from 'framer-motion'
import { PrimaryButton, SecondaryButton } from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import ImageWithFallback from '../components/common/ImageWithFallback'
import { formatINR, loadJSON } from '../utils/format'
import {
  DoodleBurst,
  DoodleCheck,
  DoodleHeart,
  DoodleSparkle,
  DoodleStar,
  DoodleSwirl,
} from '../components/common/DoodleElements'

const floatDoodles = [
  { Component: DoodleStar, className: 'left-[8%] top-[18%] h-8 w-8', delay: 0 },
  { Component: DoodleSparkle, className: 'right-[12%] top-[14%] h-6 w-6', delay: 0.2 },
  { Component: DoodleHeart, className: 'left-[14%] bottom-[22%] h-7 w-7', delay: 0.4 },
  { Component: DoodleBurst, className: 'right-[8%] bottom-[28%] h-10 w-10', delay: 0.1 },
  { Component: DoodleStar, className: 'right-[26%] bottom-[12%] h-6 w-6', delay: 0.3 },
]

export default function OrderSuccess() {
  const [order] = useState(() => loadJSON('biteclub.lastOrder', null))

  if (!order) {
    return (
      <section className="relative overflow-hidden bg-cream px-4 pb-20 pt-36 sm:px-6 sm:pt-44">
        <div className="mx-auto max-w-2xl">
          <EmptyState
            icon={<DoodleCheck className="wiggle h-24 w-24 text-choco" />}
            title="No recent order found"
            description="We could not find an order in this browser. Place a demo order to see the confirmation page."
            action={
              <PrimaryButton to="/menu" icon={ArrowRight}>
                Browse the Menu
              </PrimaryButton>
            }
          />
        </div>
      </section>
    )
  }

  const placed = new Date(order.placedAt)
  const placedLabel = Number.isNaN(placed.getTime())
    ? 'Just now'
    : placed.toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: '2-digit',
      })

  return (
    <>
      <section className="relative overflow-hidden border-b-[3px] border-choco bg-pistachio pb-14 pt-32 sm:pb-20 sm:pt-40">
        <div className="halftone pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden="true" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[30vw] leading-none text-choco/[0.06]"
        >
          YAY
        </span>

        {floatDoodles.map(({ Component, className, delay }, i) => (
          <motion.div
            key={i}
            className={`pointer-events-none absolute hidden sm:block ${className}`}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0, y: [0, -10, 0] }}
            transition={{
              scale: { delay: 0.4 + delay, type: 'spring', stiffness: 260 },
              y: { delay: 1 + delay, duration: 4, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <Component className="h-full w-full text-choco/70" />
          </motion.div>
        ))}

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.15 }}
            className="relative grid h-28 w-28 place-items-center rounded-full border-[6px] border-choco bg-butter shadow-[0_20px_40px_-18px_rgba(85,59,50,0.6)] sm:h-32 sm:w-32"
          >
            <Check className="h-14 w-14 sm:h-16 sm:w-16" strokeWidth={3.5} />
            <DoodleStar className="wiggle absolute -right-4 -top-4 h-9 w-9" />
            <DoodleSwirl className="absolute -bottom-6 -left-6 h-10 w-10 text-choco/50" />
          </motion.div>

          <span className="mt-7 font-script text-2xl text-choco/70">order confirmed</span>
          <h1 className="mt-1 text-balance text-5xl leading-[0.86] sm:text-7xl">
            THANK YOU,
            <br />
            <span className="text-cream" style={{ textShadow: '4px 4px 0 #553B32' }}>
              {order.customer?.fullName?.split(' ')[0] || 'FRIEND'}!
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-pretty text-sm leading-relaxed text-choco/75 sm:text-base">
            Your demo order is confirmed and the kitchen has been (pretend) notified.
            Here is everything you need to remember about it.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-bold uppercase tracking-wide">
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-choco bg-cream/80 px-3.5 py-1.5">
              <Receipt className="h-3.5 w-3.5" />
              {order.orderId}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-choco bg-cream/80 px-3.5 py-1.5">
              <Clock className="h-3.5 w-3.5" />
              ETA {order.eta}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-choco bg-cream/80 px-3.5 py-1.5">
              <CreditCard className="h-3.5 w-3.5" />
              {order.paymentMethod}
            </span>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream py-12 sm:py-16">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[1.8rem] border-[3px] border-choco bg-white/70 p-5 shadow-[5px_5px_0_0_#553B32] sm:p-7">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-2xl">Your order</h2>
                <span className="text-xs font-semibold uppercase tracking-wide text-choco/45">
                  {placedLabel}
                </span>
              </div>

              <ul className="mt-4 divide-y-2 divide-dashed divide-choco/15">
                {order.items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3 py-3">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 border-choco bg-butter">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{item.name}</p>
                      <p className="text-xs text-choco/50">
                        {formatINR(item.price)} × {item.qty}
                      </p>
                    </div>
                    <span className="shrink-0 font-display">
                      {formatINR(item.price * item.qty)}
                    </span>
                  </li>
                ))}
              </ul>

              <dl className="mt-4 space-y-2 border-t-2 border-dashed border-choco/20 pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-choco/60">Subtotal</dt>
                  <dd className="font-semibold">{formatINR(order.totals.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-choco/60">Tax (5%)</dt>
                  <dd className="font-semibold">{formatINR(order.totals.tax)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-choco/60">Delivery</dt>
                  <dd className="font-semibold">
                    {order.totals.delivery === 0 ? 'Free' : formatINR(order.totals.delivery)}
                  </dd>
                </div>
                <div className="flex justify-between border-t-2 border-dashed border-choco/20 pt-3 text-lg">
                  <dt className="font-display">Total paid (demo)</dt>
                  <dd className="font-display">{formatINR(order.totals.total)}</dd>
                </div>
              </dl>
            </div>

            <div className="space-y-4">
              <div className="rounded-[1.8rem] border-[3px] border-choco bg-butter p-5 shadow-[5px_5px_0_0_#553B32]">
                <h2 className="text-xl">Delivering to</h2>
                <div className="mt-3 space-y-2 text-sm text-choco/75">
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      {order.customer?.fullName}
                      <br />
                      {order.customer?.address}, {order.customer?.city}{' '}
                      {order.customer?.postalCode}
                    </span>
                  </p>
                  <p className="text-xs text-choco/50">{order.customer?.email}</p>
                  <p className="text-xs text-choco/50">{order.customer?.phone}</p>
                </div>
                {order.customer?.notes && (
                  <p className="mt-3 rounded-xl border-2 border-dashed border-choco/25 bg-cream/60 p-3 text-xs text-choco/65">
                    <span className="font-semibold">Note:</span> {order.customer.notes}
                  </p>
                )}
              </div>

              <div className="rounded-[1.8rem] border-[3px] border-choco bg-coral p-5 shadow-[5px_5px_0_0_#553B32]">
                <h2 className="text-xl">What happens next?</h2>
                <p className="mt-2 text-sm leading-relaxed text-choco/80">
                  In a real restaurant this is where the kitchen starts cooking. For this
                  demo, nothing is actually prepared, charged or delivered.
                </p>
                <p className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-choco/60">
                  <DoodleCheck className="h-4 w-4" />
                  Cart cleared automatically
                </p>
              </div>

              <div className="rounded-[1.8rem] border-[3px] border-choco bg-white/70 p-5 shadow-[5px_5px_0_0_#553B32]">
                <p className="font-script text-lg text-choco/60">still hungry?</p>
                <div className="mt-3 space-y-2">
                  <PrimaryButton to="/menu" icon={ArrowRight} className="w-full">
                    Order Again
                  </PrimaryButton>
                  <SecondaryButton to="/reservation" icon={CalendarDays} className="w-full">
                    Book a Table
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
            <SecondaryButton to="/" icon={ArrowRight} iconPosition="left">
              Back to Home
            </SecondaryButton>
            <p className="text-xs text-choco/45">
              Demo order — no real payment was processed and no food will arrive.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
