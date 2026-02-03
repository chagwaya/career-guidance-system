import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { HowItWorksSection } from '@/components/landing/how-it-works-section'
import { StatsSection } from '@/components/landing/stats-section'
import { Footer } from '@/components/landing/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsSection />
      </main>
      <Footer />
    </div>
  )
}
