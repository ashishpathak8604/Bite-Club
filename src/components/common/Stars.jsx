import { Star } from 'lucide-react'

export default function Stars({ rating = 5, size = 'h-4 w-4', className = '', showValue = false }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.round(rating)
        return (
          <Star
            key={i}
            className={`${size} ${filled ? 'text-choco' : 'text-choco/25'}`}
            fill={filled ? 'currentColor' : 'none'}
            strokeWidth={2}
          />
        )
      })}
      {showValue && <span className="ml-1 text-sm font-semibold">{rating.toFixed(1)}</span>}
    </span>
  )
}
