import { DoodlePizza } from './DoodleElements'

export default function LoadingState({ message = 'Whipping something up…' }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-5 py-20 text-center">
      <div className="relative">
        <DoodlePizza className="spin-slow h-16 w-16 text-choco" />
      </div>
      <p className="font-script text-2xl text-choco">{message}</p>
    </div>
  )
}
