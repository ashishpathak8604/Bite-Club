
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react'
import { signatureDishes } from '../../data/menuData'
import { useCart } from '../../context/CartContext'
import { formatINR } from '../../utils/format'
import ImageWithFallback from '../common/ImageWithFallback'
import SectionHeading from '../common/SectionHeading'
import ScrollReveal from '../common/ScrollReveal'
import {
  DoodleArrow,
  DoodleDashedArc,
  DoodleSparkle,
  DoodleStar,
} from '../common/DoodleElements'

export default function SignatureDishes() {
  const [active, setActive] = useState(
    Math.floor(signatureDishes.length / 2)
  )
  const [width, setWidth] = useState(1100)
  const [drag, setDrag] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const containerRef = useRef(null)
  const animationFrame = useRef(null)

  const dragState = useRef({
    down: false,
    startX: 0,
    delta: 0,
    didDrag: false,
  })

  const { addItem, getQty } = useCart()

  const total = signatureDishes.length

  const wrap = (value) =>
    ((value % total) + total) % total

  // Observe container dimensions
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ro = new ResizeObserver((entries) => {
      const nextWidth = entries[0].contentRect.width
      setWidth((prev) => prev === nextWidth ? prev : nextWidth)
    })

    ro.observe(el)

    return () => ro.disconnect()
  }, [])

  // Responsive dimensions
  const safeWidth = width > 0 ? width : 1100
  const isMobile = safeWidth < 640

  const baseWidth = isMobile
    ? Math.min(safeWidth * 0.65, 260)
    : Math.min(safeWidth * 0.26, 310)

  const spacing = baseWidth * (isMobile ? 0.82 : 1)

  const height = isMobile ? 340 : 470

  const activeDish = signatureDishes[wrap(active)]
  const activeQty = getQty(activeDish.id)

  // Infinite navigation
  const go = (direction) => {
    setActive((current) => wrap(current + direction))
  }

  // Drag handling
  const onPointerDown = (e) => {
    dragState.current = {
      down: true,
      startX: e.clientX,
      delta: 0,
      didDrag: false,
    }

    setIsDragging(true)
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!dragState.current.down) return

    const delta = e.clientX - dragState.current.startX

    dragState.current.delta = delta

    if (Math.abs(delta) > 6) {
      dragState.current.didDrag = true
    }

    // Limit React updates to animation frames
    if (animationFrame.current !== null) return

    animationFrame.current = requestAnimationFrame(() => {
      setDrag(dragState.current.delta)
      animationFrame.current = null
    })
  }

  const endDrag = () => {
    if (!dragState.current.down) return

    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current)
      animationFrame.current = null
    }

    const delta = dragState.current.delta

    const steps = spacing > 0
      ? Math.round(-delta / (spacing * 0.7))
      : 0

    dragState.current.down = false

    if (Number.isFinite(steps) && steps !== 0) {
      setActive((current) => wrap(current + steps))
    }

    setDrag(0)
    setIsDragging(false)
  }

  const onItemClick = (index) => {
    if (dragState.current.didDrag) {
      dragState.current.didDrag = false
      return
    }

    setActive(wrap(index))
  }

  // Cleanup pending animation frame
  useEffect(() => {
    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-butter py-16 sm:py-24">

      {/* Background */}
      <div
        className="halftone pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden="true"
      />

      {/* Decorations */}
      <DoodleStar
        className="wiggle absolute left-[5%] top-[12%] hidden h-10 w-10 text-choco/70 sm:block"
      />

      <DoodleSparkle
        className="absolute right-[8%] top-[18%] hidden h-7 w-7 text-choco/60 sm:block"
      />

      <DoodleArrow
        className="absolute bottom-[10%] left-[6%] hidden h-16 w-24 -scale-x-100 text-choco/40 lg:block"
      />

      {/* Heading */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <ScrollReveal className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            title="FAMOUS"
            script="dishes"
            description="Spin through the plates people come back for. Drag the reel, follow the curve, find your next obsession."
          />
        </ScrollReveal>
      </div>

      {/* 3D INFINITE CAROUSEL */}
      <div className="relative left-1/2 mt-10 w-screen max-w-none -translate-x-1/2">

        <div
          ref={containerRef}
          className="relative w-full select-none overflow-visible"
          style={{
            height,
            touchAction: 'pan-y',
            perspective: '1400px',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          role="region"
          aria-label="Infinite signature dishes carousel. Drag or use the arrow buttons."
        >

          {/* Dashed circular path */}
          <DoodleDashedArc
            className="pointer-events-none absolute left-1/2 top-1/2 h-[135%] w-[135%] -translate-x-1/2 -translate-y-1/2 text-choco/20 sm:h-[160%] sm:w-[120%]"
          />

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-choco/25 sm:h-52 sm:w-52" />

          {/* Every dish keeps a stable React identity */}
          {signatureDishes.map((dish, dishIndex) => {

            // Calculate shortest circular distance
            const offset =
              ((dishIndex - active + total / 2) % total + total) % total -
              total / 2

            const dragOffset = spacing > 0 ? drag / spacing : 0

            const position = offset + dragOffset
            const abs = Math.abs(position)

            const isActive = dishIndex === wrap(active) && Math.abs(drag) < 5

            const x = position * spacing

            const y =
              -Math.pow(abs, 1.3) * (isMobile ? 12 : 16)

            const scale = Math.max(
              0.60,
              1.12 - abs * 0.13
            )

            const rotate = position * (isMobile ? 4 : 6)
            const rotateY = position * -9

            const opacity = abs > 4.5 ? 0 : 1

            const zIndex = 100 - Math.round(abs * 10)

            return (
              <button
                type="button"
                key={dish.id}
                onClick={() => onItemClick(dishIndex)}
                aria-label={`Show ${dish.name}`}
                aria-current={isActive ? 'true' : undefined}
                tabIndex={opacity === 0 ? -1 : 0}
                className="absolute left-1/2 top-1/2 overflow-hidden rounded-[1.4rem] border-[3px] border-choco bg-cream shadow-[0_18px_35px_-18px_rgba(85,59,50,0.7)]"
                style={{
                  width: baseWidth,
                  height: baseWidth * 1.35,
                  opacity,
                  zIndex,
                  pointerEvents: opacity === 0 ? 'none' : 'auto',

                  filter: isActive
                    ? 'none'
                    : 'saturate(0.85)',

                  transform: `
                    translate3d(
                      calc(-50% + ${x}px),
                      calc(-50% + ${y}px),
                      0
                    )
                    rotateY(${rotateY}deg)
                    rotate(${rotate}deg)
                    scale(${scale})
                  `,

                  transition: isDragging
                    ? 'none'
                    : `
                      transform 850ms cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 500ms ease,
                      filter 500ms ease
                    `,

                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
              >

                <ImageWithFallback
                  src={dish.image}
                  alt={dish.name}
                  className="h-full w-full object-cover pointer-events-none"
                />

                {/* Food name */}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-choco/85 to-transparent px-3 pb-2 pt-8 text-left font-display text-xs uppercase tracking-wide text-cream">
                  {dish.name}
                </span>

                {/* Signature badge */}
                {isActive && (
                  <span className="pointer-events-none absolute left-2 top-2 rounded-full border-2 border-choco bg-butter px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide">
                    signature
                  </span>
                )}

              </button>
            )
          })}

        </div>
      </div>

      {/* Navigation */}
      <div className="relative mt-4 flex items-center justify-center gap-4">

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous signature dish"
          className="grid h-12 w-12 place-items-center rounded-full border-[3px] border-choco bg-cream transition-all duration-300 hover:-translate-y-1 hover:bg-orange active:scale-90"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.6} />
        </button>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next signature dish"
          className="grid h-12 w-12 place-items-center rounded-full border-[3px] border-choco bg-cream transition-all duration-300 hover:-translate-y-1 hover:bg-orange active:scale-90"
        >
          <ArrowRight className="h-5 w-5" strokeWidth={2.6} />
        </button>

      </div>

      {/* Active dish information */}
      <div className="relative mt-6 flex flex-col items-center gap-4 px-4 text-center">

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">

          <span className="font-script text-lg text-choco/70">
            now showing
          </span>

          <h3 className="text-2xl sm:text-3xl">
            {activeDish.name}
          </h3>

          <span className="rounded-full border-2 border-choco bg-cream px-2.5 py-0.5 font-display text-sm">
            {formatINR(activeDish.price)}
          </span>

        </div>

        {/* Add to cart */}
        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={() => addItem(activeDish)}
            className="inline-flex items-center gap-2 rounded-full border-[3px] border-choco bg-choco px-5 py-2.5 text-sm font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-orange hover:text-choco"
          >
            <Plus className="h-4 w-4" strokeWidth={3} />
            Add {activeDish.name}
          </button>

          {activeQty > 0 && (
            <span className="rounded-full border-2 border-choco bg-pistachio px-3 py-1.5 text-xs font-bold">
              {activeQty} in cart
            </span>
          )}

        </div>

        {/* Dish indicators */}
        <div className="mt-1 flex items-center gap-1.5">

          {signatureDishes.map((dish, i) => (
            <button
              key={dish.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to ${dish.name}`}
              aria-current={i === active ? 'true' : undefined}
              className={`h-2 rounded-full border border-choco transition-all duration-500 ${
                i === active
                  ? 'w-6 bg-choco'
                  : 'w-2 bg-cream'
              }`}
            />
          ))}

        </div>

      </div>

    </section>
  )
}
