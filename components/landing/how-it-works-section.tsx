import { UserPlus, ClipboardCheck, Lightbulb, MessageSquare } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: UserPlus,
    title: 'Create Your Profile',
    description:
      'Register and enter your basic information, school details, and KCSE subject grades to get started.',
  },
  {
    step: '02',
    icon: ClipboardCheck,
    title: 'Complete Assessment',
    description:
      'Answer questions about your personality, interests, and strengths. The assessment takes about 15-20 minutes.',
  },
  {
    step: '03',
    icon: Lightbulb,
    title: 'Get Recommendations',
    description:
      'Receive personalized course recommendations matched to your profile with detailed information about each option.',
  },
  {
    step: '04',
    icon: MessageSquare,
    title: 'Consult a Counselor',
    description:
      'Connect with career counselors for additional guidance and support in making your final decision.',
  },
]

export function HowItWorksSection() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">How It Works</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Four simple steps to discover your ideal university course and career path
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-border md:left-1/2 md:block md:-translate-x-1/2" />

          <div className="space-y-8 md:space-y-12">
            {steps.map((item, index) => {
              const Icon = item.icon
              const isEven = index % 2 === 0
              return (
                <div
                  key={item.step}
                  className={`relative flex items-center gap-6 md:gap-12 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div
                      className={`rounded-2xl border border-border bg-card p-6 shadow-sm ${
                        isEven ? 'md:mr-6' : 'md:ml-6'
                      }`}
                    >
                      <div className="mb-3 text-sm font-bold text-primary">Step {item.step}</div>
                      <h3 className="mb-2 text-xl font-semibold text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary shadow-lg md:absolute md:left-1/2 md:-translate-x-1/2">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>

                  {/* Empty space for other side */}
                  <div className="hidden flex-1 md:block" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
