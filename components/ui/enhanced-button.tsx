import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 增强的按钮变体系统
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-neutral-900 text-white shadow-sm hover:bg-neutral-800 hover:shadow-md",
        primary: "bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md",
        secondary: "bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-200 hover:shadow-md",
        outline:
          "border border-neutral-300 bg-transparent text-neutral-700 shadow-sm hover:bg-neutral-50 hover:border-neutral-400",
        ghost: "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900",
        link: "text-primary-600 underline-offset-4 hover:underline hover:text-primary-700",
        destructive: "bg-semantic-error-DEFAULT text-white shadow-sm hover:bg-semantic-error-dark hover:shadow-md",
        success: "bg-semantic-success-DEFAULT text-white shadow-sm hover:bg-semantic-success-dark hover:shadow-md",
        gradient:
          "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg hover:from-primary-700 hover:to-primary-800 hover:shadow-xl",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4 py-2",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
      },
      loading: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      loading: false,
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, leftIcon, rightIcon, asChild = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
