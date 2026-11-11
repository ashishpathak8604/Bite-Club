
import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { navLinks, siteInfo } from '../../data/siteData'
import ImageWithFallback from './ImageWithFallback'
import { unsplashSrcSet } from '../../utils/images'
import {
  DoodleArrow,
  DoodleBurst,
  DoodleChili,
  DoodleHeart,
  DoodlePizza,
  DoodleSparkle,
  DoodleStar,
  DoodleSwirl,
  DoodleSquiggle,
} from './DoodleElements'

const floatingImages = [
  {
    src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80',
    alt: 'Burger',
    className: 'left-[17%] top-[30%] h-40 w-40 lg:left-[29%] lg:top-[19%] lg:h-40 lg:w-40',
    animation: 'plate-float',
  },
  {
    src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=300&q=80',
    alt: 'Dessert',
    className: 'right-[12%] top-[30%] h-20 w-20 lg:right-[20%] lg:top-[30%] lg:h-30 lg:w-30',
    animation: 'float-delay',
  },
  {
    src: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80',
    alt: 'Drink',
    className: 'left-[25%] bottom-[8%] h-14 w-14 lg:left-[20%] lg:bottom-[8%] lg:h-20 lg:w-20',
    animation: 'float-delay',
  },
  {
    src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80',
    alt: 'Pizza',
    className: 'right-[25%] bottom-[14%] h-14 w-14 lg:right-[27%] lg:bottom-[14%] lg:h-20 lg:w-20',
    animation: 'plate-float',
  },
]

const marqueeItems = [
  'GOOD FOOD',
  'GOOD MOODS',
  'COME HUNGRY',
  'LEAVE HAPPY',
  'BITE CLUB',
  'SEE YOU SOON',
]

const biteLetters = ['B', 'I', 'T', 'E']
const clubLetters = ['C', 'L', 'U', 'B']

const letterMotion = [
  'hover:-translate-y-3 hover:-rotate-6',
  'hover:translate-x-1 hover:-translate-y-2 hover:rotate-3',
  'hover:-translate-y-4 hover:rotate-6',
  'hover:translate-x-1 hover:-translate-y-2 hover:-rotate-3',
]

