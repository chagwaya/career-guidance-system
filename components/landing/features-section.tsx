import { Brain, Target, GraduationCap, Users, BarChart3, Shield } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: Brain,
    title: 'Personality Assessment',
    description:
      'Comprehensive assessment based on the Holland Code (RIASEC) model to identify your personality type and work preferences.',
  },
  {
    icon: Target,
    title: 'Interest Mapping',
    description:
      'Discover your true interests through carefully designed questions that reveal what activities and subjects motivate you.',
  },
  {
    icon: BarChart3,
    title: 'Strength Analysis',
    description:
      'Identify your unique strengths and abilities to understand which academic and career paths suit you best.',
  },
  {
    icon: GraduationCap,
    title: 'Course Matching',
    description:
      'Get personalized recommendations for university courses available in Kenyan institutions based on your profile.',
  },
  {
    icon: Users,
    title: 'Counselor Support',
    description:
      'Connect with career counselors who can provide additional guidance and answer your questions.',
  },
  {
    icon: Shield,
    title: 'KCSE Integration',
    description:
      'Factor in your KCSE subject performance to provide realistic course recommendations based on admission requirements.',
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
              <Card key={feature.title} className="border-border bg-card transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
