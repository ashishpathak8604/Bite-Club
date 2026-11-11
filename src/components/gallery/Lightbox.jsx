import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import ImageWithFallback from '../common/ImageWithFallback'
import { lockScroll, unlockScroll } from '../../utils/scroll'
import { unsplashAtWidth, unsplashSrcSet } from '../../utils/images'

const categoryLabels = {
  food: 'Food',
  interior: 'Interior',
  people: 'People',
  kitchen: 'Behind the scenes',
}

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const open = index !== null
  const closeRef = useRef(null)
  const restoreFocusRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    restoreFocusRef.current = document.activeElement
    lockScroll()
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      unlockScroll(previous)
      window.removeEventListener('keydown', onKey)
      if (restoreFocusRef.current instanceof HTMLElement) {
        restoreFocusRef.current.focus({ preventScroll: true })
      }
    }
  }, [open, onClose, onPrev, onNext])

  useEffect(() => {
    if (!open || images.length < 2) return
    const next = images[(index + 1) % images.length]
    const prev = images[(index - 1 + images.length) % images.length]
    const preloaded = [next, prev].map((img) => {
      const image = new Image()
      image.src = unsplashAtWidth(img.src, 1200)
      return image
    })
    return () => preloaded.forEach((image) => {
      image.src = ''
    })
  }, [open, index, images])

  const image = open ? images[index] : null

  return (
    <AnimatePresence>
      {open && image && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-choco/90 p-4 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border-[3px] border-cream bg-choco text-cream transition hover:bg-coral hover:text-choco sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border-[3px] border-cream bg-choco text-cream transition hover:bg-butter hover:text-choco sm:left-6 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border-[3px] border-cream bg-choco text-cream transition hover:bg-butter hover:text-choco sm:right-6 sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="relative flex max-h-full w-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden rounded-[1.2rem] border-[3px] border-cream/80 bg-cream shadow-2xl">
              <ImageWithFallback
                src={image.src}
                srcSet={unsplashSrcSet(image.src, [800, 1200, 1600])}
                sizes="(max-width: 1024px) 92vw, 896px"
                alt={image.alt}
                loading="eager"
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>
            <div className="mt-4 flex w-full items-center justify-between gap-4 text-cream">
              <p className="text-sm text-cream/80 sm:text-base">{image.alt}</p>
              <span className="shrink-0 rounded-full border border-cream/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                {index + 1} / {images.length}
              </span>
            </div>
            <span className="mt-1 self-start rounded-full bg-coral px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-choco">
              {categoryLabels[image.category] || 'Bite Club'}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
