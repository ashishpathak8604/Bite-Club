import { useState } from 'react'

const FALLBACK = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
    <rect width="600" height="600" fill="#F7A36C"/>
    <circle cx="300" cy="300" r="185" fill="#F6EBD5" stroke="#553B32" stroke-width="12"/>
    <circle cx="300" cy="300" r="112" fill="#FFD66B" stroke="#553B32" stroke-width="10"/>
    <circle cx="300" cy="300" r="40" fill="#F28C83" stroke="#553B32" stroke-width="8"/>
    <path d="M170 170l40 40M430 170l-40 40M170 430l40-40M430 430l-40-40" stroke="#553B32" stroke-width="8" stroke-linecap="round"/>
  </svg>`,
)}`

export default function ImageWithFallback({
  src,
  alt = '',
  className = '',
  loading = 'lazy',
  ...props
}) {
  const [failed, setFailed] = useState(false)

  return (
    <img
      src={failed ? FALLBACK : src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      draggable="false"
      onError={() => setFailed(true)}
      {...props}
    />
  )
}
