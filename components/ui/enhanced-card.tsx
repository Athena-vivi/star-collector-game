import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

// 增强的卡片变体系统
const cardVariants = cva("rounded-xl border bg-white text-neutral-950 shadow-sm transition-all duration-250", {
  variants: {
    variant: {
      default: "border-neutral-200 hover:shadow-md",
      elevated: "border-neutral-200 shadow-lg hover:shadow-xl",
      outlined: "border-2 border-neutral-200 shadow-none hover:border-neutral-300",
      ghost: "border-transparent shadow-none hover:bg-neutral-50",
      gradient: "border-0 bg-gradient-to-br from-primary-50 to-primary-100 shadow-md hover:shadow-lg",
      success: "border-semantic-success-light bg-semantic-success-light/50",
      warning: "border-semantic-warning-light bg-semantic-warning-light/50",
      error: "border-semantic-error-light bg-semantic-error-light/50",
    },
    size: {
      sm: "p-4",
      default: "p-6",
      lg: "p-8",
      xl: "p-10",
    },
    interactive: {
      true: "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    interactive: false,
  },
})

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  asChild?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, interactive, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "div" : "div"
    return <Comp ref={ref} className={cn(cardVariants({ variant, size, interactive, className }))} {...props} />
  },
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight text-neutral-900", className)} {...props} />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-neutral-600 leading-relaxed", className)} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("pt-0", className)} {...props} />,
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center pt-4", className)} {...props} />,
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
