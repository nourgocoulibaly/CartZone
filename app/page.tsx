import { HeroSection } from "@/components/hero-section"
import { BrandsTicker } from "@/components/brands-ticker"
import { CategoriesSection } from "@/components/categories-section"
import { FeaturedCarousel } from "@/components/featured-carousel"
import { PromotionsBanner } from "@/components/promotions-banner"
import { NewProductsSection } from "@/components/new-products-section"
import { CtaSection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <div className="bg-[#070b14]">
      <HeroSection />
      <BrandsTicker />
      <CategoriesSection />
      <FeaturedCarousel />
      <PromotionsBanner />
      <NewProductsSection />
      <CtaSection />
    </div>
  )
}
