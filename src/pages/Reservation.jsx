import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  UserRound,
  Users,
} from 'lucide-react'
import PageHero from '../components/common/PageHero'
import { PrimaryButton, SecondaryButton } from '../components/common/Button'
import ImageWithFallback from '../components/common/ImageWithFallback'
import { aboutImages, siteInfo } from '../data/siteData'
import { isValidEmail, isValidPhone, loadJSON, saveJSON } from '../utils/format'
import { scrollToTop } from '../utils/scroll'
import {
  DoodleArrow,
  DoodleCheck,
  DoodleSparkle,
  DoodleStar,
  DoodleSwirl,
} from '../components/common/DoodleElements'

const times = [
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
  '10:00 PM',
]

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  guests: '2',
  requests: '',
}

const today = new Date().toISOString().split('T')[0]

const inputClass = (error) =>
  `w-full rounded-xl border-2 bg-white px-4 py-2.5 text-sm font-medium placeholder:text-choco/35 focus:outline-none focus:ring-2 focus:ring-orange/50 ${
    error ? 'border-coral' : 'border-choco'
  }`

export default function Reservation() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [confirmed, setConfirmed] = useState(null)

  const update = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!isValidPhone(form.phone)) next.phone = 'Enter a valid phone number.'
    if (!isValidEmail(form.email)) next.email = 'Enter a valid email address.'
    if (!form.date) next.date = 'Choose a date.'
    else if (form.date < today) next.date = 'Please choose today or a future date.'
    if (!form.time) next.time = 'Choose a time.'
    const guests = Number(form.guests)
    if (!Number.isFinite(guests) || guests < 1 || guests > 12)
      next.guests = 'Choose between 1 and 12 guests.'
    if (form.requests.length > 240) next.requests = 'Keep requests under 240 characters.'
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

    const reservation = {
      id: `RSV-${Date.now().toString(36).toUpperCase().slice(-6)}`,
      ...form,
      guests: Number(form.guests),
      createdAt: new Date().toISOString(),
    }
    const existing = loadJSON('biteclub.reservations', [])
    saveJSON('biteclub.reservations', [reservation, ...existing])
    setConfirmed(reservation)
    setForm(emptyForm)
    scrollToTop()
  }

  if (confirmed) {
    const dateLabel = new Date(`${confirmed.date}T00:00:00`).toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    return (
      <>
        <section className="relative overflow-hidden border-b-[3px] border-choco bg-pistachio pb-14 pt-32 sm:pb-20 sm:pt-40">
          <div className="halftone pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden="true" />
          <DoodleStar className="wiggle absolute left-[8%] top-[20%] hidden h-10 w-10 text-choco/60 sm:block" />
          <DoodleSparkle className="absolute right-[12%] top-[16%] hidden h-7 w-7 text-choco/50 sm:block" />
          <DoodleSwirl className="absolute bottom-[16%] right-[8%] hidden h-12 w-12 text-choco/40 sm:block" />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
            <motion.div
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 16 }}
              className="grid h-24 w-24 place-items-center rounded-full border-[6px] border-choco bg-butter shadow-[0_20px_40px_-18px_rgba(85,59,50,0.6)]"
            >
              <Check className="h-12 w-12" strokeWidth={3.5} />
            </motion.div>

            <span className="mt-6 font-script text-2xl text-choco/70">table requested</span>
            <h1 className="mt-1 text-balance text-5xl leading-[0.88] sm:text-7xl">
              SEE YOU SOON,
              <br />
              <span className="text-cream" style={{ textShadow: '4px 4px 0 #553B32' }}>
                {confirmed.name.split(' ')[0]}!
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-choco/75 sm:text-base">
              Your demo reservation is saved in this browser. In a real restaurant, the team
              would confirm it by phone or email.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-choco bg-cream/80 px-4 py-2 text-xs font-bold uppercase tracking-wide">
              <DoodleCheck className="h-4 w-4" />
              {confirmed.id}
            </span>
          </div>
        </section>

        <section className="bg-cream py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="rounded-[1.8rem] border-[3px] border-choco bg-white/70 p-6 shadow-[5px_5px_0_0_#553B32] sm:p-8">
              <h2 className="text-2xl">Reservation details</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: UserRound, label: 'Name', value: confirmed.name },
                  { icon: Users, label: 'Guests', value: `${confirmed.guests} people` },
                  { icon: CalendarDays, label: 'Date', value: dateLabel },
                  { icon: Clock, label: 'Time', value: confirmed.time },
                  { icon: Phone, label: 'Phone', value: confirmed.phone },
                  { icon: Mail, label: 'Email', value: confirmed.email },
                ].map((row) => {
                  const Icon = row.icon
                  return (
                    <div key={row.label} className="flex items-start gap-3 rounded-xl bg-cream/70 p-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-choco bg-butter">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-choco/45">
                          {row.label}
                        </p>
                        <p className="truncate text-sm font-semibold">{row.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {confirmed.requests && (
                <div className="mt-4 rounded-xl border-2 border-dashed border-choco/25 bg-cream/60 p-4 text-sm text-choco/70">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-choco/45">
                    Special requests
                  </p>
                  <p className="mt-1">{confirmed.requests}</p>
                </div>
              )}

              <div className="mt-5 flex items-start gap-2 rounded-xl bg-coral/40 p-3 text-xs leading-relaxed text-choco/70">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  This reservation is simulated. It has not been sent to a real restaurant and
                  no table has actually been booked.
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton to="/" icon={ArrowRight} className="w-full sm:w-auto">
                  Back to Home
                </PrimaryButton>
                <SecondaryButton to="/menu" className="w-full sm:w-auto">
                  Explore the Menu
                </SecondaryButton>
                <button
                  type="button"
                  onClick={() => setConfirmed(null)}
                  className="rounded-full px-4 py-3 text-sm font-semibold text-choco/60 underline decoration-dashed underline-offset-4 transition hover:text-choco sm:ml-auto"
                >
                  Make another booking
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title="SAVE YOURSELF"
        script="a seat"
        description="Tell us when you are coming and how many of you there are. This is a simulated booking experience — no real table is reserved."
        tone="coral"
        oversized="table"
      >
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-choco bg-cream/80 px-4 py-2 text-xs font-bold uppercase tracking-wide">
          <CalendarDays className="h-4 w-4" />
          Demo reservation
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-choco bg-cream/80 px-4 py-2 text-xs font-bold uppercase tracking-wide">
          <Users className="h-4 w-4" />
          Up to 12 guests
        </span>
      </PageHero>

      <section className="relative overflow-hidden bg-cream py-12 sm:py-16">
        <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-coral/20 blur-3xl" />
        <DoodleStar className="wiggle absolute left-[4%] top-[8%] hidden h-9 w-9 text-choco/40 lg:block" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <form onSubmit={onSubmit} noValidate className="order-2 lg:order-1">
              <div className="rounded-[1.8rem] border-[3px] border-choco bg-white/70 p-5 shadow-[5px_5px_0_0_#553B32] sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-choco bg-butter">
                    <CalendarDays className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-2xl leading-none">Book a table</h2>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-choco/45">
                      It takes about a minute
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="res-name" className="mb-1.5 block text-sm font-semibold">
                      Full name
                    </label>
                    <input
                      id="res-name"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      className={inputClass(errors.name)}
                    />
                    {errors.name && <p className="mt-1.5 text-xs font-semibold text-coral">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="res-phone" className="mb-1.5 block text-sm font-semibold">
                      Phone number
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="+91 90000 00000"
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.phone)}
                      className={inputClass(errors.phone)}
                    />
                    {errors.phone && <p className="mt-1.5 text-xs font-semibold text-coral">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="res-email" className="mb-1.5 block text-sm font-semibold">
                      Email
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      className={inputClass(errors.email)}
                    />
                    {errors.email && <p className="mt-1.5 text-xs font-semibold text-coral">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="res-date" className="mb-1.5 block text-sm font-semibold">
                      Date
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={(e) => update('date', e.target.value)}
                      aria-invalid={Boolean(errors.date)}
                      className={inputClass(errors.date)}
                    />
                    {errors.date && <p className="mt-1.5 text-xs font-semibold text-coral">{errors.date}</p>}
                  </div>

                  <div>
                    <label htmlFor="res-time" className="mb-1.5 block text-sm font-semibold">
                      Time
                    </label>
                    <select
                      id="res-time"
                      value={form.time}
                      onChange={(e) => update('time', e.target.value)}
                      aria-invalid={Boolean(errors.time)}
                      className={inputClass(errors.time)}
                    >
                      <option value="">Choose a time</option>
                      {times.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {errors.time && <p className="mt-1.5 text-xs font-semibold text-coral">{errors.time}</p>}
                  </div>

                  <div>
                    <label htmlFor="res-guests" className="mb-1.5 block text-sm font-semibold">
                      Number of guests
                    </label>
                    <select
                      id="res-guests"
                      value={form.guests}
                      onChange={(e) => update('guests', e.target.value)}
                      aria-invalid={Boolean(errors.guests)}
                      className={inputClass(errors.guests)}
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                    {errors.guests && <p className="mt-1.5 text-xs font-semibold text-coral">{errors.guests}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="res-requests" className="mb-1.5 block text-sm font-semibold">
                      Special requests (optional)
                    </label>
                    <textarea
                      id="res-requests"
                      rows={3}
                      value={form.requests}
                      onChange={(e) => update('requests', e.target.value)}
                      placeholder="Birthday, allergies, high chair, window seat…"
                      aria-invalid={Boolean(errors.requests)}
                      className={`${inputClass(errors.requests)} resize-none`}
                    />
                    {errors.requests ? (
                      <p className="mt-1.5 text-xs font-semibold text-coral">{errors.requests}</p>
                    ) : (
                      <p className="mt-1.5 text-xs text-choco/45">We will do our best (in theory).</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t-2 border-dashed border-choco/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-choco/45">
                    Saved locally only — no backend involved.
                  </p>
                  <PrimaryButton type="submit" icon={ArrowRight} className="w-full sm:w-auto">
                    Request a Table
                  </PrimaryButton>
                </div>
              </div>
            </form>

            <aside className="order-1 space-y-4 lg:sticky lg:top-28 lg:order-2">
              <div className="overflow-hidden rounded-[1.8rem] border-[3px] border-choco shadow-[5px_5px_0_0_#553B32]">
                <ImageWithFallback
                  src={aboutImages.interior}
                  alt="Cosy restaurant dining room"
                  className="h-48 w-full object-cover"
                />
                <div className="bg-butter p-5">
                  <p className="font-script text-xl text-choco/70">good to know</p>
                  <h2 className="mt-1 text-2xl">COME HUNGRY</h2>
                  <p className="mt-2 text-sm leading-relaxed text-choco/75">
                    Walk-ins are welcome when we have room, but booking ahead is the safer
                    bet — especially on weekends.
                  </p>
                </div>
              </div>

              <div className="rounded-[1.8rem] border-[3px] border-choco bg-white/70 p-5 shadow-[5px_5px_0_0_#553B32]">
                <h2 className="text-xl">Opening hours</h2>
                <ul className="mt-3 space-y-2 text-sm text-choco/70">
                  {siteInfo.hours.map((slot) => (
                    <li key={slot.days} className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                      <span>
                        <span className="block font-semibold text-choco">{slot.days}</span>
                        {slot.time}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 space-y-2 border-t-2 border-dashed border-choco/20 pt-4 text-sm text-choco/70">
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                    {siteInfo.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-orange" />
                    {siteInfo.phone}
                  </p>
                </div>

                <div className="mt-4 flex items-start gap-2 rounded-xl bg-pistachio/40 p-3 text-xs text-choco/65">
                  <DoodleSparkle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    Demo details only. This is a fictional restaurant and the address is not
                    real.
                  </span>
                </div>
              </div>

              <div className="hidden items-center gap-2 rounded-full border-2 border-dashed border-choco/30 px-4 py-2 text-xs font-semibold text-choco/50 sm:inline-flex">
                <DoodleArrow className="h-4 w-8" />
                large group? add it in the notes
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