function AnimatedWord({ letters, outlined = false }) {
  return (
    <span className={`inline-flex ${outlined ? 'text-outline-cream' : 'text-cream'}`}>
      {letters.map((letter, i) => (
        <span
          key={`${letter}-${i}`}
          className={`
            inline-block cursor-default
            transition-transform duration-300 ease-out
            ${letterMotion[i % letterMotion.length]}
            hover:text-orange
          `}
          style={{ transitionDelay: `${i * 25}ms` }}
        >
          {letter}
        </span>
      ))}
    </span>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-choco text-cream">

      {/* Top Marquee */}
      <div className="overflow-hidden border-b-[3px] border-choco bg-butter py-2 text-choco">
        <div className="marquee-track items-center gap-6">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex shrink-0 items-center gap-6 font-display text-sm uppercase tracking-[0.18em] sm:text-base"
            >
              {item}
              <DoodleStar className="h-4 w-4 shrink-0" />
            </span>
          ))}
        </div>
      </div>

      <div className="noise relative">

        <div
          className="halftone-cream pointer-events-none absolute inset-0 opacity-[0.12]"
          aria-hidden="true"
        />

        {/* Floating Food Images */}
        {floatingImages.map((img) => (
          <div
            key={img.alt}
            className={`
              pointer-events-none absolute z-10 hidden overflow-hidden
              rounded-full border-[3px] border-cream/80
              shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)]
              sm:block ${img.className} ${img.animation}
            `}
          >
            <ImageWithFallback
              src={img.src}
              srcSet={unsplashSrcSet(img.src, [160, 240, 320])}
              sizes="160px"
              alt={img.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ))}

        {/* Decorative doodles */}
        <DoodleStar className="wiggle absolute left-[23%] top-[15%] hidden h-7 w-7 text-butter lg:block" />
        <DoodleSparkle className="absolute right-[23%] top-[16%] hidden h-6 w-6 text-coral lg:block" />
        <DoodleHeart className="absolute right-[9%] top-[40%] hidden h-9 w-9 rotate-12 text-coral lg:block" />
        <DoodleChili className="absolute right-[5%] bottom-[18%] hidden h-12 w-12 -rotate-12 text-cream/70 lg:block" />
        <DoodleBurst className="absolute left-[8%] bottom-[18%] hidden h-10 w-10 text-cream/60 lg:block" />

        {/* Dotted Curved Travel Paths */}
        <svg
          className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
          viewBox="0 0 1440 520"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M-80 130 C220 -20 350 190 650 100 S1120 40 1520 140"
            stroke="#F5E8CE"
            strokeWidth="1.5"
            strokeDasharray="5 9"
            opacity=".38"
          />
          <path
            d="M-50 400 C250 280 430 490 750 390 S1200 290 1500 410"
            stroke="#F5E8CE"
            strokeWidth="1.5"
            strokeDasharray="5 9"
            opacity=".3"
          />
          <path
            d="M250 0 C390 90 500 30 650 10"
            stroke="#FFCF67"
            strokeWidth="1.5"
            strokeDasharray="3 8"
            opacity=".25"
          />
        </svg>

        {/* Main Brand Section */}
        <div className="relative z-10 mx-auto flex min-h-[390px] max-w-7xl flex-col items-center justify-center px-4 py-10 text-center sm:min-h-[420px] sm:px-6 lg:min-h-[450px] lg:py-12">

          <span className="font-script text-xl text-orange sm:text-2xl lg:text-3xl">
            come hungry, leave happy
          </span>

          {/* Large Interactive Typography */}
          <div className="relative mt-3">

            <h2
              className="
                select-none font-display
                text-[clamp(5.5rem,15vw,11rem)]
                leading-[0.68] tracking-[-0.06em]
              "
            >
              <span className="block">
                <AnimatedWord letters={biteLetters} />
              </span>

              <span className="mt-2 block">
                <AnimatedWord letters={clubLetters} outlined />
              </span>
            </h2>

            <DoodleHeart className="absolute -right-7 top-0 h-8 w-8 rotate-12 text-coral transition-transform duration-300 hover:scale-125 sm:-right-12 sm:h-11 sm:w-11" />

            <DoodleSparkle className="absolute -left-7 bottom-2 h-6 w-6 text-butter transition-transform duration-300 hover:rotate-45 sm:-left-12 sm:h-9 sm:w-9" />

          </div>

          <p className="mt-5 max-w-lg text-pretty text-sm leading-relaxed text-cream/70 sm:text-base">
            A fictional kitchen with big flavours, loud colours and even
            louder good moods. The vibes, however, are real.
          </p>

          <DoodleSquiggle className="mt-4 h-4 w-28 text-cream/30" />

        </div>

        {/* Footer Information */}
        <div className="relative z-10 border-t border-dashed border-cream/25">

          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-7 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-10 lg:py-8">

            {/* Find Us */}
            <div className="group">
              <h3 className="mb-3 font-body text-xs font-bold uppercase tracking-[0.24em] text-butter">
                Find Us
              </h3>

              <ul className="space-y-2.5 text-sm text-cream/75">
                <li className="flex gap-2.5 transition-transform duration-300 hover:translate-x-1">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                  <span>{siteInfo.address}</span>
                </li>

                <li className="flex gap-2.5 transition-transform duration-300 hover:translate-x-1">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                  <a href={`tel:${siteInfo.phone.replace(/\s/g, '')}`} className="link-underline hover:text-butter">
                    {siteInfo.phone}
                  </a>
                </li>

                <li className="flex gap-2.5 transition-transform duration-300 hover:translate-x-1">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                  <a href={`mailto:${siteInfo.email}`} className="link-underline hover:text-butter">
                    {siteInfo.email}
                  </a>
                </li>
              </ul>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className="mb-3 font-body text-xs font-bold uppercase tracking-[0.24em] text-butter">
                Opening Hours
              </h3>

              <ul className="space-y-2.5 text-sm text-cream/75">
                {siteInfo.hours.map((slot) => (
                  <li
                    key={slot.days}
                    className="flex items-start gap-2.5 transition-transform duration-300 hover:translate-x-1"
                  >
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                    <span>
                      <span className="block font-semibold text-cream">
                        {slot.days}
                      </span>
                      {slot.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h3 className="mb-3 font-body text-xs font-bold uppercase tracking-[0.24em] text-butter">
                Explore
              </h3>

              <ul className="space-y-2 text-sm text-cream/75">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="link-underline inline-block transition-all duration-300 hover:translate-x-1 hover:text-butter"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}

                <li>
                  <Link
                    to="/reservation"
                    className="link-underline inline-block transition-all duration-300 hover:translate-x-1 hover:text-butter"
                  >
                    Reservation
                  </Link>
                </li>

                <li>
                  <Link
                    to="/cart"
                    className="link-underline inline-block transition-all duration-300 hover:translate-x-1 hover:text-butter"
                  >
                    Cart
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="mb-3 font-body text-xs font-bold uppercase tracking-[0.24em] text-butter">
                Follow Along
              </h3>

              <ul className="space-y-2 text-sm text-cream/75">
                {siteInfo.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1 transition-colors hover:text-butter"
                    >
                      {social.label}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mt-4 rounded-xl border border-cream/20 bg-cream/5 p-2.5 text-xs leading-relaxed text-cream/55">
                {siteInfo.demoNote}
              </p>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="relative z-10 border-t border-cream/15">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-3 text-xs text-cream/50 sm:flex-row sm:px-8">

            <p>
              © {new Date().getFullYear()} Bite Club (demo). All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
              <Link to="/privacy" className="transition-colors hover:text-butter">
                Privacy Policy
              </Link>

              <Link to="/terms" className="transition-colors hover:text-butter">
                Terms &amp; Conditions
              </Link>

              <span className="hidden items-center gap-1 sm:flex">
                Made with
                <DoodleHeart className="h-3 w-3 text-coral" />
                &amp; butter
              </span>
            </div>

          </div>
        </div>

      </div>
    </footer>
  )
}
