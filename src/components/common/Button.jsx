import { Link } from 'react-router-dom'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold tracking-wide transition-[transform,box-shadow,background-color] duration-200 border-[3px] border-choco select-none disabled:opacity-50 disabled:pointer-events-none'

const variants = {
  primary: 'bg-orange text-choco shadow-[5px_5px_0_0_#553B32] hover:shadow-[7px_7px_0_0_#553B32] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[2px_2px_0_0_#553B32] active:translate-x-0.5 active:translate-y-0.5',
  secondary:
    'bg-cream text-choco shadow-[5px_5px_0_0_#553B32] hover:shadow-[7px_7px_0_0_#553B32] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[2px_2px_0_0_#553B32] active:translate-x-0.5 active:translate-y-0.5',
  dark: 'bg-choco text-cream shadow-[5px_5px_0_0_#F7A36C] hover:shadow-[7px_7px_0_0_#F7A36C] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[2px_2px_0_0_#F7A36C] active:translate-x-0.5 active:translate-y-0.5',
  butter:
    'bg-butter text-choco shadow-[5px_5px_0_0_#553B32] hover:shadow-[7px_7px_0_0_#553B32] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[2px_2px_0_0_#553B32] active:translate-x-0.5 active:translate-y-0.5',
  ghost: 'bg-transparent border-transparent shadow-none hover:bg-white/40',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" strokeWidth={2.5} />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer" {...props}>
        {content}
      </a>
    )
  }
  return (
    <button className={classes} {...props}>
      {content}
    </button>
  )
}

export function PrimaryButton(props) {
  return <Button variant="primary" {...props} />
}

export function SecondaryButton(props) {
  return <Button variant="secondary" {...props} />
}

export function DarkButton(props) {
  return <Button variant="dark" {...props} />
}

export function ButterButton(props) {
  return <Button variant="butter" {...props} />
}

export default Button
