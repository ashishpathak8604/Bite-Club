import { Trash2 } from 'lucide-react'
import { formatINR } from '../../utils/format'
import QuantitySelector from '../common/QuantitySelector'
import ImageWithFallback from '../common/ImageWithFallback'

export default function CartItem({ item, compact = false }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border-2 border-choco/15 bg-white/60 p-3 ${
        compact ? '' : 'sm:gap-4 sm:p-4'
      }`}
    >
      <div
        className={`shrink-0 overflow-hidden rounded-xl border-2 border-choco bg-butter ${
          compact ? 'h-16 w-16' : 'h-20 w-20 sm:h-24 sm:w-24'
        }`}
      >
        <ImageWithFallback src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className={`truncate font-display ${compact ? 'text-base' : 'text-lg'}`}>{item.name}</h3>
            <p className="text-sm text-choco/60">{formatINR(item.price)} each</p>
          </div>
          <button
            type="button"
            onClick={() => item.onRemove?.()}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-choco/50 transition hover:bg-coral hover:text-choco"
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <QuantitySelector
            qty={item.qty}
            min={1}
            size="sm"
            onIncrement={item.onIncrement}
            onDecrement={item.onDecrement}
          />
          <span className="font-display text-base">{formatINR(item.price * item.qty)}</span>
        </div>
      </div>
    </div>
  )
}
