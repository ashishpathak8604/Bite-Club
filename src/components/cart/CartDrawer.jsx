import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import CartItem from './CartItem'
import EmptyState from '../common/EmptyState'
import { PrimaryButton, SecondaryButton } from '../common/Button'
import { formatINR } from '../../utils/format'
import { DoodlePizza } from '../common/DoodleElements'
import { lockScroll, unlockScroll } from '../../utils/scroll'

export default function CartDrawer() {
  const {
    items,
    count,
    totals,
    isCartOpen,
    closeCart,
    increment,
    decrement,
    removeItem,
  } = useCart()

  useEffect(() => {
    if (!isCartOpen) return
    const prev = document.body.style.overflow
    lockScroll()
    const onKey = (e) => e.key === 'Escape' && closeCart()
    window.addEventListener('keydown', onKey)
    return () => {
      unlockScroll(prev)
      window.removeEventListener('keydown', onKey)
    }
  }, [isCartOpen, closeCart])

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-choco/55 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l-[3px] border-choco bg-cream"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="relative flex items-center justify-between border-b-2 border-dashed border-choco/25 px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-choco bg-butter">
                  <ShoppingBag className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-2xl leading-none">Your Bag</h2>
                  <p className="text-xs font-semibold uppercase tracking-widest text-choco/50">
                    {count} {count === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="grid h-10 w-10 place-items-center rounded-full border-2 border-choco bg-white transition hover:bg-coral"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <EmptyState
                  icon={<DoodlePizza className="wiggle h-20 w-20 text-choco" />}
                  title="Your bag is empty"
                  description="Good food is one click away. Go find something delicious."
                  action={
                    <PrimaryButton to="/menu" icon={ArrowRight} onClick={closeCart}>
                      Browse Menu
                    </PrimaryButton>
                  }
                  className="border-0 bg-transparent px-2 py-10"
                />
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      compact
                      item={{
                        ...item,
                        onIncrement: () => increment(item.id),
                        onDecrement: () => decrement(item.id),
                        onRemove: () => removeItem(item.id),
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t-2 border-dashed border-choco/25 bg-cream px-5 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-choco/70">Subtotal</span>
                  <span className="font-display text-2xl">{formatINR(totals.subtotal)}</span>
                </div>
                <p className="mb-4 text-xs text-choco/55">
                  Taxes and delivery calculated at checkout.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <SecondaryButton to="/cart" onClick={closeCart} size="sm" className="w-full">
                    View Cart
                  </SecondaryButton>
                  <PrimaryButton to="/checkout" onClick={closeCart} size="sm" icon={ArrowRight} className="w-full">
                    Checkout
                  </PrimaryButton>
                </div>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
