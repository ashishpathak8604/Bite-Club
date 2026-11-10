import { Plus } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatINR } from '../../utils/format'
import ImageWithFallback from '../common/ImageWithFallback'
import QuantitySelector from '../common/QuantitySelector'

export default function FoodCard({ item, className = '' }) {
  const { addItem, increment, decrement, getQty } = useCart()
  const qty = getQty(item.id)
  const available = item.available !== false

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border-[3px] border-choco bg-white shadow-[5px_5px_0_0_#553B32] transition-transform duration-300 hover:-translate-y-1 ${
        available ? '' : 'opacity-80'
      } ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b-[3px] border-choco bg-butter">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            available ? '' : 'grayscale'
          }`}
        />

        {item.badge && available && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border-2 border-choco bg-butter px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">
            {item.badge}
          </span>
        )}

        <span
          title={item.veg ? 'Vegetarian' : 'Non-vegetarian'}
          className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-md border-2 border-choco bg-white"
        >
          <span className={`h-3 w-3 rounded-full ${item.veg ? 'bg-pistachio' : 'bg-coral'}`} />
        </span>

        {!available && (
          <div className="absolute inset-0 grid place-items-center bg-choco/45">
            <span className="rotate-[-6deg] rounded-full border-[3px] border-choco bg-cream px-4 py-1.5 font-display text-sm uppercase tracking-widest">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl leading-tight">{item.name}</h3>
          <span className="shrink-0 rounded-full border-2 border-choco bg-cream px-2.5 py-0.5 font-display text-sm">
            {formatINR(item.price)}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-choco/65">
          {item.description}
        </p>

        <div className="mt-auto flex items-center justify-end pt-4">
          {qty > 0 ? (
            <QuantitySelector
              qty={qty}
              min={0}
              size="sm"
              onIncrement={() => increment(item.id)}
              onDecrement={() => decrement(item.id)}
            />
          ) : (
            <button
              type="button"
              disabled={!available}
              onClick={() => addItem(item)}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border-2 border-choco bg-choco px-4 py-2 text-sm font-semibold text-cream transition hover:bg-orange hover:text-choco disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-choco disabled:hover:text-cream"
            >
              <Plus className="h-4 w-4" strokeWidth={3} />
              {available ? 'Add to Cart' : 'Unavailable'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
