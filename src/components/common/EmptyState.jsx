import { DoodleBurst } from './DoodleElements'

export default function EmptyState({
  title = 'Nothing here yet',
  description = 'It looks a little quiet in this corner.',
  action,
  icon,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-[2rem] border-[3px] border-choco bg-white/60 px-6 py-16 text-center ${className}`}
    >
      <div className="relative mb-6">
        {icon || <DoodleBurst className="wiggle h-20 w-20 text-choco" />}
      </div>
      <h3 className="text-3xl">{title}</h3>
      <p className="mt-3 max-w-md text-choco/70">{description}</p>
      {action && <div className="mt-7">{action}</div>}
    </div>
  )
}
