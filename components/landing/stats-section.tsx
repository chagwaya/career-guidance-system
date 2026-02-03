const stats = [
  { value: '15+', label: 'University Courses' },
  { value: '14+', label: 'Partner Universities' },
  { value: '12', label: 'Assessment Questions' },
  { value: '6', label: 'Personality Types' },
]

export function StatsSection() {
  return (
    <section className="bg-primary px-4 py-16">
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
