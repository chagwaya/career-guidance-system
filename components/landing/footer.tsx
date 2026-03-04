import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">CareerPath Kenya</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <Link href="/profile" className="hover:text-foreground">
              My Profile
            </Link>
            <Link href="/assessment" className="hover:text-foreground">
              Assessment
            </Link>
            <Link href="/recommendations" className="hover:text-foreground">
              Career Paths
            </Link>
            <Link href="/counselor" className="hover:text-foreground">
              Counselor
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>Digital Career Guidance System for Kenyan High School Students</p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} CareerPath Kenya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
