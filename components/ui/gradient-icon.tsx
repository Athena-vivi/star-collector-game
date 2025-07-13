import React from 'react'
import { cn } from '@/lib/utils'

interface GradientIconProps {
  icon: React.ReactNode
  className?: string
  gradient?: 'blue' | 'purple' | 'cyan' | 'indigo' | 'rainbow'
  size?: 'sm' | 'md' | 'lg'
}

const gradientClasses = {
  blue: 'bg-gradient-to-r from-blue-400 to-cyan-400',
  purple: 'bg-gradient-to-r from-purple-400 to-pink-400',
  cyan: 'bg-gradient-to-r from-cyan-400 to-blue-400',
  indigo: 'bg-gradient-to-r from-indigo-400 to-purple-400',
  rainbow: 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
}

export function GradientIcon({ 
  icon, 
  className, 
  gradient = 'indigo',
  size = 'md' 
}: GradientIconProps) {
  return (
    <div className={cn(
      'text-transparent bg-clip-text',
      gradientClasses[gradient],
      sizeClasses[size],
      className
    )}>
      {icon}
    </div>
  )
}

export function AnimatedGradientIcon({ 
  icon, 
  className, 
  gradient = 'indigo',
  size = 'md' 
}: GradientIconProps) {
  return (
    <div className={cn(
      'text-transparent bg-clip-text animate-pulse',
      gradientClasses[gradient],
      sizeClasses[size],
      className
    )}>
      {icon}
    </div>
  )
}

export function GlowingGradientIcon({ 
  icon, 
  className, 
  gradient = 'indigo',
  size = 'md' 
}: GradientIconProps) {
  return (
    <div className={cn(
      'text-transparent bg-clip-text drop-shadow-lg',
      gradientClasses[gradient],
      sizeClasses[size],
      'filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]',
      className
    )}>
      {icon}
    </div>
  )
} 