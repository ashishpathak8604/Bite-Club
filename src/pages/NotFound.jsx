import { ArrowRight, Home as HomeIcon } from 'lucide-react'
import { PrimaryButton, SecondaryButton } from '../components/common/Button'
import {
  DoodleArrow,
  DoodlePizza,
  DoodleSparkle,
  DoodleStar,
  DoodleSwirl,
} from '../components/common/DoodleElements'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-orange px-4 pb-20 pt-32 text-center sm:px-6">
      <div className="halftone pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[42vw] leading-none text-choco/[0.08]"
      >
        404
      </span>

      <DoodleStar className="wiggle absolute left-[12%] top-[22%] hidden h-10 w-10 text-choco/70 sm:block" />
      <DoodleSparkle className="absolute right-[14%] top-[18%] hidden h-7 w-7 text-choco/60 sm:block" />
      <DoodleSwirl className="absolute bottom-[22%] left-[10%] hidden h-14 w-14 text-choco/40 sm:block" />
      <DoodleArrow className="absolute bottom-[30%] right-[10%] hidden h-16 w-24 -scale-x-100 text-choco/50 sm:block" />

      <div className="relative flex flex-col items-center">
        <DoodlePizza className="wiggle h-24 w-24 text-choco sm:h-32 sm:w-32" />
        <span className="mt-6 font-script text-2xl text-choco/70">well, this is awkward</span>
        <h1 className="mt-1 text-6xl leading-[0.85] sm:text-8xl">THIS PAGE</h1>
        <h1 className="text-outline text-6xl leading-[0.85] sm:text-8xl">IS OFF THE MENU</h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-choco/75 sm:text-base">
          The page you are looking for does not exist, moved, or was eaten. Let’s get you
          back to something delicious.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton to="/" icon={HomeIcon} iconPosition="left" size="lg">
            Back to Home
          </PrimaryButton>
          <SecondaryButton to="/menu" icon={ArrowRight} size="lg">
            Browse the Menu
          </SecondaryButton>
        </div>
      </div>
    </section>
  )
}
