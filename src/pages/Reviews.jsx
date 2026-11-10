
import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import RatingSummary from '../components/reviews/RatingSummary'
import ReviewCard from '../components/reviews/ReviewCard'
import EmptyState from '../components/common/EmptyState'
import { PrimaryButton } from '../components/common/Button'
import { reviews, reviewSorts } from '../data/reviewData'

const PAGE_SIZE = 6

const ratingFilters = [
  { id: 'all', label: 'All ratings' },
  { id: '5', label: '5 stars' },
  { id: '4', label: '4 stars' },
  { id: '3', label: '3 stars' },
  { id: '2', label: '2 stars' },
  { id: '1', label: '1 star' },
]

export default function Reviews() {
  const [ratingFilter, setRatingFilter] = useState('all')
  const [sort, setSort] = useState('recent')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    let list = reviews.filter(
      (review) =>
        ratingFilter === 'all' || review.rating === Number(ratingFilter),
    )

    list = [...list]

    if (sort === 'highest') list.sort((a, b) => b.rating - a.rating)
    else if (sort === 'lowest') list.sort((a, b) => a.rating - b.rating)

    return list
  }, [ratingFilter, sort])

  const shown = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  const changeFilter = (value) => {
    setRatingFilter(value)
    setVisible(PAGE_SIZE)
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-cream pb-20 pt-28 sm:pt-32">
      {/* Background accents */}
      <div className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full bg-coral/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-[45%] h-72 w-72 rounded-full bg-pistachio/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-[25%] h-64 w-64 rounded-full bg-butter/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-7 text-center">
  <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-choco/50">
    CUSTOMER LOVE
  </p>
  <h1 className="font-display text-4xl leading-tight text-choco sm:text-5xl">
    Good Food. Happy People.
  </h1>
  <p className="mx-auto mt-3 max-w-lg text-sm text-choco/65 sm:text-base">
    A little love from the people who've tasted the Bite Club experience.
  </p>
</div>

        {/* Rating summary */}
        <div className="mx-auto flex max-w-xl justify-center text-center">
          <RatingSummary />
        </div>
        

        {/* Filters and sorting */}
        <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center gap-5">
          <div className="no-scrollbar flex w-full flex-wrap justify-center gap-2">
            {ratingFilters.map((filter) => {
              const active = ratingFilter === filter.id

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => changeFilter(filter.id)}
                  aria-pressed={active}
                  className={`rounded-full border-2 border-choco px-4 py-2 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 sm:text-sm ${
                    active
                      ? 'bg-choco text-cream shadow-[3px_3px_0_0_#553B32]'
                      : 'bg-white/70 hover:bg-butter'
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-choco/50">
              Showing {shown.length} of {filtered.length} reviews
            </p>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort reviews"
                className="cursor-pointer appearance-none rounded-full border-2 border-choco bg-white py-2 pl-4 pr-10 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange/60"
              >
                {reviewSorts.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        {filtered.length === 0 ? (
          <div className="mx-auto mt-12 max-w-xl">
            <EmptyState
              title="No reviews in this range"
              description="Try a different star filter — or go back to all ratings."
              action={
                <PrimaryButton onClick={() => changeFilter('all')}>
                  Show all reviews
                </PrimaryButton>
              }
            />
          </div>
        ) : (
          <>
            <div className="mt-8 grid auto-rows-[minmax(190px,auto)] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {shown.map((review, i) => {
                const layouts = [
                  'lg:col-span-2',
                  'lg:col-span-1',
                  'lg:col-span-1',
                  'lg:col-span-2',
                  'lg:col-span-1',
                  'lg:col-span-1',
                ]

                return (
                  <div
                    key={review.id}
                    className={`min-w-0 ${layouts[i % layouts.length]}`}
                  >
                    <ReviewCard review={review} index={i} />
                  </div>
                )
              })}
            </div>

            {/* Load more */}
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <PrimaryButton
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  icon={ChevronDown}
                >
                  Load more reviews
                </PrimaryButton>
              </div>
            )}

            {!hasMore && filtered.length > PAGE_SIZE && (
              <p className="mt-10 text-center font-script text-xl text-choco/50">
                that’s all the love for now
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
