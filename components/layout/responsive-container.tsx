import type * as React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  padding?: "none" | "sm" | "md" | "lg"
  children: React.ReactNode
}

const maxWidthClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
}

const paddingClasses = {
  none: "",
  sm: "px-4 sm:px-6",
  md: "px-4 sm:px-6 lg:px-8",
  lg: "px-4 sm:px-6 lg:px-8 xl:px-12",
}

export function ResponsiveContainer({
  maxWidth = "xl",
  padding = "md",
  className,
  children,
  ...props
}: ResponsiveContainerProps) {
  return (
    <div className={cn("mx-auto w-full", maxWidthClasses[maxWidth], paddingClasses[padding], className)} {...props}>
      {children}
    </div>
  )
}

// 响应式网格系统
interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: "sm" | "md" | "lg" | "xl"
  children: React.ReactNode
}

const gapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
}

export function ResponsiveGrid({
  cols = { default: 1, md: 2, lg: 3 },
  gap = "md",
  className,
  children,
  ...props
}: ResponsiveGridProps) {
  const gridClasses = [
    `grid-cols-${cols.default || 1}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={cn("grid", gridClasses, gapClasses[gap], className)} {...props}>
      {children}
    </div>
  )
}
