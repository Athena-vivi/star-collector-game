import type React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// 通用加载状态组件
interface LoadingStateProps {
  isLoading: boolean
  error?: Error | null
  children: React.ReactNode
  fallback?: React.ReactNode
  errorFallback?: React.ReactNode
}

export function LoadingState({ isLoading, error, children, fallback, errorFallback }: LoadingStateProps) {
  if (error) {
    return errorFallback || <div className="text-red-600">Error: {error.message}</div>
  }

  if (isLoading) {
    return fallback || <Skeleton className="h-20 w-full" />
  }

  return <>{children}</>
}

// 目标设定骨架屏
export function GoalRefiningSkeleton() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <Skeleton className="h-8 w-48 mx-auto mb-2" />
        <Skeleton className="h-4 w-64 mx-auto" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <Skeleton className="h-4 w-80 mx-auto mb-2" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
      </CardContent>
    </Card>
  )
}

// 仪表板骨架屏
export function DashboardSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Goals Overview Skeleton */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <Card key={i} className="border-2 border-slate-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-3" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Skeleton */}
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardContent className="p-6 text-center">
              <Skeleton className="h-8 w-8 mx-auto mb-2 rounded-full" />
              <Skeleton className="h-6 w-32 mx-auto mb-2" />
              <Skeleton className="h-4 w-48 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// 决策分析骨架屏
export function DecisionAnalysisSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <Skeleton className="h-8 w-48 mx-auto mb-2" />
          <Skeleton className="h-6 w-64 mx-auto" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto mb-4"></div>
            <Skeleton className="h-4 w-80 mx-auto mb-2" />
            <Skeleton className="h-4 w-72 mx-auto" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 日常指南骨架屏
export function DailyCompassSkeleton() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <div className="flex justify-center gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-18" />
              </div>
            </div>
            <Card className="bg-slate-50">
              <CardContent className="pt-4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
