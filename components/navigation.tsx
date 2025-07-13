'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  Telescope, 
  MessageSquare, 
  Palette, 
  User, 
  Menu, 
  X,
  BookOpen
} from 'lucide-react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: 'AI Q&A', href: '/ask', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'Wallpaper Studio', href: '/studio', icon: <Palette className="w-4 h-4" /> },
    { name: 'Account', href: '/account', icon: <User className="w-4 h-4" /> },
    { name: 'Blog', href: '/blog', icon: <BookOpen className="w-4 h-4" /> },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
          <nav className="bg-black/20 backdrop-blur-sm border-b border-indigo-500/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 rounded-lg flex items-center justify-center shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
              <Telescope className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Star Collector</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-indigo-500/30">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 