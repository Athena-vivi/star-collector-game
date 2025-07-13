"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, CheckCircle, Info } from "lucide-react"

// 输入框变体
const inputVariants = cva(
  "flex w-full rounded-lg border bg-white px-3 py-2 text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-neutral-300 focus-visible:ring-primary-500 focus-visible:border-primary-500",
        error: "border-semantic-error-DEFAULT focus-visible:ring-semantic-error-DEFAULT",
        success: "border-semantic-success-DEFAULT focus-visible:ring-semantic-success-DEFAULT",
        warning: "border-semantic-warning-DEFAULT focus-visible:ring-semantic-warning-DEFAULT",
      },
      size: {
        sm: "h-8 px-2 text-xs",
        default: "h-10 px-3",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  label?: string
  description?: string
  error?: string
  success?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, label, description, error, success, leftIcon, rightIcon, ...props }, ref) => {
    const inputVariant = error ? "error" : success ? "success" : variant

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-neutral-700">
            {label}
            {props.required && <span className="text-semantic-error-DEFAULT ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">{leftIcon}</div>}

          <input
            className={cn(
              inputVariants({ variant: inputVariant, size }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className,
            )}
            ref={ref}
            {...props}
          />

          {rightIcon && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">{rightIcon}</div>}
        </div>

        {description && !error && !success && (
          <div className="flex items-start gap-2 text-xs text-neutral-600">
            <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <span>{description}</span>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 text-xs text-semantic-error-DEFAULT">
            <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-start gap-2 text-xs text-semantic-success-DEFAULT">
            <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}
      </div>
    )
  },
)
Input.displayName = "Input"

// 增强的文本域组件
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {
  label?: string
  description?: string
  error?: string
  success?: string
  resize?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, label, description, error, success, resize = true, ...props }, ref) => {
    const inputVariant = error ? "error" : success ? "success" : variant

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-neutral-700">
            {label}
            {props.required && <span className="text-semantic-error-DEFAULT ml-1">*</span>}
          </label>
        )}

        <textarea
          className={cn(
            inputVariants({ variant: inputVariant, size }),
            "min-h-[80px]",
            !resize && "resize-none",
            className,
          )}
          ref={ref}
          {...props}
        />

        {description && !error && !success && (
          <div className="flex items-start gap-2 text-xs text-neutral-600">
            <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <span>{description}</span>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 text-xs text-semantic-error-DEFAULT">
            <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-start gap-2 text-xs text-semantic-success-DEFAULT">
            <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}
      </div>
    )
  },
)
Textarea.displayName = "Textarea"

export { Input, Textarea, inputVariants }
