
import { ArrowRight, CakeSlice, Flame, HeartHandshake, Leaf } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading'
import ImageWithFallback from '../components/common/ImageWithFallback'
import { unsplashSrcSet } from '../utils/images'
import { PrimaryButton, SecondaryButton } from '../components/common/Button'
import { aboutImages } from '../data/siteData'
import {
  DoodleArrow,
  DoodleHeart,
  DoodleSparkle,
  DoodleSquiggle,
  DoodleStar,
} from '../components/common/DoodleElements'

const hoverLift =
  'transition-all duration-300 ease-out hover:-translate-y-1.5'

const values = [
  {
    icon: Flame,
    title: 'Cook it loud',
    text: 'Big flavours, confident seasoning and zero shyness. If a dish does not make us say something out loud, it does not make the menu.',
    color: 'bg-butter',
  },
  {
    icon: Leaf,
    title: 'Source it well',
    text: 'We build plates around what looks good that week. Fewer ingredients, better ingredients, treated with a little respect.',
    color: 'bg-pistachio',
  },
  {
    icon: HeartHandshake,
    title: 'Feed people like family',
    text: 'Warm welcomes, generous portions and staff who remember your order. Nobody leaves hungry or in a bad mood.',
    color: 'bg-cream',
  },
  {
    icon: CakeSlice,
    title: 'Never skip dessert',
    text: 'A house rule. The molten cake has its own fan club, and we are the founding members.',
    color: 'bg-coral',
  },
]

const story = [
  {
    number: '01',
    title: 'A tiny kitchen, a big idea',
    text: 'Bite Club started as a sketchbook full of doodles and a very strong opinion: neighbourhood food should be fun. Not fussy, not formal — just really good, served with personality.',
  },
  {
    number: '02',
    title: 'The menu grew up',
    text: 'What began as a handful of favourites became a full menu of comfort plates, wood-fired pizza, messy burgers and desserts worth planning around. Everything is made in-house, including the mess.',
  },
  {
    number: '03',
    title: 'The room got louder',
    text: 'We painted the walls, hung the lights, and filled the place with mismatched chairs and very good music. Now it is the kind of room where lunch turns into dinner without anyone noticing.',
  },
]

const team = [
  {
    name: 'Maya Kapoor',
    role: 'Head Chef',
    image: aboutImages.chef,
    line: 'Believes butter is a food group and seasoning is a love language.',
  },
  {
    name: 'Arlo D’Souza',
    role: 'Sous Chef',
    image: aboutImages.team,
    line: 'Runs the pass with a calm face and an unreasonable love of chilli.',
  },
  {
    name: 'Nina Fernandes',
    role: 'Pastry Lead',
    image: aboutImages.kitchen,
    line: 'Responsible for the molten cake. We owe her everything.',
  },
]

