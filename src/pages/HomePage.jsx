import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { HeroSlider } from '../sections/home/HeroSlider'
import { Perks } from '../sections/home/Perks'
import { TileGrid } from '../sections/home/TileGrid'
import { Recommended } from '../sections/home/Recommended'
import { MoodCircles } from '../sections/home/MoodCircles'
import { FabricFeel } from '../sections/home/FabricFeel'
import { HomeToOut } from '../sections/home/HomeToOut'
import { ShopByPrice } from '../sections/home/ShopByPrice'
import { TeeTrio } from '../sections/home/TeeTrio'
import { Testimonials } from '../sections/home/Testimonials'
import { Offers } from '../sections/home/Offers'

export function HomePage() {
  useDocumentTitle()
  return (
    <>
      <HeroSlider />
      <Perks />
      <TileGrid />
      <Recommended />
      <MoodCircles />
      <FabricFeel />
      <HomeToOut />
      <ShopByPrice />
      <TeeTrio />
      <Testimonials />
      <Offers />
    </>
  )
}
