import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { getTotals, loadJSON, saveJSON } from '../utils/format'

const CartContext = createContext(null)
const STORAGE_KEY = 'biteclub.cart.v1'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadJSON(STORAGE_KEY, []))
  const [isCartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  useEffect(() => {
    saveJSON(STORAGE_KEY, items)
  }, [items])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const notify = useCallback((message, tone = 'success') => {
    clearTimeout(toastTimer.current)
    setToast({ id: Date.now(), message, tone })
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }, [])

  const addItem = useCallback(
    (dish, qty = 1) => {
      setItems((prev) => {
        const existing = prev.find((item) => item.id === dish.id)
        if (existing) {
          return prev.map((item) =>
            item.id === dish.id ? { ...item, qty: item.qty + qty } : item,
          )
        }
        return [
          ...prev,
          {
            id: dish.id,
            name: dish.name,
            price: dish.price,
            image: dish.image,
            qty,
          },
        ]
      })
      notify(`${dish.name} added to cart`)
    },
    [notify],
  )

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const increment = useCallback((id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)),
    )
  }, [])

  const decrement = useCallback((id) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    )
  }, [])

  const setQty = useCallback((id, qty) => {
    const next = Math.max(0, Number(qty) || 0)
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: next } : item))
        .filter((item) => item.qty > 0),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])
  const dismissToast = useCallback(() => setToast(null), [])

  const openCart = useCallback(() => setCartOpen(true), [])
  const closeCart = useCallback(() => setCartOpen(false), [])

  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items])
  const totals = useMemo(() => getTotals(items), [items])
  const getQty = useCallback(
    (id) => items.find((item) => item.id === id)?.qty ?? 0,
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      count,
      totals,
      isCartOpen,
      toast,
      addItem,
      removeItem,
      increment,
      decrement,
      setQty,
      clearCart,
      openCart,
      closeCart,
      getQty,
      notify,
      dismissToast,
    }),
    [
      items,
      count,
      totals,
      isCartOpen,
      toast,
      addItem,
      removeItem,
      increment,
      decrement,
      setQty,
      clearCart,
      openCart,
      closeCart,
      getQty,
      notify,
      dismissToast,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside a CartProvider')
  return ctx
}
