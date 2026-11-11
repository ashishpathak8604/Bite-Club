import { memo, useState } from 'react'

const FALLBACK = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
    <rect width="600" height="600" fill="#F7A36C"/>
    <circle cx="300" cy="300" r="185" fill="#F6EBD5" stroke="#553B32" stroke-width="12"/>
    <circle cx="300" cy="300" r="112" fill="#FFD66B" stroke="#553B32" stroke-width="10"/>
    <circle cx="300" cy="300" r="40" fill="#F28C83" stroke="#553B32" stroke-width="8"/>
    <path d="M170 170l40 40M430 170l-40 40M170 430l40-40M430 430l-40-40" stroke="#553B32" stroke-width="8" stroke-linecap="round"/>
  </svg>`,
)}`

function ImageWithFallback({
  src,
  alt = '',
  className = '',
  loading = 'lazy',
  decoding = 'async',
  srcSet,
  sizes,
  width,
  height,
  fetchPriority,
  ...props
}) {
  const [failedSrc, setFailedSrc] = useState(null)
  const failed = failedSrc === src

  return (
    <img
      src={failed ? FALLBACK : src}
      srcSet={failed ? undefined : srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      width={width}
      height={height}
      fetchPriority={fetchPriority}
      draggable="false"
      onError={() => setFailedSrc(src)}
      {...props}
    />
  )
}

export default memo(ImageWithFallback)
