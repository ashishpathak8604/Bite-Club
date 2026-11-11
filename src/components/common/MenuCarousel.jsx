
import { useEffect, useMemo, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import FoodCard from '../menu/FoodCard'

const ROTATIONS = [
  '-rotate-[1.5deg]',
  'rotate-[1deg]',
  '-rotate-[0.5deg]',
  'rotate-[1.5deg]',
]

export default function MenuCarousel({ items }) {
  const trackRef = useRef(null)
  const segmentRef = useRef(0)
  const tickingRef = useRef(false)

  // Three identical sets allow seamless infinite scrolling.
  const loopItems = useMemo(() => [...items, ...items, ...items], [items])

  useEffect(() => {
    const track = trackRef.current
    if (!track || !items.length) return

    const measure = () => {
      const cards = track.querySelectorAll('[data-carousel-card]')
      const first = cards[0]
      const secondSet = cards[items.length]
      if (!first || !secondSet) return

      segmentRef.current = secondSet.offsetLeft - first.offsetLeft
      if (segmentRef.current > 0) {
        track.scrollLeft = segmentRef.current
      }
    }

    const frame = requestAnimationFrame(measure)
    const observer = new ResizeObserver(measure)
    observer.observe(track)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [items])

  const handleInfiniteScroll = () => {
    if (tickingRef.current) return
    tickingRef.current = true

    requestAnimationFrame(() => {
      tickingRef.current = false
      const track = trackRef.current
      const segmentWidth = segmentRef.current
      if (!track || segmentWidth <= 0) return

      if (track.scrollLeft < segmentWidth * 0.5) {
        track.scrollLeft += segmentWidth
      } else if (track.scrollLeft > segmentWidth * 2.5) {
        track.scrollLeft -= segmentWidth
      }
    })
  }

  const scrollBy = (direction) => {
    const track = trackRef.current
    if (!track) return

    const card = track.querySelector('[data-carousel-card]')
    if (!card) return

    const cardWidth = card.getBoundingClientRect().width
    const gap = 24

    track.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: 'smooth',
    })
  }

  return (
    <div className="w-full overflow-hidden">

      {/* FULL-WIDTH FOOD REEL */}
      <div
        ref={trackRef}
        onScroll={handleInfiniteScroll}
        className="no-scrollbar flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto px-[3vw] pb-8 pt-5"
        style={{
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {loopItems.map((item, index) => (
          <div
            key={`${index}-${item.id}`}
            data-carousel-card
            className={`
              w-[78vw] max-w-[440px] shrink-0 snap-center
              sm:w-[43vw]
              lg:w-[24vw]
              ${ROTATIONS[index % ROTATIONS.length]}
              transition-transform duration-500
              hover:rotate-0 hover:-translate-y-2
            `}
          >
            <FoodCard item={item} />
          </div>
        ))}
      </div>

      {/* CENTERED CAROUSEL CONTROLS */}
      <div className="mt-5 flex items-center justify-center gap-5">

        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous dishes"
          className="grid h-14 w-14 place-items-center rounded-full border-2 border-choco bg-[#DCA873] text-choco transition-all duration-300 hover:-translate-y-1 hover:bg-butter active:translate-y-0"
        >
          <ArrowLeft className="h-6 w-6" strokeWidth={2} />
        </button>

        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next dishes"
          className="grid h-14 w-14 place-items-center rounded-full border-2 border-choco bg-[#DCA873] text-choco transition-all duration-300 hover:-translate-y-1 hover:bg-butter active:translate-y-0"
        >
          <ArrowRight className="h-6 w-6" strokeWidth={2} />
        </button>

      </div>
    </div>
  )
}
