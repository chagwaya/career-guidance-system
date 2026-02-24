import Image from 'next/image'

const stats = [
  { value: '15+', label: 'University Courses' },
  { value: '14+', label: 'Partner Universities' },
  { value: '12', label: 'Assessment Questions' },
  { value: '6', label: 'Personality Types' },
]

export function StatsSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80"
          alt="University campus"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-primary/90" />
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-primary-foreground md:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-primary-foreground/80 md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
