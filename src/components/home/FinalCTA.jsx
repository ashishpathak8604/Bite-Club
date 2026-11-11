import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { finalCtaImage } from '../../data/siteData'
import { unsplashSrcSet } from '../../utils/images'
import { PrimaryButton, SecondaryButton } from '../common/Button'
import ScrollReveal from '../common/ScrollReveal'
import ImageWithFallback from '../common/ImageWithFallback'
import {
  DoodleArrow,
  DoodleBurst,
  DoodleSparkle,
  DoodleStar,
  DoodleSquiggle,
} from '../common/DoodleElements'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-y-[3px] border-choco bg-pistachio py-16 sm:py-24">
      <div className="halftone pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[24vw] leading-none text-choco/[0.06]"
      >
        ORDER
      </span>

      <DoodleStar className="wiggle absolute left-[6%] top-[14%] hidden h-10 w-10 text-choco/60 sm:block" />
      <DoodleSparkle className="absolute right-[8%] top-[12%] hidden h-7 w-7 text-choco/50 sm:block" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <ScrollReveal className="text-center lg:text-left">
          {/* <span className="inline-flex items-center gap-2 rounded-full border-2 border-choco bg-cream px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em]">
            <Phone className="h-3.5 w-3.5" />
            now taking orders
          </span> */}

          <h2 className="mt-5 text-balance text-5xl leading-[0.86] sm:text-7xl lg:text-8xl">
            GOOD FOOD
            <br />
            IS <span className="font-script text-[0.62em] font-normal">calling!</span>
          </h2>

          <p className="mx-auto mt-5 max-w-md text-pretty text-sm leading-relaxed text-choco/75 sm:text-base lg:mx-0">
            Pick up the phone, open the menu, or just follow your stomach. Either way,
            something delicious is waiting on the other side.
          </p>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <PrimaryButton to="/menu" size="lg" icon={ArrowRight} className="w-full sm:w-auto">
              Order Now
            </PrimaryButton>
            <SecondaryButton to="/reservation" icon={ArrowUpRight} size="lg" className="w-full sm:w-auto">
              Make a Reservation
            </SecondaryButton>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-choco/55 lg:justify-start">
            <DoodleSquiggle className="h-3 w-12" />
            free delivery over ₹799
          </div>
        </ScrollReveal>

        <ScrollReveal className="relative mx-auto w-[min(78vw,360px)] lg:w-full lg:max-w-[400px]" delay={0.12}>
          <div className="spin-slow absolute -inset-4 rounded-full border-2 border-dashed border-choco/40" aria-hidden="true" />
          <div className="relative aspect-square overflow-hidden rounded-full border-[6px] border-choco bg-cream p-3 shadow-[0_30px_55px_-25px_rgba(85,59,50,0.65)]">
            <div className="h-full w-full overflow-hidden rounded-full border-[3px] border-choco">
              <ImageWithFallback
                src={finalCtaImage}
                srcSet={unsplashSrcSet(finalCtaImage, [400, 600, 900])}
                sizes="(max-width: 640px) 78vw, 400px"
                alt="Juicy stacked burger with melted cheese"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="absolute -right-2 -top-2 rotate-6 rounded-2xl rounded-bl-none border-[3px] border-choco bg-butter px-3 py-1.5 font-script text-lg leading-none shadow-[4px_4px_0_0_#553B32]">
            ring ring!
          </div>
          <div className="absolute -bottom-3 -left-2 -rotate-6 rounded-full border-[3px] border-choco bg-coral px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow-[4px_4px_0_0_#553B32]">
            hot &amp; fresh
          </div>
          <DoodleArrow className="absolute -right-10 bottom-10 hidden h-14 w-20 text-choco/50 lg:block" />
          <DoodleBurst className="absolute -left-8 top-10 hidden h-12 w-12 text-choco/50 lg:block" />
        </ScrollReveal>
      </div>
    </section>
  )
}
