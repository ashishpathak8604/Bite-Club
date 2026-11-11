const UNSPLASH_HOST = 'images.unsplash.com'

export function unsplashSrcSet(url, widths) {
  if (typeof url !== 'string' || !url.includes(UNSPLASH_HOST)) return undefined

  try {
    const base = new URL(url)
    const originalWidth = Number(base.searchParams.get('w')) || 900
    const list = widths?.length
      ? widths
      : [Math.round(originalWidth * 0.5), originalWidth, Math.round(originalWidth * 1.5)]

    return list
      .filter((width) => Number.isFinite(width) && width > 0)
      .map((width) => {
        const next = new URL(base.toString())
        next.searchParams.set('w', String(Math.round(width)))
        return `${next.toString()} ${Math.round(width)}w`
      })
      .join(', ')
  } catch {
    return undefined
  }
}

export function unsplashAtWidth(url, width) {
  if (typeof url !== 'string' || !url.includes(UNSPLASH_HOST)) return url

  try {
    const next = new URL(url)
    next.searchParams.set('w', String(Math.round(width)))
    return next.toString()
  } catch {
    return url
  }
}
