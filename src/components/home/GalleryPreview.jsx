
import { ArrowRight, Camera } from 'lucide-react'
import { galleryData } from '../../data/galleryData'
import { unsplashSrcSet } from '../../utils/images'
import SectionHeading from '../common/SectionHeading'
import ScrollReveal from '../common/ScrollReveal'
import ImageWithFallback from '../common/ImageWithFallback'
import { PrimaryButton } from '../common/Button'
import {
  DoodleSparkle,
  DoodleStar,
  DoodleUnderline,
} from '../common/DoodleElements'

const pick = (id) => galleryData.find((image) => image.id === id)

const collage = [
  {
    image: pick('g2'),
    className: 'col-span-2 row-span-2 h-60 sm:h-80 lg:h-auto',
    label: 'The dining room',
    rotation: 'lg:-rotate-[1.5deg]',
    tape: 'left-1/2 -top-2.5 -translate-x-1/2 -rotate-3 bg-[#F5D58C]/65',
  },
  {
    image: pick('g1'),
    className: 'h-36 sm:h-48 lg:h-auto',
    label: 'Fresh out the oven',
    rotation: 'lg:rotate-[2deg]',
    tape: 'right-5 -top-2.5 rotate-[12deg] bg-[#EFA49A]/60',
  },
  {
    image: pick('g3'),
    className: 'h-36 sm:h-48 lg:h-auto',
    label: 'Good company',
    rotation: 'lg:-rotate-[2deg]',
    tape: '-left-2 top-1/2 -translate-y-1/2 -rotate-90 bg-[#B5CF9B]/65',
  },
  {
    image: pick('g10'),
    className: 'h-36 sm:h-48 lg:h-auto',
    label: 'Sweet things',
    rotation: 'lg:rotate-[1.5deg]',
    tape: 'left-5 -top-2.5 -rotate-[14deg] bg-[#EFA49A]/60',
  },
  {
    image: pick('g5'),
    className: 'h-36 sm:h-48 lg:h-auto',
    label: 'Behind the pass',
    rotation: 'lg:-rotate-[1.5deg]',
    tape: 'right-6 -bottom-1.5 rotate-[18deg] bg-[#F5D58C]/65',
  },
]

export default function GalleryPreview() {
  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-24">

      <DoodleStar className="wiggle absolute left-[4%] top-[12%] hidden h-10 w-10 text-choco/50 lg:block" />
      <DoodleSparkle className="absolute right-[6%] top-[20%] hidden h-6 w-6 text-choco/40 lg:block" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

        {/* Section heading */}
        <div className="mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            title="A LITTLE"
            script="look around"
            description="Warm lights, loud plates and the kind of mess that happens when good food meets good people."
          />

          <PrimaryButton
            to="/gallery"
            icon={ArrowRight}
            className="shrink-0 self-start md:self-auto"
          >
            View Full Gallery
          </PrimaryButton>
        </div>

        {/* Polaroid scrapbook collage */}
        <ScrollReveal
          className="grid grid-cols-2 gap-5 sm:gap-7 lg:auto-rows-[210px] lg:grid-cols-4"
          delay={0.08}
        >
          {collage.map((item, i) => (
            <figure
              key={item.image.id}
              className={`
                group relative flex flex-col
                overflow-visible
                border-[2.5px] border-choco
                bg-[#FFF8E9]
                p-2 pb-1.5
                shadow-[4px_5px_0_0_#553B32]
                transition-all duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:z-30
                hover:-translate-y-3
                hover:rotate-0
                hover:scale-[1.035]
                hover:shadow-[8px_13px_0_0_#553B32]
                ${item.className}
                ${item.rotation}
              `}
              style={{
                borderRadius: [
                  '1.1rem 1.4rem 1rem 1.3rem',
                  '1.3rem 1rem 1.4rem 1rem',
                  '1rem 1.4rem 1.1rem 1.3rem',
                  '1.4rem 1rem 1.3rem 1rem',
                  '1rem 1.3rem 1rem 1.4rem',
                ][i],
              }}
            >

              {/* Translucent washi tape */}
              <span
                aria-hidden="true"
                className={`
                  pointer-events-none absolute z-20
                  h-7 w-16 sm:h-7 sm:w-16
                  rounded-[3px]
                  border border-white/35
                  opacity-100
                  shadow-[0_2px_5px_rgba(85,59,50,0.12)]
                  backdrop-blur-[20px]
                  ${item.tape}
                `}
              />

              {/* Image */}
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-[0.7rem] bg-butter">

                <ImageWithFallback
                  src={item.image.src}
                  srcSet={unsplashSrcSet(item.image.src, [400, 700, 1000])}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  alt={item.image.alt}
                  className="
                    h-full w-full object-cover
                    transition-transform duration-700
                    ease-out
                    group-hover:scale-110
                  "
                />

                <div className="
                  pointer-events-none absolute inset-0
                  bg-[#F5D9A5]/[0.04]
                  transition-colors duration-500
                  group-hover:bg-transparent
                " />

                {/* Camera icon */}
                <span className="
                  absolute right-3 top-3
                  grid h-8 w-8 place-items-center
                  rounded-full border-2 border-choco
                  bg-cream/90 text-choco
                  opacity-0 translate-y-2
                  transition-all duration-300
                  group-hover:translate-y-0
                  group-hover:opacity-100
                ">
                  <Camera className="h-4 w-4" />
                </span>
              </div>

              {/* Compact handwritten caption */}
              <figcaption className="
                flex h-8 shrink-0 items-center
                justify-center px-2
                text-center
              ">
                <span className="
                  font-script text-sm
                  text-choco/85
                  transition-all duration-300
                  group-hover:scale-105
                  sm:text-base
                ">
                  {item.label}
                </span>
              </figcaption>

            </figure>
          ))}
        </ScrollReveal>

        {/* Bottom decoration */}
        <div className="mt-10 flex items-center justify-center gap-2 text-center">
          <DoodleUnderline className="hidden h-3 w-16 text-choco/40 sm:block" />

          <p className="font-script text-lg text-choco/80 sm:text-xl">
            yes, the walls are really that colour
          </p>

          <DoodleStar className="h-5 w-5 text-choco" />
        </div>

      </div>
    </section>
  )
}
