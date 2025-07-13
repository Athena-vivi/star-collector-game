"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <Card className="bg-slate-800/80 border-slate-600/50 shadow-2xl max-w-2xl w-full mx-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white text-3xl">
              <Play className="h-7 w-7 text-purple-400" />
              Watch Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="w-full aspect-video bg-slate-700 rounded-lg flex items-center justify-center">
              {/* 可替换为真实视频 */}
              <span className="text-slate-400 text-lg">Demo Video Placeholder</span>
            </div>
            <p className="text-slate-300 text-lg text-center">
              See how Star-Collector helps you set goals, track progress, and grow every day with AI-powered guidance.
            </p>
            <div className="flex justify-center">
              <Link href="/">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 