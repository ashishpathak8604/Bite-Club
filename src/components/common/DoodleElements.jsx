const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke',
}

export function DoodleStar({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" {...props}>
      <path
        d="M50 8 60 36 90 38 66 57 75 88 50 70 24 88 34 57 10 38 40 36Z"
        fill="var(--color-butter)"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DoodleSparkle({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" {...props}>
      <path d="M50 6c4 24 20 40 44 44-24 4-40 20-44 44-4-24-20-40-44-44 24-4 40-20 44-44Z" fill="currentColor" />
    </svg>
  )
}

export function DoodleArrow({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true" {...props}>
      <path d="M6 14c26 40 56 48 100 40" {...base} />
      <path d="M90 40c7 4 12 8 16 14M106 54c-7 2-13 5-18 9" {...base} />
    </svg>
  )
}

export function DoodleSquiggle({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 200 40" className={className} aria-hidden="true" {...props}>
      <path d="M4 22c14-18 28-18 42 0s28 18 42 0 28-18 42 0 28 18 42 0" {...base} />
    </svg>
  )
}

export function DoodleSwirl({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" {...props}>
      <path d="M52 50c0-8 12-8 12 0s-12 16-24 16S16 54 16 42 28 18 44 18s38 12 38 34-16 40-38 40" {...base} />
    </svg>
  )
}

export function DoodleCircle({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 220 100" className={className} aria-hidden="true" {...props}>
      <path d="M14 54c-4-26 36-44 92-44 58 0 106 16 100 40-6 26-54 42-108 40C44 88 18 76 14 54Z" {...base} strokeWidth="5" />
      <path d="M26 34c22-12 66-18 104-12" {...base} strokeWidth="2.5" opacity="0.6" />
    </svg>
  )
}

export function DoodleUnderline({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 240 30" className={className} aria-hidden="true" preserveAspectRatio="none" {...props}>
      <path d="M6 20c40-12 84-14 120-8 40 6 76 4 108-6" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
    </svg>
  )
}

export function DoodleBurst({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" {...props}>
      <path
        d="m50 2 8 20 18-12-4 21 22-2-14 17 20 9-20 9 14 17-22-2 4 21-18-12-8 20-8-20-18 12 4-21-22 2 14-17-20-9 20-9-14-17 22 2-4-21 18 12Z"
        fill="var(--color-coral)"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DoodleHeart({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" {...props}>
      <path
        d="M50 84S12 62 12 36c0-14 10-22 21-22 8 0 14 5 17 11 3-6 9-11 17-11 11 0 21 8 21 22 0 26-38 48-38 48Z"
        fill="var(--color-coral)"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DoodleLeaf({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" {...props}>
      <path d="M20 82C14 44 42 14 84 16c2 42-28 70-64 66Z" fill="var(--color-pistachio)" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M28 76c14-22 30-36 48-46" {...base} />
    </svg>
  )
}

export function DoodleChili({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" {...props}>
      <path d="M56 26c14 2 20 14 18 28-3 22-26 40-46 36-8-2-8-12 0-16 14-6 20-10 24-24 2-8 0-14-4-18" fill="var(--color-coral)" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M54 24c-2-8 2-14 10-16 0 8-4 14-10 16Z" fill="var(--color-pistachio)" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
    </svg>
  )
}

export function DoodlePizza({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" {...props}>
      <path d="M50 8 92 88H8Z" fill="var(--color-butter)" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M22 62c16 6 40 6 56 0" {...base} strokeWidth="3.5" />
      <circle cx="50" cy="42" r="7" fill="var(--color-coral)" stroke="currentColor" strokeWidth="3" />
      <circle cx="36" cy="66" r="6" fill="var(--color-coral)" stroke="currentColor" strokeWidth="3" />
      <circle cx="64" cy="68" r="6" fill="var(--color-coral)" stroke="currentColor" strokeWidth="3" />
    </svg>
  )
}

export function DoodleBurger({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" {...props}>
      <path d="M18 42c0-16 14-26 32-26s32 10 32 26Z" fill="var(--color-butter)" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M16 52h68" {...base} strokeWidth="7" />
      <path d="M20 62c4 10 8 8 12 0 4 10 8 8 12 0 4 10 8 8 12 0 4 10 8 8 12 0" fill="var(--color-pistachio)" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M18 76h64c0 8-6 12-14 12H32c-8 0-14-4-14-12Z" fill="var(--color-orange)" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  )
}

export function DoodleCup({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" {...props}>
      <path d="M24 38h44v30c0 12-9 20-22 20S24 80 24 68Z" fill="var(--color-orange)" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M68 46h8c8 0 12 6 12 13s-5 13-13 13h-7" {...base} />
      <path d="M38 26c0-6 6-6 6-12M52 26c0-6 6-6 6-12" {...base} strokeWidth="3.5" opacity="0.8" />
    </svg>
  )
}

export function DoodleFries({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" {...props}>
      <path d="M30 46 38 18l8 3-6 26M46 44l3-30 8 1-1 30M62 46l8-24 8 3-9 24" fill="var(--color-butter)" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M26 44h52l-5 38c-1 6-6 10-12 10H43c-6 0-11-4-12-10Z" fill="var(--color-coral)" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M38 60h28" {...base} strokeWidth="3" opacity="0.7" />
    </svg>
  )
}

export function DoodleCheck({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" {...props}>
      <circle cx="50" cy="50" r="40" fill="var(--color-pistachio)" stroke="currentColor" strokeWidth="4" />
      <path d="M30 52l14 14 28-30" {...base} strokeWidth="7" />
    </svg>
  )
}

export function DoodleFlower({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" {...props}>
      <g fill="var(--color-coral)" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round">
        <ellipse cx="50" cy="24" rx="12" ry="16" />
        <ellipse cx="76" cy="50" rx="16" ry="12" />
        <ellipse cx="50" cy="76" rx="12" ry="16" />
        <ellipse cx="24" cy="50" rx="16" ry="12" />
      </g>
      <circle cx="50" cy="50" r="13" fill="var(--color-butter)" stroke="currentColor" strokeWidth="3.5" />
    </svg>
  )
}

export function DoodleDashedArc({ className = '', ...props }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" {...props}>
      <circle cx="100" cy="100" r="86" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" />
    </svg>
  )
}

export function BlobShape({ className = '', fill = 'var(--color-pistachio)', ...props }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" {...props}>
      <path
        d="M46 26c22-16 62-14 84 2 22 16 40 48 34 76-6 28-36 50-66 54-30 4-62-8-76-30-14-22-6-56 4-76 6-12 12-20 20-26Z"
        fill={fill}
      />
    </svg>
  )
}

export function ArchShape({ className = '', fill = 'var(--color-butter)', ...props }) {
  return (
    <svg viewBox="0 0 200 220" className={className} aria-hidden="true" {...props}>
      <path d="M0 220V100C0 45 45 0 100 0s100 45 100 100v120Z" fill={fill} />
    </svg>
  )
}

export function Sparkles({ className = '', count = 3 }) {
  return (
    <span className={className} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <DoodleSparkle
          key={i}
          className="absolute h-4 w-4"
          style={{ top: `${(i * 37) % 80}%`, left: `${(i * 53) % 90}%` }}
        />
      ))}
    </span>
  )
}
