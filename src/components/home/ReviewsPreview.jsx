
import { ArrowRight } from 'lucide-react'
import { overallRating, reviews, totalReviews } from '../../data/reviewData'
import SectionHeading from '../common/SectionHeading'
import ScrollReveal from '../common/ScrollReveal'
import Stars from '../common/Stars'
import { SecondaryButton } from '../common/Button'
import {
  DoodleBurst,
  DoodleHeart,
  DoodleSparkle,
  DoodleStar,
  DoodleSquiggle,
} from '../common/DoodleElements'

const featured = reviews[0]
const supporting = [reviews[1], reviews[3]]

const hoverEffect =
  'transition-all duration-500 ease-out hover:-translate-y-2 hover:translate-x-1 hover:shadow-[10px_12px_0_0_#553B32]'

export default function ReviewsPreview() {
  return (
    <section className="relative overflow-hidden border-y-[3px] border-choco bg-coral py-16 sm:py-24">

      {/* Background texture */}
      <div
        className="halftone pointer-events-none absolute inset-0 opacity-[0.1]"
        aria-hidden="true"
      />

      <DoodleStar className="wiggle absolute right-[5%] top-[10%] hidden h-12 w-12 text-choco/70 sm:block" />
      <DoodleSparkle className="absolute left-[4%] bottom-[16%] hidden h-8 w-8 text-choco/50 sm:block" />
      <DoodleBurst className="absolute -left-6 top-[30%] hidden h-20 w-20 text-choco/60 lg:block" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

        {/* Section heading */}
        <ScrollReveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            
            title="LOVED BY"
            script="locals"
            description="Kind words from our demo diners. These are sample testimonials, not real Google reviews."
            titleClassName="text-choco"
          />

          <SecondaryButton
            to="/reviews"
            icon={ArrowRight}
            className="shrink-0 self-start md:self-auto"
          >
            View All Reviews
          </SecondaryButton>
        </ScrollReveal>

        {/* Reviews composition */}
        <ScrollReveal
          className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_0.82fr_1fr]"
          delay={0.1}
        >

          {/* LEFT: Featured review bubble */}
          <div className="relative flex items-center justify-center lg:justify-end">

            <article
              className={`relative w-full max-w-[430px] rounded-[2.2rem_2.2rem_2.2rem_0.7rem] border-[3px] border-choco bg-cream p-6 shadow-[5px_6px_0_0_#553B32] sm:p-8 ${hoverEffect}`}
            >
              {/* Speech bubble tail */}
              <div className="absolute -bottom-[13px] left-9 h-6 w-6 rotate-45 border-b-[3px] border-r-[3px] border-choco bg-cream" />

              <div className="flex items-center justify-between gap-3">
                <Stars rating={featured.rating} size="h-4 w-4" />

                <span className="rounded-full border-2 border-choco bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wide">
                  {featured.date}
                </span>
              </div>

              <span
                aria-hidden="true"
                className="mt-3 block font-script text-6xl leading-none text-choco/20"
              >
                “
              </span>

              <h3 className="mt-1 text-2xl leading-tight sm:text-3xl">
                {featured.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-choco/75 sm:text-base">
                {featured.text}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-choco font-display text-sm ${featured.color}`}
                >
                  {featured.initials}
                </span>

                <div>
                  <p className="font-semibold leading-tight">
                    {featured.name}
                  </p>
                  <p className="mt-1 text-xs text-choco/55">
                    Ordered the {featured.favourite}
                  </p>
                </div>
              </div>
            </article>
          </div>

          {/* CENTER: Compact overall rating */}
          <div className="relative z-10 order-first flex justify-center lg:order-none">

            <div
              className={`relative w-full max-w-[300px] rounded-[2rem] border-[3px] border-choco bg-butter p-6 text-center shadow-[5px_6px_0_0_#553B32] ${hoverEffect}`}
            >

              <DoodleHeart className="absolute -right-3 -top-4 h-10 w-10 rotate-12 text-choco" />

              <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-choco/60">
                <span className="grid h-6 w-6 place-items-center rounded-full border-2 border-choco bg-cream font-display text-xs">
                  G
                </span>
                Guest rating
              </div>

              <div className="mt-5 flex items-center justify-center gap-3">
                <span className="font-display text-7xl leading-none">
                  {overallRating}
                </span>
                <div className="text-left">
                  <Stars rating={overallRating} size="h-4 w-4" />
                  <p className="mt-1 text-xs font-semibold text-choco/60">
                    out of 5
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-choco/65">
                Based on {totalReviews} sample reviews from our fictional diners.
              </p>

              <div className="mt-5 space-y-2">
                {[5, 4, 3].map((star, i) => (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-3 font-semibold">{star}</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full border border-choco/40 bg-cream">
                      <span
                        className="block h-full rounded-full bg-choco"
                        style={{ width: `${[76, 17, 5][i]}%` }}
                      />
                    </span>
                  </div>
                ))}
              </div>

              <DoodleSquiggle className="mx-auto mt-5 h-3 w-20 text-choco/40" />

              <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.16em] text-choco/50">
                Demo data · Not real reviews
              </p>
            </div>
          </div>

          {/* RIGHT: Supporting review bubbles */}
          <div className="flex flex-col gap-7">

            {supporting.map((review, i) => (
              <article
                key={review.id}
                className={`relative border-[3px] border-choco p-5 shadow-[5px_6px_0_0_#553B32] sm:p-6 ${hoverEffect} ${
                  i === 0
                    ? 'rounded-[2rem_2rem_0.8rem_2rem] bg-pistachio sm:rotate-1'
                    : 'rounded-[0.8rem_2rem_2rem_2rem] bg-white sm:-rotate-1'
                }`}
              >

                {/* Different bubble tail for each card */}
                <div
                  className={`absolute -bottom-[13px] h-6 w-6 rotate-45 border-b-[3px] border-r-[3px] border-choco ${
                    i === 0
                      ? 'right-9 bg-pistachio'
                      : 'left-9 bg-white'
                  }`}
                />

                <div className="flex items-center justify-between gap-2">
                  <Stars rating={review.rating} size="h-3.5 w-3.5" />

                  <span className="text-[10px] font-semibold text-choco/45">
                    {review.date}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-choco/80">
                  {review.text}
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-choco font-display text-xs ${review.color}`}
                  >
                    {review.initials}
                  </span>

                  <div>
                    <p className="text-sm font-semibold leading-tight">
                      {review.name}
                    </p>
                    <p className="mt-1 text-[11px] text-choco/55">
                      Happy diner
                    </p>
                  </div>
                </div>
              </article>
            ))}

          </div>

        </ScrollReveal>

        {/* Bottom decorative caption */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <DoodleSparkle className="h-5 w-5 text-choco/50" />
          <p className="font-script text-xl text-choco/70 sm:text-2xl">
            good food, even better stories
          </p>
          <DoodleStar className="h-5 w-5 text-choco" />
        </div>

      </div>
    </section>
  )
}
