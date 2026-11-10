import { Star } from 'lucide-react'
import { overallRating, ratingBreakdown, totalReviews } from '../../data/reviewData'
import Stars from '../common/Stars'
import { DoodleSparkle } from '../common/DoodleElements'

export default function RatingSummary() {
  return (
    <div className="sticker relative overflow-hidden rounded-[2rem] bg-butter p-6 sm:p-8">
      <div className="flex flex-wrap items-end gap-4">
        <span className="font-display text-[5rem] leading-[0.72] sm:text-[6rem]">
          {overallRating}
        </span>
        <div className="pb-1">
          <Stars rating={overallRating} size="h-5 w-5" />
          <p className="mt-1 text-sm font-semibold text-choco/60">
            Based on {totalReviews} sample reviews
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {ratingBreakdown.map((row) => {
          const percent = Math.round((row.count / totalReviews) * 100)
          return (
            <div key={row.stars} className="flex items-center gap-2.5 text-xs">
              <span className="flex w-8 shrink-0 items-center gap-0.5 font-semibold">
                {row.stars}
                <Star className="h-3 w-3" fill="currentColor" strokeWidth={0} />
              </span>
              <span className="h-2.5 flex-1 overflow-hidden rounded-full border border-choco/40 bg-cream">
                <span
                  className="block h-full rounded-full bg-choco"
                  style={{ width: `${percent}%` }}
                />
              </span>
              <span className="w-8 shrink-0 text-right font-semibold text-choco/55">
                {row.count}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-6 rounded-xl border-2 border-dashed border-choco/30 bg-cream/50 p-3 text-xs leading-relaxed text-choco/65">
        <DoodleSparkle className="mb-1 inline h-3 w-3" /> These ratings and reviews are
        fictional sample data for this demo. They do not represent real Google reviews or
        real customer feedback.
      </div>
    </div>
  )
}
