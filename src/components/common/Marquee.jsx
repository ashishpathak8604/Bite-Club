import { DoodleStar } from './DoodleElements'

export default function Marquee({
  items = [],
  className = '',
  tone = 'choco',
  reverse = false,
  itemClassName = '',
}) {
  const tones = {
    choco: 'bg-choco text-cream',
    orange: 'bg-orange text-choco',
    butter: 'bg-butter text-choco',
    pistachio: 'bg-pistachio text-choco',
    coral: 'bg-coral text-choco',
    cream: 'bg-cream text-choco',
  }
  const row = [...items, ...items]

  return (
    <div className={`overflow-hidden border-y-[3px] border-choco py-3 ${tones[tone]} ${className}`}>
      <div
        className="marquee-track items-center gap-6"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className={`inline-flex shrink-0 items-center gap-6 font-display text-lg uppercase tracking-wider sm:text-xl ${itemClassName}`}
          >
            {item}
            <DoodleStar className="h-4 w-4 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
