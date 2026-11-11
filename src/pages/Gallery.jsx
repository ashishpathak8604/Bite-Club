
import { useCallback, useMemo, useState } from 'react'
import { Images } from 'lucide-react'
import GalleryGrid from '../components/gallery/GalleryGrid'
import Lightbox from '../components/gallery/Lightbox'
import EmptyState from '../components/common/EmptyState'
import { PrimaryButton } from '../components/common/Button'
import { galleryCategories, galleryData } from '../data/galleryData'

export default function Gallery() {
  const [category, setCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filtered = useMemo(
    () =>
      category === 'all'
        ? galleryData
        : galleryData.filter((image) => image.category === category),
    [category],
  )

  const openImage = useCallback((index) => setLightboxIndex(index), [])
  const closeImage = useCallback(() => setLightboxIndex(null), [])

  const nextImage = useCallback(
    () =>
      setLightboxIndex((current) =>
        current === null ? null : (current + 1) % filtered.length,
      ),
    [filtered.length],
  )

  const prevImage = useCallback(
    () =>
      setLightboxIndex((current) =>
        current === null
          ? null
          : (current - 1 + filtered.length) % filtered.length,
      ),
    [filtered.length],
  )

  const changeCategory = useCallback((id) => {
    setCategory(id)
    setLightboxIndex(null)
  }, [])

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-cream pb-16 pt-28 sm:pb-20 sm:pt-32">
        {/* Background accents */}
        <div className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-pistachio/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-[45%] h-72 w-72 rounded-full bg-coral/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-[25%] h-64 w-64 rounded-full bg-butter/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

          {/* Page heading */}
          <div className="mb-9 text-center sm:mb-11">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-choco/50">
              THE BITE CLUB COLLECTION
            </p>

            <h1 className="font-display text-4xl leading-tight text-choco sm:text-5xl lg:text-6xl">
              A Feast for the Eyes.
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-choco/65 sm:text-base">
              Good food, great moments, and everything happening around the
              Bite Club table.
            </p>
          </div>

          {/* Category filters */}
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-5">
            <div className="no-scrollbar flex w-full flex-wrap justify-center gap-2">
              {galleryCategories.map((cat) => {
                const active = category === cat.id

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => changeCategory(cat.id)}
                    aria-pressed={active}
                    className={`rounded-full border-2 border-choco px-4 py-2 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 sm:text-sm ${
                      active
                        ? 'bg-choco text-cream shadow-[3px_3px_0_0_#553B32]'
                        : 'bg-white/70 hover:bg-butter'
                    }`}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>

            {/* Photo count */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-choco/50">
              <Images className="h-4 w-4" />
              <span>{filtered.length} photos</span>
            </div>
          </div>

          {/* Gallery */}
          {filtered.length > 0 ? (
            <div className="mt-9 sm:mt-11">
              <GalleryGrid items={filtered} onOpen={openImage} />
            </div>
          ) : (
            <div className="mx-auto mt-10 max-w-xl">
              <EmptyState
                title="No photos here yet"
                description="Try another category — there is plenty to see."
                action={
                  <PrimaryButton onClick={() => changeCategory('all')}>
                    View all photos
                  </PrimaryButton>
                }
              />
            </div>
          )}

          {/* Demo note */}
          <p className="mt-10 text-center font-script text-xl text-choco/50">
            all photos are sample imagery for this demo
          </p>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={filtered}
        index={lightboxIndex}
        onClose={closeImage}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </>
  )
}
