import { useState } from 'react'
import { ArrowLeft, ArrowRight, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import PageHero from '../components/common/PageHero'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import EmptyState from '../components/common/EmptyState'
import FoodCard from '../components/menu/FoodCard'
import { PrimaryButton, SecondaryButton } from '../components/common/Button'
import { menuData } from '../data/menuData'
import { formatINR } from '../utils/format'
import { DoodlePizza } from '../components/common/DoodleElements'

export default function Cart() {
  const { items, count, totals, increment, decrement, removeItem, clearCart } = useCart()
  const [confirmClear, setConfirmClear] = useState(false)

  const suggestions = menuData
    .filter((item) => item.featured && !items.some((cartItem) => cartItem.id === item.id))
    .slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow="Your Bag"
        title="ALL THE"
        script="good things"
        description="A little look at what you have picked. Adjust quantities, remove the things you changed your mind about, then head to checkout."
        tone="butter"
        oversized="bag"
      >
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-choco bg-cream/80 px-4 py-2 text-xs font-bold uppercase tracking-wide">
          <ShoppingBag className="h-4 w-4" />
          {count} {count === 1 ? 'item' : 'items'} in your bag
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-choco bg-cream/80 px-4 py-2 text-xs font-bold uppercase tracking-wide">
          Saved automatically
        </span>
      </PageHero>

      <section className="relative overflow-hidden bg-cream py-12 sm:py-16">
        <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-butter/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          {items.length === 0 ? (
            <div className="mx-auto max-w-2xl">
              <EmptyState
                icon={<DoodlePizza className="wiggle h-24 w-24 text-choco" />}
                title="Your bag is empty"
                description="Good food is one click away. Browse the menu and add something delicious to get started."
                action={
                  <PrimaryButton to="/menu" icon={ArrowRight}>
                    Browse the Menu
                  </PrimaryButton>
                }
              />
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
              <div>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-2xl">Your order</h2>
                  <div className="flex items-center gap-3">
                    {confirmClear ? (
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <span>Clear bag?</span>
                        <button
                          type="button"
                          onClick={() => {
                            clearCart()
                            setConfirmClear(false)
                          }}
                          className="rounded-full border-2 border-choco bg-coral px-3 py-1.5"
                        >
                          Yes, clear
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmClear(false)}
                          className="rounded-full border-2 border-choco bg-white px-3 py-1.5"
                        >
                          Keep
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmClear(true)}
                        className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold text-choco/50 transition hover:text-choco"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Clear cart
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={{
                        ...item,
                        onIncrement: () => increment(item.id),
                        onDecrement: () => decrement(item.id),
                        onRemove: () => removeItem(item.id),
                      }}
                    />
                  ))}
                </div>

                <div className="mt-5">
                  <SecondaryButton to="/menu" icon={ArrowLeft} iconPosition="left" size="sm">
                    Continue shopping
                  </SecondaryButton>
                </div>
              </div>

              <aside className="lg:sticky lg:top-28">
                <div className="rounded-[1.8rem] border-[3px] border-choco bg-white/70 p-5 shadow-[5px_5px_0_0_#553B32]">
                  <h2 className="text-2xl">Order summary</h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-choco/45">
                    {count} {count === 1 ? 'item' : 'items'}
                  </p>

                  <CartSummary totals={totals} className="mt-4 border-choco/20 bg-transparent p-0" />

                  <PrimaryButton to="/checkout" icon={ArrowRight} className="mt-5 w-full">
                    Proceed to Checkout
                  </PrimaryButton>

                  <p className="mt-3 text-center text-[11px] leading-relaxed text-choco/45">
                    Totals include 5% sample tax and a mock delivery fee. Free delivery over {formatINR(799)}.
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-choco/50">
                  <span className="h-2 w-2 rounded-full bg-pistachio" />
                  Cart saved to this browser
                </div>
              </aside>
            </div>
          )}

          {items.length > 0 && suggestions.length > 0 && (
            <div className="mt-16">
              <div className="mb-5 flex items-end justify-between gap-3">
                <div>
                  <p className="font-script text-lg text-choco/60">one more thing?</p>
                  <h2 className="text-3xl">MAYBE ADD A LITTLE EXTRA</h2>
                </div>
                <SecondaryButton to="/menu" size="sm" icon={ArrowRight} className="hidden sm:inline-flex">
                  Full menu
                </SecondaryButton>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {suggestions.map((item) => (
                  <FoodCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
