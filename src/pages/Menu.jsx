
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import MenuFilters from '../components/menu/MenuFilters'
import FoodGrid from '../components/menu/FoodGrid'
import EmptyState from '../components/common/EmptyState'
import { PrimaryButton } from '../components/common/Button'
import { categories, menuData } from '../data/menuData'

import {
  DoodleArrow,
  DoodleBurst,
  DoodleChili,
  DoodleHeart,
  DoodlePizza,
  DoodleSparkle,
  DoodleStar,
  DoodleSwirl,
  DoodleSquiggle,
} from '../components/common/DoodleElements'

const initialFilters = {
  query: '',
  category: 'all',
  sort: 'featured',
  vegOnly: false,
}

export default function Menu() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(initialFilters.query)
  const [category, setCategory] = useState(initialFilters.category)
  const [sort, setSort] = useState(initialFilters.sort)
  const [vegOnly, setVegOnly] = useState(initialFilters.vegOnly)

  const categoryParam = searchParams.get('category')

  useEffect(() => {
    if (categoryParam && categories.some((c) => c.id === categoryParam)) {
      setCategory(categoryParam)
    }
  }, [categoryParam])

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase()

    let items = menuData.filter((item) => {
      const matchesCategory =
        category === 'all' || item.category === category

      const matchesVeg = !vegOnly || item.veg

      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)

      return matchesCategory && matchesVeg && matchesSearch
    })

    items = [...items]

    if (sort === 'price-asc') {
      items.sort((a, b) => a.price - b.price)
    } else if (sort === 'price-desc') {
      items.sort((a, b) => b.price - a.price)
    } else if (sort === 'name') {
      items.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      items.sort((a, b) => Number(b.featured) - Number(a.featured))
    }

    return items
  }, [query, category, sort, vegOnly])

  const clearFilters = () => {
    setQuery(initialFilters.query)
    setCategory(initialFilters.category)
    setSort(initialFilters.sort)
    setVegOnly(initialFilters.vegOnly)
  }

  return (
    <div data-menu-page className="relative">

      <MenuFilters
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        vegOnly={vegOnly}
        setVegOnly={setVegOnly}
        resultCount={filtered.length}
        onClear={clearFilters}
      />

      <section className="relative isolate overflow-hidden bg-cream pt-8 pb-12 sm:pt-18 sm:pb-16">

        {/* Background gradients */}
        <div className="pointer-events-none absolute -left-32 top-40 -z-10 h-80 w-80 rounded-full bg-pistachio/30 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 top-[35%] -z-10 h-80 w-80 rounded-full bg-butter/50 blur-3xl" />

        <div className="pointer-events-none absolute bottom-20 left-[35%] -z-10 h-64 w-64 rounded-full bg-coral/10 blur-3xl" />

        {/* Dotted background texture */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(#553B32 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Decorative dotted paths */}
        <svg
          className="pointer-events-none absolute left-0 top-20 -z-10 h-64 w-full opacity-25"
          viewBox="0 0 1440 250"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M-50 180 C200 20 380 260 650 110 S1100 20 1490 170"
            stroke="#553B32"
            strokeWidth="2"
            strokeDasharray="5 10"
          />
        </svg>

        <svg
          className="pointer-events-none absolute bottom-40 left-0 -z-10 h-64 w-full opacity-20"
          viewBox="0 0 1440 250"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M-50 100 C300 250 450 10 750 130 S1200 250 1490 70"
            stroke="#553B32"
            strokeWidth="2"
            strokeDasharray="4 9"
          />
        </svg>

        {/* Floating doodles */}

        <DoodleStar className="wiggle pointer-events-none absolute left-[5%] top-24 h-9 w-9 text-butter opacity-90" />

        <DoodleSparkle className="float-delay pointer-events-none absolute right-[8%] top-32 h-7 w-7 text-coral" />

        <DoodleHeart className="wiggle pointer-events-none absolute right-[13%] top-[28%] h-9 w-9 rotate-12 text-coral/70" />

        <DoodleChili className="float-delay pointer-events-none absolute left-[3%] top-[43%] hidden h-16 w-16 -rotate-12 text-orange/80 lg:block" />

        <DoodlePizza className="plate-float pointer-events-none absolute right-[3%] top-[52%] hidden h-20 w-20 rotate-12 text-choco/60 lg:block" />

        <DoodleBurst className="wiggle pointer-events-none absolute left-[12%] top-[65%] h-10 w-10 text-coral/70" />

        <DoodleSwirl className="pointer-events-none absolute right-[10%] bottom-[19%] h-16 w-16 rotate-12 text-choco/30" />

        <DoodleArrow className="pointer-events-none absolute bottom-[8%] left-[26%] h-16 w-20 -rotate-12 text-orange/50" />

        <DoodleSquiggle className="float-delay pointer-events-none absolute right-[32%] top-[17%] h-7 w-24 text-choco/30" />

        <DoodleStar className="pointer-events-none absolute bottom-[12%] right-[35%] h-6 w-6 text-butter" />

        {/* Main menu content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-8">

          {/* Menu information */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

            <p className="text-sm font-semibold text-choco/60">
              Showing{' '}
              <span className="font-bold text-choco">
                {filtered.length}
              </span>{' '}
              of {menuData.length} dishes
            </p>

            <p className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-choco/40 sm:block">
              Add items — your bag updates instantly
            </p>

          </div>

          {/* Food grid */}
          {filtered.length > 0 ? (
            <FoodGrid items={filtered} />
          ) : (
            <EmptyState
              title="No dishes match that"
              description="Try a different category, loosen the filters, or search for something simpler like ‘pizza’."
              action={
                <PrimaryButton onClick={clearFilters} icon={ArrowRight}>
                  Clear all filters
                </PrimaryButton>
              }
            />
          )}

          {/* Weekend special banner */}
          <div className="relative mt-14 overflow-hidden rounded-[2rem] border-[3px] border-choco bg-orange p-6 shadow-[6px_6px_0_0_#553B32] sm:p-9">

            {/* Banner decorations */}
            <DoodleStar className="pointer-events-none absolute right-[8%] top-5 h-8 w-8 text-butter/80" />

            <DoodleSparkle className="pointer-events-none absolute bottom-5 right-[25%] h-6 w-6 text-choco/30" />

            <DoodleSquiggle className="pointer-events-none absolute bottom-5 left-[45%] h-6 w-20 text-choco/20" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">

              <div>
                <p className="font-script text-xl text-choco/70">
                  can’t decide?
                </p>

                <h2 className="mt-1 text-3xl sm:text-4xl">
                  LET THE KITCHEN PICK FOR YOU
                </h2>

                <p className="mt-2 max-w-lg text-sm text-choco/75">
                  The Weekend Feast Platter is a bit of everything —
                  kebabs, loaded fries, dips, slaw and warm flatbreads.
                  Built for the table.
                </p>
              </div>

              <PrimaryButton
                to="/menu?category=specials"
                icon={ArrowRight}
                className="shrink-0"
              >
                See Specials
              </PrimaryButton>

            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