export default function About() {
  return (
    <>
      {/* INTRO SECTION */}
      <section className="relative overflow-hidden bg-cream py-16 sm:py-24">
        <DoodleStar
          className={`wiggle absolute right-[5%] top-[10%] hidden h-10 w-10 text-choco/40 lg:block ${hoverLift}`}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-block font-script text-2xl text-choco/60 transition-transform duration-300 hover:-translate-y-1">
              hello there
            </span>

            <h2 className="mt-2 text-balance text-4xl leading-[0.9] transition-transform duration-300 hover:-translate-y-1 sm:text-6xl">
              WE’RE BITE CLUB,
              <br />
              AND WE’RE <span className="font-script text-[0.7em] font-normal">hungry</span>
            </h2>

            <div className="mt-6 space-y-4 text-pretty text-base leading-relaxed text-choco/75">
              <p className="transition-transform duration-300 hover:translate-x-1">
                We are a small, loud, colour-loving kitchen in the middle of the Foodie
                District. Our menu is a mix of comfort food, wood-fired pizza, messy burgers
                and desserts that arrive with a warning.
              </p>

              <p className="transition-transform duration-300 hover:translate-x-1">
                Everything here is designed for sharing — the plates, the tables, the good
                moods. Come for a quick bite, stay for the third coffee, leave with a new
                favourite. That is the whole idea.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { value: '2026', label: 'imagined in' },
                { value: '28', label: 'menu dishes' },
                { value: '1', label: 'very good dog' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl border-2 border-choco bg-white/60 px-3 py-4 text-center ${hoverLift} hover:shadow-[4px_5px_0_0_#553B32]`}
                >
                  <p className="font-display text-3xl leading-none sm:text-4xl">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-choco/55">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="sticker-lg group overflow-hidden rounded-[2rem] transition-transform duration-500 ease-out hover:-translate-y-2 lg:rotate-2">
              <ImageWithFallback
                src={aboutImages.interior}
                srcSet={unsplashSrcSet(aboutImages.interior, [500, 800, 1100])}
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 560px"
                alt="Warm restaurant interior with wooden tables and soft lighting"
                loading="eager"
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:aspect-[5/6]"
              />
            </div>

            <div className="absolute -bottom-6 -left-4 hidden h-36 w-36 rotate-[-8deg] overflow-hidden rounded-[1.4rem] border-[3px] border-choco shadow-[5px_5px_0_0_#553B32] transition-transform duration-500 hover:-translate-y-2 hover:rotate-0 sm:block">
              <ImageWithFallback
                src={aboutImages.ingredients}
                srcSet={unsplashSrcSet(aboutImages.ingredients, [200, 300, 400])}
                sizes="144px"
                alt="Fresh salad ingredients"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

            <div className="absolute -right-3 top-6 rotate-6 rounded-full border-[3px] border-choco bg-butter px-4 py-2 font-display text-sm uppercase tracking-wide shadow-[4px_4px_0_0_#553B32] transition-transform duration-300 hover:-translate-y-2 hover:rotate-0">
              good moods only
            </div>

            <DoodleArrow className={`absolute -left-12 top-1/2 hidden h-16 w-24 -scale-x-100 text-choco/40 ${hoverLift} lg:block`} />
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="relative overflow-hidden border-y-[3px] border-choco bg-butter py-16 sm:py-24">
        <div
          className="halftone pointer-events-none absolute inset-0 opacity-[0.1]"
          aria-hidden="true"
        />

        <DoodleSparkle
          className={`absolute left-[5%] top-[12%] hidden h-6 w-6 text-choco/50 sm:block ${hoverLift}`}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="The Story So Far"
            title="FROM SKETCHBOOK"
            script="to table"
            description="Three chapters, one very messy sketchbook, and a kitchen that never really got quiet."
            align="center"
            className="mx-auto"
          />

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="lg:sticky lg:top-28">
              <div className="sticker group overflow-hidden rounded-[2rem] transition-transform duration-500 hover:-translate-y-2 lg:-rotate-1">
                <ImageWithFallback
                  src={aboutImages.kitchen}
                  srcSet={unsplashSrcSet(aboutImages.kitchen, [500, 800, 1100])}
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  alt="Hands preparing fresh ingredients in the kitchen"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-choco/50 transition-transform duration-300 hover:translate-x-2">
                <DoodleSquiggle className="h-3 w-12" />
                the pass, mid-service
              </div>
            </div>

            {/* Story cards - normal rendering, no ScrollReveal */}
            <div className="space-y-5">
              {story.map((chapter, index) => (
                <article
                  key={chapter.number}
                  className={`rounded-[1.7rem] border-[3px] border-choco bg-cream p-6 shadow-[5px_5px_0_0_#553B32] ${hoverLift} hover:shadow-[8px_9px_0_0_#553B32] sm:p-7 ${
                    index % 2 === 1 ? 'lg:translate-x-3' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-choco bg-orange font-display text-lg transition-transform duration-300 hover:rotate-12 hover:scale-110">
                      {chapter.number}
                    </span>

                    <div>
                      <h3 className="text-2xl leading-tight sm:text-3xl">
                        {chapter.title}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-choco/75 sm:text-base">
                        {chapter.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="relative overflow-hidden bg-coral py-16 sm:py-24">
        <div
          className="halftone pointer-events-none absolute inset-0 opacity-[0.1]"
          aria-hidden="true"
        />

        <DoodleHeart
          className={`wiggle absolute right-[6%] top-[10%] hidden h-12 w-12 text-choco/60 sm:block ${hoverLift}`}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Food Philosophy"
            title="FOUR RULES"
            script="we live by"
            description="No secret manifesto, just the things we keep coming back to when we build a plate or plan a menu."
          />

          {/* Values cards - normal rendering, no ScrollReveal */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon

              return (
                <article
                  key={value.title}
                  className={`rounded-[1.7rem] border-[3px] border-choco p-6 shadow-[5px_5px_0_0_#553B32] ${value.color} ${hoverLift} hover:shadow-[8px_9px_0_0_#553B32]`}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-choco bg-white transition-transform duration-300 hover:rotate-12 hover:scale-110">
                    <Icon className="h-6 w-6" strokeWidth={2.2} />
                  </span>

                  <h3 className="mt-4 text-2xl">{value.title}</h3>

                  <p className="mt-2 text-sm leading-relaxed text-choco/75">
                    {value.text}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* INGREDIENTS SECTION */}
      <section className="relative overflow-hidden bg-cream py-16 sm:py-24">
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <SectionHeading
              eyebrow="Fresh Ingredients"
              title="GOOD FOOD"
              script="starts earlier"
              description="Before the plates, there is a market list. We keep it short, seasonal and a little obsessive."
            />

            <ul className="mt-7 space-y-4">
              {[
                'Produce picked for flavour, not for shelf life.',
                'Dough proved slowly, pizza blistered fast.',
                'Sauces, dips and dressings made in-house daily.',
                'Vegetarian and vegan options that are not an afterthought.',
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 text-sm text-choco/80 transition-transform duration-300 hover:translate-x-2 sm:text-base"
                >
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-choco bg-pistachio">
                    <span className="h-1.5 w-1.5 rounded-full bg-choco" />
                  </span>
                  {line}
                </li>
              ))}
            </ul>

            <PrimaryButton to="/menu" icon={ArrowRight} className="mt-8">
              Taste the menu
            </PrimaryButton>
          </div>

          <div className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
            <div className="sticker-lg group overflow-hidden rounded-[2rem] transition-transform duration-500 hover:-translate-y-2 lg:rotate-1">
              <ImageWithFallback
                src={aboutImages.ingredients}
                srcSet={unsplashSrcSet(aboutImages.ingredients, [500, 800, 1100])}
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 560px"
                alt="Fresh vegetables and ingredients arranged on a table"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="absolute -bottom-4 -right-3 rotate-[-5deg] rounded-2xl rounded-bl-none border-[3px] border-choco bg-pistachio px-4 py-2 font-script text-lg shadow-[4px_4px_0_0_#553B32] transition-transform duration-300 hover:-translate-y-2 hover:rotate-0">
              picked this morning
            </div>

            <DoodleStar className={`absolute -left-6 top-8 h-10 w-10 text-choco/60 ${hoverLift}`} />
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="relative overflow-hidden border-y-[3px] border-choco bg-pistachio py-16 sm:py-24">
        <div
          className="halftone pointer-events-none absolute inset-0 opacity-[0.1]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="The People"
            title="THE HANDS"
            script="behind the plates"
            description="A small team with strong opinions about sauce, seasoning and the correct amount of cheese."
            align="center"
            className="mx-auto"
          />

          <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((person, i) => (
              <article
                key={person.name}
                className={`group overflow-hidden rounded-[1.7rem] border-[3px] border-choco bg-cream shadow-[5px_5px_0_0_#553B32] ${hoverLift} hover:shadow-[8px_9px_0_0_#553B32] ${
                  i === 1 ? 'lg:-translate-y-4 lg:hover:-translate-y-6' : ''
                }`}
              >
                <div className="overflow-hidden border-b-[3px] border-choco">
                  <ImageWithFallback
                    src={person.image}
                    srcSet={unsplashSrcSet(person.image, [300, 450, 600])}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    alt={`${person.name}, ${person.role}`}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-2xl">{person.name}</h3>
                    <DoodleStar className="h-5 w-5 text-choco/60 transition-transform duration-500 group-hover:rotate-45 group-hover:scale-125" />
                  </div>

                  <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.16em] text-choco/50">
                    {person.role}
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-choco/70">
                    {person.line}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RESTAURANT IMAGE SECTION */}
      <section className="relative overflow-hidden bg-cream py-16 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="group relative overflow-hidden rounded-[2.2rem] border-[3px] border-choco transition-transform duration-500 hover:-translate-y-2">
            <ImageWithFallback
              src={aboutImages.interior}
              srcSet={unsplashSrcSet(aboutImages.interior, [800, 1200, 1600])}
              sizes="100vw"
              alt="Dining room at Bite Club with warm lighting"
              className="h-[420px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[520px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-choco/90 via-choco/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <span className="font-script text-2xl text-butter">the room</span>

              <blockquote className="mt-2 max-w-3xl text-balance text-3xl leading-[0.95] text-cream sm:text-5xl">
                “Come for the food. Stay for the third coffee. Leave with a new favourite.”
              </blockquote>

              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
                The Bite Club house rule
              </p>
            </div>

            <div className="absolute right-5 top-5 rotate-6 rounded-full border-[3px] border-choco bg-butter px-4 py-2 font-display text-sm uppercase tracking-wide text-choco shadow-[4px_4px_0_0_#553B32] transition-transform duration-300 hover:-translate-y-2 hover:rotate-0">
              see you soon
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative overflow-hidden bg-orange py-14 sm:py-20">
        <div
          className="halftone pointer-events-none absolute inset-0 opacity-[0.12]"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center sm:px-6">
          <DoodleStar className="wiggle h-10 w-10 text-choco transition-transform duration-500 hover:rotate-45 hover:scale-125" />

          <h2 className="text-balance text-4xl leading-[0.9] transition-transform duration-300 hover:-translate-y-1 sm:text-6xl">
            HUNGRY YET? <span className="font-script text-[0.7em] font-normal">us too</span>
          </h2>

          <p className="max-w-xl text-sm text-choco/75 sm:text-base">
            Browse the full menu, or book a table and let us do the cooking. Either way,
            we will save you a good seat.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryButton to="/menu" size="lg" icon={ArrowRight} className="w-full sm:w-auto">
              Explore Menu
            </PrimaryButton>

            <SecondaryButton to="/reservation" size="lg" className="w-full sm:w-auto">
              Book a Table
            </SecondaryButton>
          </div>
        </div>
      </section>
    </>
  )
}
