import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Lock, ShoppingBag, UserRound } from 'lucide-react'
import { useCart } from '../context/CartContext'
import PageHero from '../components/common/PageHero'
import CartSummary from '../components/cart/CartSummary'
import EmptyState from '../components/common/EmptyState'
import { PrimaryButton, SecondaryButton } from '../components/common/Button'
import ImageWithFallback from '../components/common/ImageWithFallback'
import { formatINR, isValidEmail, isValidPhone, isValidPostal } from '../utils/format'
import { DoodleCheck, DoodleStar } from '../components/common/DoodleElements'

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  notes: '',
}

const loadSaved = () => {
  try {
    const raw = window.sessionStorage.getItem('biteclub.pendingCustomer')
    return raw ? { ...emptyForm, ...JSON.parse(raw) } : emptyForm
  } catch {
    return emptyForm
  }
}

function Field({ label, name, error, children, hint }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs font-semibold text-coral" role="alert">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-choco/45">{hint}</p>
      )}
    </div>
  )
}

const inputClass = (error) =>
  `w-full rounded-xl border-2 bg-white px-4 py-2.5 text-sm font-medium placeholder:text-choco/35 focus:outline-none focus:ring-2 focus:ring-orange/50 ${
    error ? 'border-coral' : 'border-choco'
  }`

