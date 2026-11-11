import { DoodleStar, DoodleSquiggle } from './DoodleElements'

export default function SectionHeading({
  eyebrow,
  title,
  script,
  description,
  align = 'left',
  className = '',
  titleClassName = '',
  descriptionClassName = '',
  eyebrowClassName = '',
}) {
  const alignment =
    align === 'center' ? 'items-center text-center' : align === 'right' ? 'items-end text-right' : 'items-start text-left'

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <span
          className={`mb-4 inline-flex items-center gap-2 rounded-full border-2 border-choco bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${eyebrowClassName}`}
        >
          <DoodleStar className="h-3.5 w-3.5 text-choco" />
          {eyebrow}
        </span>
      )}
      <h2 className={`text-balance text-4xl sm:text-5xl lg:text-6xl ${titleClassName}`}>
        {title}
        {script && (
          <span className="relative ml-2 inline-block font-script text-[0.72em] font-normal tracking-normal">
            {script}
            <DoodleSquiggle className="absolute -bottom-3 left-0 w-full text-choco/60" />
          </span>
        )}
      </h2>
      {description && (
        <p className={`mt-5 max-w-xl text-base leading-relaxed text-choco/80 sm:text-lg ${descriptionClassName}`}>
          {description}
        </p>
      )}
    </div>
  )
}
