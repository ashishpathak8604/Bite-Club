
import { ArrowRight } from 'lucide-react'
import { featuredDishes } from '../../data/menuData'
import MenuCarousel from '../common/MenuCarousel'
import SectionHeading from '../common/SectionHeading'
import ScrollReveal from '../common/ScrollReveal'
import { PrimaryButton } from '../common/Button'
import {
  BlobShape,
  DoodleArrow,
  DoodleSquiggle,
  DoodleStar,
  DoodleSwirl,
} from '../common/DoodleElements'

export default function MenuPreview() {
  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-24">

      {/* Background illustrations */}
      <BlobShape
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rotate-12 opacity-40"
        fill="var(--color-pistachio)"
      />

      <BlobShape
        className="pointer-events-none absolute -left-28 bottom-0 h-64 w-64 -rotate-12 opacity-30"
        fill="var(--color-butter)"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[4%] top-[8%] hidden select-none font-display text-[9rem] leading-none text-choco/[0.05] lg:block"
      >
        MENU
      </span>

      <DoodleStar
        className="wiggle absolute left-[6%] top-[14%] hidden h-9 w-9 text-choco/50 lg:block"
      />

      <DoodleArrow
        className="absolute right-[8%] top-[30%] hidden h-14 w-24 text-choco/35 xl:block"
      />

      {/* Section heading - centered container */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

        <ScrollReveal className="mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <SectionHeading
           
            title="PICK YOUR"
            script="happy place"
            description="Six plates we are a little obsessed with right now. The full menu has plenty more where these came from."
          />

          <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">

            <PrimaryButton
              to="/menu"
              icon={ArrowRight}
              className="w-full sm:w-auto"
            >
              View Full Menu
            </PrimaryButton>

            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-choco/50">
              <DoodleSquiggle className="h-3 w-10" />
              made fresh, always
            </span>

          </div>
        </ScrollReveal>

      </div>

      {/* Full viewport width carousel */}
      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2">
        <MenuCarousel items={featuredDishes} />
      </div>

      {/* Bottom decorative text */}
      <div className="relative mt-10 flex items-center justify-center gap-3 px-4 text-center">

        <DoodleSwirl className="hidden h-10 w-10 text-choco/30 sm:block" />

        <p className="font-script text-xl text-choco/70 sm:text-2xl">
          psst — the molten cake sells out fast
        </p>

        <DoodleStar className="h-6 w-6 text-choco" />

      </div>

    </section>
  )
}
