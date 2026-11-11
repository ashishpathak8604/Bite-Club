import { Expand } from 'lucide-react'
import { unsplashSrcSet } from '../../utils/images'
import ImageWithFallback from '../common/ImageWithFallback'

const categoryLabels = {
  food: 'Food',
  interior: 'Interior',
  people: 'People',
  kitchen: 'Kitchen',
}

export default function GalleryGrid({ items, onOpen }) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {items.map((image, index) => (
        <button
          type="button"
          key={image.id}
          onClick={() => onOpen(index)}
          aria-label={`Open image: ${image.alt}`}
          className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-[1.4rem] border-[3px] border-choco bg-butter text-left shadow-[5px_5px_0_0_#553B32] transition-transform duration-300 hover:-translate-y-1"
        >
          <div className={`relative w-full ${image.aspect}`}>
            <ImageWithFallback
              src={image.src}
              srcSet={unsplashSrcSet(image.src, [400, 700, 1000])}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt={image.alt}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-choco/75 via-choco/0 to-transparent opacity-70 transition-opacity group-hover:opacity-95" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
              <span className="translate-y-1 font-display text-sm uppercase tracking-wide text-cream drop-shadow transition-transform group-hover:translate-y-0 sm:text-base">
                {categoryLabels[image.category] || 'Bite Club'}
              </span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-cream/80 bg-choco/40 text-cream opacity-0 transition-opacity group-hover:opacity-100">
                <Expand className="h-4 w-4" />
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
