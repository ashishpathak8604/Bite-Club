import { Truck } from 'lucide-react'
import { formatINR, FREE_DELIVERY_THRESHOLD } from '../../utils/format'

export default function CartSummary({ totals, className = '', showDeliveryNote = true }) {
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - totals.subtotal)
  const progress = Math.min(100, (totals.subtotal / FREE_DELIVERY_THRESHOLD) * 100)

  return (
    <div className={`rounded-2xl border-2 border-choco bg-white/60 p-5 ${className}`}>
      {showDeliveryNote && (
        <div className="mb-5 rounded-xl bg-pistachio/40 p-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Truck className="h-4 w-4 shrink-0" />
            {totals.delivery === 0 ? (
              <span>Nice — you have unlocked free delivery!</span>
            ) : (
              <span>
                Add {formatINR(remaining)} more for free delivery
              </span>
            )}
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full border border-choco/30 bg-cream">
            <div
              className="h-full rounded-full bg-choco transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <dl className="space-y-2.5 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-choco/70">Subtotal</dt>
          <dd className="font-semibold">{formatINR(totals.subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-choco/70">Tax (5% GST)</dt>
          <dd className="font-semibold">{formatINR(totals.tax)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-choco/70">Delivery fee</dt>
          <dd className="font-semibold">
            {totals.delivery === 0 ? 'Free' : formatINR(totals.delivery)}
          </dd>
        </div>
        <div className="my-3 border-t-2 border-dashed border-choco/30" />
        <div className="flex items-center justify-between text-lg">
          <dt className="font-display">Grand total</dt>
          <dd className="font-display">{formatINR(totals.total)}</dd>
        </div>
      </dl>
    </div>
  )
}