export default function Checkout() {
  const { items, totals, count } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState(loadSaved)
  const [errors, setErrors] = useState({})

  const update = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const next = {}
    if (form.fullName.trim().length < 2) next.fullName = 'Please enter your full name.'
    if (!isValidEmail(form.email)) next.email = 'Enter a valid email address.'
    if (!isValidPhone(form.phone)) next.phone = 'Enter a valid phone number (10–15 digits).'
    if (form.address.trim().length < 5) next.address = 'Please enter your delivery address.'
    if (form.city.trim().length < 2) next.city = 'Please enter your city.'
    if (!isValidPostal(form.postalCode)) next.postalCode = 'Enter a valid 5–6 digit postal code.'
    if (form.notes.length > 240) next.notes = 'Notes must be under 240 characters.'
    return next
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) {
      const first = document.querySelector('[aria-invalid="true"]')
      first?.focus()
      return
    }
    window.sessionStorage.setItem('biteclub.pendingCustomer', JSON.stringify(form))
    navigate('/payment')
  }

  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title="ALMOST"
        script="there"
        description="Tell us where to send the good stuff. This is a demo checkout — no real order is placed and no payment is taken."
        tone="orange"
        oversized="yum"
      >
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-choco bg-cream/80 px-4 py-2 text-xs font-bold uppercase tracking-wide">
          <ShoppingBag className="h-4 w-4" />
          {count} {count === 1 ? 'item' : 'items'}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-choco bg-cream/80 px-4 py-2 text-xs font-bold uppercase tracking-wide">
          <Lock className="h-4 w-4" />
          Demo checkout
        </span>
      </PageHero>

      <section className="relative overflow-hidden bg-cream py-12 sm:py-16">
        <div className="pointer-events-none absolute -left-24 bottom-24 h-72 w-72 rounded-full bg-pistachio/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          {items.length === 0 ? (
            <div className="mx-auto max-w-2xl">
              <EmptyState
                title="Your bag is empty"
                description="You need something in your bag before checking out. The menu is a good place to start."
                action={
                  <PrimaryButton to="/menu" icon={ArrowRight}>
                    Browse the Menu
                  </PrimaryButton>
                }
              />
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
              <form onSubmit={onSubmit} noValidate className="order-2 lg:order-1">
                <div className="rounded-[1.8rem] border-[3px] border-choco bg-white/70 p-5 shadow-[5px_5px_0_0_#553B32] sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-choco bg-butter">
                      <UserRound className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-2xl leading-none">Your details</h2>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-choco/45">
                        Step 1 of 2 · delivery info
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Field label="Full name" name="fullName" error={errors.fullName}>
                        <input
                          id="fullName"
                          name="fullName"
                          autoComplete="name"
                          value={form.fullName}
                          onChange={(e) => update('fullName', e.target.value)}
                          placeholder="Your name"
                          aria-invalid={Boolean(errors.fullName)}
                          className={inputClass(errors.fullName)}
                        />
                      </Field>
                    </div>

                    <Field label="Email" name="email" error={errors.email}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                        className={inputClass(errors.email)}
                      />
                    </Field>

                    <Field label="Phone number" name="phone" error={errors.phone}>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        placeholder="+91 90000 00000"
                        aria-invalid={Boolean(errors.phone)}
                        className={inputClass(errors.phone)}
                      />
                    </Field>

                    <div className="sm:col-span-2">
                      <Field label="Delivery address" name="address" error={errors.address}>
                        <textarea
                          id="address"
                          name="address"
                          rows={3}
                          autoComplete="street-address"
                          value={form.address}
                          onChange={(e) => update('address', e.target.value)}
                          placeholder="Flat / house no, street, area"
                          aria-invalid={Boolean(errors.address)}
                          className={`${inputClass(errors.address)} resize-none`}
                        />
                      </Field>
                    </div>

                    <Field label="City" name="city" error={errors.city}>
                      <input
                        id="city"
                        name="city"
                        autoComplete="address-level2"
                        value={form.city}
                        onChange={(e) => update('city', e.target.value)}
                        placeholder="Demo City"
                        aria-invalid={Boolean(errors.city)}
                        className={inputClass(errors.city)}
                      />
                    </Field>

                    <Field label="Postal code" name="postalCode" error={errors.postalCode}>
                      <input
                        id="postalCode"
                        name="postalCode"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        value={form.postalCode}
                        onChange={(e) => update('postalCode', e.target.value)}
                        placeholder="000000"
                        aria-invalid={Boolean(errors.postalCode)}
                        className={inputClass(errors.postalCode)}
                      />
                    </Field>

                    <div className="sm:col-span-2">
                      <Field
                        label="Order notes (optional)"
                        name="notes"
                        error={errors.notes}
                        hint="Allergies, delivery instructions, or a note for the kitchen."
                      >
                        <textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          value={form.notes}
                          onChange={(e) => update('notes', e.target.value)}
                          placeholder="Anything we should know?"
                          aria-invalid={Boolean(errors.notes)}
                          className={`${inputClass(errors.notes)} resize-none`}
                        />
                      </Field>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 border-t-2 border-dashed border-choco/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <SecondaryButton to="/cart" size="sm">
                      Back to cart
                    </SecondaryButton>
                    <PrimaryButton type="submit" icon={ArrowRight} className="w-full sm:w-auto">
                      Continue to Payment
                    </PrimaryButton>
                  </div>
                </div>

                <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-choco/45">
                  <DoodleCheck className="h-4 w-4" />
                  Demo only — no personal data is sent anywhere.
                </p>
              </form>

              <aside className="order-1 lg:sticky lg:top-28 lg:order-2">
                <div className="rounded-[1.8rem] border-[3px] border-choco bg-white/70 p-5 shadow-[5px_5px_0_0_#553B32]">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-2xl">Order summary</h2>
                    <span className="rounded-full border-2 border-choco bg-butter px-2.5 py-0.5 text-xs font-bold">
                      {count} items
                    </span>
                  </div>

                  <ul className="mt-4 max-h-64 space-y-2.5 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <li key={item.id} className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border-2 border-choco bg-butter">
                          <ImageWithFallback
                            src={item.image}
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

                  <div className="mt-4 flex items-start gap-2 rounded-xl bg-pistachio/40 p-3 text-xs text-choco/70">
                    <DoodleStar className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>
                      Payment is simulated on the next step. No card details are collected or
                      stored.
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
