export const formatINR = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0)

export const TAX_RATE = 0.05
export const DELIVERY_FEE = 49
export const FREE_DELIVERY_THRESHOLD = 799

export const getTotals = (items) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const tax = Math.round(subtotal * TAX_RATE)
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  return {
    subtotal,
    tax,
    delivery,
    total: subtotal + tax + delivery,
  }
}

export const makeOrderId = () =>
  `BC-${Date.now().toString(36).toUpperCase().slice(-6)}-${Math.floor(
    Math.random() * 900 + 100,
  )}`

export const loadJSON = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export const saveJSON = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable — fail silently for demo */
  }
}

export const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim())

export const isValidPhone = (value) =>
  /^[+]?[\d\s-]{10,15}$/.test(String(value).trim())

export const isValidPostal = (value) => /^\d{5,6}$/.test(String(value).trim())
