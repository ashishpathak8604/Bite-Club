import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'
import cheesyPizza from '../../assets/images/CheesyPizza.png'
import { PrimaryButton, SecondaryButton } from '../common/Button'
import ImageWithFallback from '../common/ImageWithFallback'
import Stars from '../common/Stars'
import {
  DoodleArrow,
  DoodleChili,
  DoodlePizza,
  DoodleSparkle,
  DoodleStar,
  DoodleSwirl,
} from '../common/DoodleElements'

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('[data-hero-word]', {
        yPercent: 115,
        rotate: 5,
        duration: 1,
        stagger: 0.09,
        ease: 'power4.out',
        delay: 0.15,
      })
      gsap.from('[data-hero-plate]', {
        scale: 0.78,
        opacity: 0,
        rotate: -10,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2,
      })
      gsap.from('[data-hero-fade]', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.55,
      })
      gsap.from('[data-hero-doodle]', {
        scale: 0,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'back.out(2.2)',
        delay: 0.9,
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden bg-orange pb-14 pt-28 sm:pb-20 sm:pt-32"
    >
      <div className="halftone pointer-events-none absolute inset-0 opacity-[0.16]" aria-hidden="true" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[18%] -translate-x-1/2 select-none font-display text-[34vw] leading-none tracking-tight text-choco/[0.07]"
      >
        TASTY
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-[16%] select-none font-script text-[16vw] leading-none text-cream/25"
      >
        vibes
      </span>

      <DoodlePizza
        data-hero-doodle
        className="absolute left-[3%] top-[22%] hidden h-20 w-20 -rotate-12 text-choco/80 lg:block"
      />
      <DoodleChili
        data-hero-doodle
        className="absolute right-[4%] top-[30%] hidden h-16 w-16 rotate-12 text-choco/80 lg:block"
      />
      <DoodleSwirl
        data-hero-doodle
        className="absolute left-[7%] bottom-[18%] hidden h-16 w-16 text-choco/35 xl:block"
      />
      <DoodleStar
        data-hero-doodle
        className="wiggle absolute right-[9%] top-[16%] hidden h-10 w-10 text-choco sm:block"
      />
      <DoodleSparkle
        data-hero-doodle
        className="absolute left-[16%] top-[14%] h-6 w-6 text-choco/70"
      />
      <DoodleArrow
        data-hero-doodle
        className="absolute left-[10%] top-[46%] hidden h-14 w-24 -scale-x-100 text-choco/50 xl:block"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-3 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <div className="flex flex-col items-center lg:items-end lg:text-right">
            <span
              data-hero-fade
              className="mb-1 font-script text-xl text-choco/80 sm:text-2xl lg:mr-2"
            >
              seriously
            </span>
            <h1 className="font-display text-[clamp(3.4rem,10vw,7.5rem)] leading-[0.8]">
              <span className="block overflow-hidden">
                <span data-hero-word className="block">
                  SO
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  data-hero-word
                  className="block text-cream"
                  style={{ textShadow: '5px 5px 0 #553B32' }}
                >
                  GOOD
                </span>
              </span>
            </h1>
          </div>

          <div
            data-hero-plate
            className="relative mx-auto my-2 aspect-square w-[min(78vw,360px)] sm:w-[min(58vw,410px)] lg:w-[420px]"
          >
        
            <div className="plate-float absolute left-[-2.94%] top-[9.94%] h-[98.12%] w-[98.12%]  rotate-[-16deg]">
              <div className="absolute left-[-10.42%] top-[-3.91%] aspect-[1445/1089] w-[146.8%]">
                <ImageWithFallback
                  src={cheesyPizza}
                  alt="Cheesy pizza with a slice being pulled away"
                  loading="eager"
                  className="h-full w-full object-contain"
                />
              </div>
              <div
                className="plate-shadow absolute inset-x-0 top-[102%] mx-auto h-[7%] w-[60%] rounded-[50%] bg-choco/30 blur-md"
                aria-hidden="true"
              />
            </div>

            <div
              data-hero-doodle
              className="absolute -left-4 top-8 rotate-[-8deg] rounded-full border-2 border-choco bg-butter px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow-[3px_3px_0_0_#553B32] sm:-left-8"
            >
              fresh daily
            </div>
            <div
              data-hero-doodle
              className="absolute -right-3 bottom-20 rotate-6 rounded-full border-2 border-choco bg-pistachio px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow-[3px_3px_0_0_#553B32] sm:-right-6"
            >
              ★ 4.8 rated
            </div>
            <div
              data-hero-doodle
              className="absolute -right-2 -top-2 hidden rotate-6 rounded-2xl rounded-bl-none border-2 border-choco bg-cream px-3 py-1 font-script text-lg leading-none shadow-[3px_3px_0_0_#553B32] sm:block"
            >
              yum!
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-start lg:text-left lg:translate-x-8">
            <h1 className="font-display text-[clamp(3.4rem,10vw,7.5rem)] leading-[0.8]">
              <span className="block overflow-hidden">
                <span data-hero-word className="block">
                  IT
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-hero-word className="text-outline block">
                  HURTS
                </span>
              </span>
            </h1>
            <span
              data-hero-fade
              className="mt-1 font-script text-xl text-choco/80 sm:text-2xl lg:ml-2"
            >
              in the best way
            </span>
          </div>
        </div>

        <div data-hero-fade className="mx-auto mt-8 flex max-w-2xl flex-col items-center text-center sm:mt-10">
          <p className="text-pretty text-sm leading-relaxed text-choco/80 sm:text-base">
            Big flavours, playful plates and a dining room that feels like a good mood.
            Welcome to Bite Club — a fictional kitchen with very real cravings.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
            <PrimaryButton to="/menu" size="lg" icon={ArrowRight} className="w-full sm:w-auto">
              Explore Menu
            </PrimaryButton>
            <SecondaryButton to="/about" size="lg" className="w-full sm:w-auto">
              Discover Our Story
            </SecondaryButton>
          </div>

          <div className="mt-6 inline-flex items-center gap-3 rounded-full border-2 border-choco/20 bg-cream/60 px-4 py-2 backdrop-blur-sm">
            <Stars rating={4.8} size="h-3.5 w-3.5" />
            <span className="text-xs font-semibold text-choco/75">
              4.8 average · 327 sample reviews
            </span>
            <Sparkles className="h-3.5 w-3.5 text-choco/60" />
          </div>
        </div>
      </div>

      <div className="relative mt-10 hidden items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.35em] text-choco/50 sm:flex">
        <ArrowDown className="h-4 w-4 animate-bounce" />
        scroll to taste
      </div>
    </section>
  )
}
