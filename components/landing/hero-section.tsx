import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          Empowering Kenyan Students
        </div>

        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          Discover Your Perfect
          <span className="block text-primary">University Course</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
          A digital career guidance system designed specifically for Kenyan high school students.
          Find courses that align with your interests, strengths, and career goals.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/assessment">
            <Button size="lg" className="gap-2 px-8">
              Start Assessment
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/profile">
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              Create Profile
            </Button>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-secondary/60" />
              <div className="h-3 w-3 rounded-full bg-primary/60" />
            </div>
            <div className="grid gap-4 p-6 md:grid-cols-3">
              <div className="rounded-xl bg-primary/5 p-4">
                <div className="mb-2 text-sm font-medium text-primary">Personality Match</div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-4/5 rounded-full bg-primary" />
                </div>
                <div className="mt-2 text-xs text-muted-foreground">Investigative Type</div>
              </div>
              <div className="rounded-xl bg-secondary/10 p-4">
                <div className="mb-2 text-sm font-medium text-secondary">Top Course Match</div>
                <div className="text-lg font-semibold text-foreground">Computer Science</div>
                <div className="mt-1 text-xs text-muted-foreground">92% Match</div>
              </div>
              <div className="rounded-xl bg-accent p-4">
                <div className="mb-2 text-sm font-medium text-accent-foreground">Universities</div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>University of Nairobi</div>
                  <div>JKUAT</div>
                  <div>Strathmore University</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
