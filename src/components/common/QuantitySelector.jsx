import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({
  qty,
  onIncrement,
  onDecrement,
  min = 1,
  size = 'md',
  className = '',
  tone = 'cream',
}) {
  const dimensions = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  const text = size === 'sm' ? 'text-sm' : 'text-base'
  const tones = {
    cream: 'bg-cream text-choco border-choco',
    white: 'bg-white text-choco border-choco',
    choco: 'bg-choco text-cream border-choco',
  }

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border-2 p-1 ${tones[tone]} ${className}`}
    >
      <button
        type="button"
        onClick={onDecrement}
        disabled={qty <= min}
        aria-label="Decrease quantity"
        className={`grid ${dimensions} place-items-center rounded-full transition hover:bg-choco hover:text-cream disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current`}
      >
        <Minus className="h-4 w-4" strokeWidth={3} />
      </button>
      <span className={`min-w-6 text-center font-display ${text}`} aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label="Increase quantity"
        className={`grid ${dimensions} place-items-center rounded-full transition hover:bg-choco hover:text-cream`}
      >
        <Plus className="h-4 w-4" strokeWidth={3} />
      </button>
    </div>
  )
}
