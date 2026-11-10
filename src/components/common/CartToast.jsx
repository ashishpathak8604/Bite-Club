import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function CartToast() {
  const { toast, dismissToast } = useCart()

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[90] flex justify-center px-4 sm:bottom-6 sm:justify-end sm:px-6">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ y: 30, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="pointer-events-auto flex items-center gap-3 rounded-full border-[3px] border-choco bg-butter px-4 py-2.5 shadow-[5px_5px_0_0_#553B32]"
            role="status"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-choco bg-pistachio">
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
            <span className="max-w-[52vw] truncate text-sm font-semibold sm:max-w-xs">
              {toast.message}
            </span>
            <Link
              to="/cart"
              onClick={dismissToast}
              className="rounded-full border-2 border-choco bg-cream px-3 py-1 text-xs font-bold uppercase tracking-wide"
            >
              View
            </Link>
            <button
              type="button"
              onClick={dismissToast}
              aria-label="Dismiss notification"
              className="grid h-6 w-6 place-items-center rounded-full text-choco/60 hover:text-choco"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
