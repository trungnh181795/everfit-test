'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeaderProps {
  userName?: string
}

const navLinks = [
  { href: '/calendar', label: 'Calendar' },
  { href: '/exercises', label: 'Exercises' },
  { href: '/sessions', label: 'Workout Sessions' },
]

const Header = ({ userName = 'User' }: HeaderProps) => {
  const pathname = usePathname()

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex h-[63px] items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            Everfit
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  'hover:text-primary',
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-gray-600'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">
              {userName}
            </span>
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={16} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
