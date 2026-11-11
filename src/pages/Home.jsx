
import Hero from '../components/home/Hero'
import MenuPreview from '../components/home/MenuPreview'
import SignatureDishes from '../components/home/SignatureDishes'
import ReviewsPreview from '../components/home/ReviewsPreview'
import GalleryPreview from '../components/home/GalleryPreview'
import FinalCTA from '../components/home/FinalCTA'
import Marquee from '../components/common/Marquee'

const strip = [
  'FRESH INGREDIENTS',
  'BIG FLAVOURS',
  'GOOD MOODS ONLY',
  'MADE FROM SCRATCH',
  'OPEN LATE',
]

export default function Home() {
  return (
    <>
    
      <Hero />
      <Marquee items={strip} tone="choco" />
      <MenuPreview />
      <SignatureDishes />
      <ReviewsPreview />
      <GalleryPreview />
      <FinalCTA />
    </>
  )
}
