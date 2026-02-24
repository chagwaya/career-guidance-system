import Image from 'next/image'
import { Brain, Target, GraduationCap, Users, BarChart3, Shield } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: Brain,
    title: 'Personality Assessment',
    description:
      'Comprehensive assessment based on the Holland Code (RIASEC) model to identify your personality type and work preferences.',
    bgImage: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&auto=format&fit=crop&q=80'
  },
  {
    icon: Target,
    title: 'Interest Mapping',
    description:
      'Discover your true interests through carefully designed questions that reveal what activities and subjects motivate you.',
    bgImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=80'
  },
  {
    icon: BarChart3,
    title: 'Strength Analysis',
    description:
      'Identify your unique strengths and abilities to understand which academic and career paths suit you best.',
    bgImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=80'
  },
  {
    icon: GraduationCap,
    title: 'Course Matching',
    description:
      'Get personalized recommendations for university courses available in Kenyan institutions based on your profile.',
    bgImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&auto=format&fit=crop&q=80'
  },
  {
    icon: Users,
    title: 'Counselor Support',
    description:
      'Connect with career counselors who can provide additional guidance and answer your questions.',
    bgImage: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&auto=format&fit=crop&q=80'
  },
  {
    icon: Shield,
    title: 'KCSE Integration',
    description:
      'Factor in your KCSE subject performance to provide realistic course recommendations based on admission requirements.',
    bgImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format&fit=crop&q=80'
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-muted/30 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Comprehensive Career Guidance
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Our system addresses the challenges Kenyan students face when selecting university courses
            by providing data-driven guidance tailored to individual needs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="border-border overflow-hidden transition-shadow hover:shadow-lg group">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={feature.bgImage}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
                    <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/90 backdrop-blur-sm">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
