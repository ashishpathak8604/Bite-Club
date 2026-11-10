
import { Leaf, Search, X } from 'lucide-react'
import { categories } from '../../data/menuData'

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'name', label: 'Name: A to Z' },
]

export default function MenuFilters({
  query,
  setQuery,
  category,
  setCategory,
  sort,
  setSort,
  vegOnly,
  setVegOnly,
  resultCount,
  onClear,
}) {
  return (
   <div className="relative z-10 mx-auto w-[calc(100%-2rem)] max-w-6xl translate-y-23">
      <div className="rounded-[1.5rem] border-[3px] border-choco bg-cream/95 p-3 shadow-[4px_4px_0_0_#553B32] backdrop-blur-xl sm:p-4">

        {/* Search and controls */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-choco/50" />

            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes, ingredients, cravings..."
              aria-label="Search the menu"
              className="w-full rounded-full border-2 border-choco bg-white py-2.5 pl-11 pr-10 text-sm font-medium text-choco placeholder:text-choco/40 transition-all duration-300 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/30"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-choco/10 transition-colors hover:bg-coral"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setVegOnly((v) => !v)}
              aria-pressed={vegOnly}
              className={`inline-flex items-center gap-1.5 rounded-full border-2 border-choco px-3.5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                vegOnly
                  ? 'bg-pistachio shadow-[2px_2px_0_0_#553B32]'
                  : 'bg-white hover:bg-pistachio/40'
              }`}
            >
              <Leaf className="h-4 w-4" />
              Veg only
            </button>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort menu items"
                className="cursor-pointer appearance-none rounded-full border-2 border-choco bg-white py-2.5 pl-4 pr-9 text-sm font-semibold transition-all duration-300 hover:bg-butter focus:outline-none focus:ring-2 focus:ring-orange/40"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>

              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>

            <span className="ml-auto hidden rounded-full border-2 border-choco/20 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wide text-choco/60 sm:inline-flex">
              {resultCount} {resultCount === 1 ? 'dish' : 'dishes'}
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto border-t border-dashed border-choco/20 pt-3">
          {categories.map((cat) => {
            const active = category === cat.id

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                aria-pressed={active}
                className={`shrink-0 rounded-full border-2 border-choco px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 sm:text-sm ${
                  active
                    ? 'bg-choco text-cream shadow-[2px_2px_0_0_#553B32]'
                    : 'bg-white text-choco hover:bg-butter'
                }`}
              >
                {cat.label}
              </button>
            )
          })}

          {(query || category !== 'all' || vegOnly) && (
            <button
              type="button"
              onClick={onClear}
              className="ml-1 inline-flex shrink-0 items-center gap-1 rounded-full border-2 border-dashed border-choco/40 px-3 py-1.5 text-xs font-semibold text-choco/60 transition-all hover:border-choco hover:bg-coral/20 hover:text-choco"
            >
              <X className="h-3 w-3" />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
