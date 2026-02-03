'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  GraduationCap,
  Menu,
  X,
  Home,
  User,
  ClipboardList,
  Compass,
  MessageCircle,
  LayoutDashboard,
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/profile', label: 'My Profile', icon: User },
  { href: '/assessment', label: 'Assessment', icon: ClipboardList },
  { href: '/recommendations', label: 'Career Paths', icon: Compass },
  { href: '/counselor', label: 'Counselor', icon: MessageCircle },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">CareerPath Kenya</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/admin">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <LayoutDashboard className="h-4 w-4" />
              Admin
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card md:hidden">
          <nav className="flex flex-col p-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center gap-3 rounded-lg border border-border px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <LayoutDashboard className="h-5 w-5" />
              Admin Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
