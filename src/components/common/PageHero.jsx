import { DoodleArrow, DoodleSparkle, DoodleStar, DoodleSwirl, DoodlePizza } from './DoodleElements'

const tones = {
  cream: 'bg-cream',
  orange: 'bg-orange',
  coral: 'bg-coral',
  butter: 'bg-butter',
  pistachio: 'bg-pistachio',
}

export default function PageHero({
  eyebrow,
  title,
  script,
  description,
  tone = 'orange',
  children,
  oversized = 'yum',
  align = 'center',
}) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <section
      className={`relative isolate overflow-hidden border-b-[3px] border-choco pb-16 pt-32 sm:pb-24 sm:pt-40 ${tones[tone]}`}
    >
      <div className="halftone pointer-events-none absolute inset-0 opacity-[0.18]" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none font-script text-[28vw] leading-none text-choco/[0.08] sm:text-[20vw]"
      >
        {oversized}
      </span>

      <DoodleStar className="wiggle absolute left-[6%] top-[28%] h-10 w-10 text-choco sm:h-16 sm:w-16" />
      <DoodleSparkle className="absolute right-[9%] top-[24%] h-7 w-7 text-choco/70 sm:h-10 sm:w-10" />
      <DoodleArrow className="float-delay absolute right-[5%] top-[52%] hidden h-16 w-24 text-choco/60 lg:block" />
      <DoodleSwirl className="absolute left-[4%] top-[62%] hidden h-16 w-16 text-choco/40 lg:block" />
      <DoodlePizza className="float-delay absolute -right-4 bottom-6 h-24 w-24 rotate-12 text-choco/80 sm:h-32 sm:w-32" />

      <div className="relative mx-auto flex max-w-5xl flex-col px-4 sm:px-6">
        <div className={`flex flex-col ${alignment}`}>
          {eyebrow && (
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-choco bg-cream/90 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-choco" />
              {eyebrow}
            </span>
          )}
          <h1 className="max-w-4xl text-balance text-5xl leading-[0.88] sm:text-7xl lg:text-8xl">
            {title}
            {script && (
              <span className="ml-2 inline-block font-script text-[0.66em] font-normal leading-none tracking-normal">
                {script}
              </span>
            )}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-choco/80 sm:text-lg">
              {description}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{children}</div>}
        </div>
      </div>
    </section>
  )
}
