
import Stars from '../common/Stars'

const accents = [
  'bg-white',
  'bg-butter/60',
  'bg-pistachio/50',
  'bg-coral/10',
]

const shapes = [
  'rounded-[2rem] rounded-bl-[0.7rem]',
  'rounded-[2rem] rounded-br-[0.7rem]',
  'rounded-[1.4rem]',
  'rounded-[2.5rem] rounded-tr-[0.7rem]',
  'rounded-[2rem] rounded-tl-[0.7rem]',
  'rounded-[1.5rem] rounded-br-[3rem]',
]

const rotations = [
  'lg:-rotate-[0.5deg]',
  'lg:rotate-[0.5deg]',
  'lg:rotate-0',
  'lg:-rotate-[0.8deg]',
  'lg:rotate-[0.7deg]',
  'lg:rotate-0',
]

export default function ReviewCard({ review, index = 0 }) {
  const accent = accents[index % accents.length]
  const shape = shapes[index % shapes.length]
  const rotation = rotations[index % rotations.length]

  const hasTail = index % 3 !== 2

  return (
    <article
      className={`group relative flex h-full flex-col overflow-visible border-[3px] border-choco p-5 shadow-[5px_5px_0_0_#553B32] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[7px_8px_0_0_#553B32] sm:p-6 ${accent} ${shape} ${rotation}`}
    >
      {/* Chat bubble tail */}
      {hasTail && (
        <span
          aria-hidden="true"
          className={`absolute -bottom-[12px] ${
            index % 2 === 0 ? 'left-8' : 'right-8'
          } h-5 w-5 rotate-45 border-b-[3px] border-r-[3px] border-choco ${accent}`}
        />
      )}

      {/* Decorative quotation mark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-1 -top-3 select-none font-script text-7xl leading-none text-choco/10 transition-transform duration-300 group-hover:rotate-6"
      >
        ”
      </span>

      {/* Rating and date */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <Stars rating={review.rating} size="h-4 w-4" />

        <span className="rounded-full border-2 border-choco/20 bg-white/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-choco/60">
          {review.date}
        </span>
      </div>

      {/* Review content */}
      <div className="relative z-10">
        <h3 className="mt-4 text-xl leading-tight sm:text-2xl">
          {review.title}
        </h3>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-choco/75">
          {review.text}
        </p>
      </div>

      {/* Reviewer information */}
      <div className="relative z-10 mt-5 flex items-center gap-3 border-t-2 border-dashed border-choco/20 pt-4">
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-choco font-display text-xs transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105 ${review.color}`}
        >
          {review.initials}
        </span>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-tight">
            {review.name}
          </p>

          <p className="truncate text-[11px] text-choco/55">
            Ordered the {review.favourite}
          </p>
        </div>
      </div>
    </article>
  )
}
