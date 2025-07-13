"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error Boundary caught an error:", error, errorInfo)
    this.setState({ errorInfo })

    // 发送错误报告到监控服务
    if (typeof window !== "undefined") {
      // 这里可以集成 Sentry 或其他错误监控服务
      console.error("Error details:", {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      })
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Card className="max-w-md mx-auto mt-8">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-red-900">Something went wrong</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-slate-600">
              We encountered an unexpected error. Our team has been notified and is working on a fix.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="text-left bg-slate-50 p-4 rounded-lg text-sm">
                <summary className="cursor-pointer font-medium">Error Details</summary>
                <pre className="mt-2 text-xs overflow-auto">{this.state.error.message}</pre>
              </details>
            )}
            <Button onClick={this.handleRetry} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}

// 简化的错误回退组件
export function ErrorFallback({ error, retry }: { error: Error; retry?: () => void }) {
  return (
    <div className="text-center py-8">
      <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-slate-900 mb-2">Oops! Something went wrong</h3>
      <p className="text-slate-600 mb-4">{error.message}</p>
      {retry && (
        <Button onClick={retry} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  )
}
