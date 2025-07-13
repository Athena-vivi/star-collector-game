"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Star, Menu, X } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            }}
          >
            <div className="p-2 bg-slate-900 rounded-lg">
              <Star className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-slate-900">Star-Collector</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link href="#features" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
              Features
            </Link>
            <Link href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
              How it Works
            </Link>
            <Link href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
              Pricing
            </Link>
            <Link href="#faq" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
              FAQ
            </Link>
          </nav>

          {/* Desktop CTA */}
          {/* 移除 /dashboard 相关按钮 */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-medium">
              Sign In
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-sm">
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-slate-200/50 bg-white/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-6">
              <Link
                href="#features"
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                How it Works
              </Link>
              <Link
                href="#pricing"
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="flex flex-col space-y-3 pt-4 border-t border-slate-200">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-slate-600 hover:text-slate-900 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Button>
                <Button
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Start Free Trial
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
