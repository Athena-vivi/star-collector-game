import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <Badge
            variant="outline"
            className="mb-8 px-4 py-2 text-sm font-medium border-slate-200 text-slate-600 bg-white/50 backdrop-blur-sm"
          >
            AI-Powered Personal Growth Platform
          </Badge>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-slate-900 mb-8 leading-[1.1] tracking-tight">
            Your Personal
            <br />
            <span className="font-medium text-slate-700">Growth Architect</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-slate-600 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
            Transform aspirations into achievements through AI-guided goal setting, daily reflection, and intelligent
            decision support.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white text-lg px-10 py-4 h-auto font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Begin Your Journey
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="ghost"
                className="text-lg px-10 py-4 h-auto font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-300"
              >
                <Play className="mr-3 h-5 w-5" />
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 text-slate-500 mb-20">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-white shadow-sm"
                  />
                ))}
              </div>
              <span className="text-sm font-medium">Trusted by 10,000+ professionals</span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 text-sm font-medium">4.9 out of 5</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-100/50 to-slate-200/50 rounded-3xl blur-3xl transform -rotate-1" />
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200/50 p-12">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Goal Setting Preview */}
                <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Star className="h-4 w-4 text-slate-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900">Goal Architecture</h3>
                  </div>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    "I want to advance my career and improve work-life balance..."
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <div className="text-xs font-medium text-slate-500 mb-2">AI-Structured Goal:</div>
                    <div className="text-sm text-slate-700 leading-relaxed">
                      Complete leadership certification by Q2, delegate 30% of tasks, establish 6pm work boundary
                    </div>
                  </div>
                </div>

                {/* Daily Compass Preview */}
                <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-slate-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900">Daily Reflection</h3>
                  </div>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    "How did today's leadership meeting align with your growth goals?"
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <div className="text-xs font-medium text-slate-500 mb-2">Insight Score: 8.5/10</div>
                    <div className="text-sm text-slate-700 leading-relaxed">
                      "Successfully facilitated team discussion. Felt confident in decision-making."
                    </div>
                  </div>
                </div>

                {/* Decision Analysis Preview */}
                <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-slate-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900">Decision Intelligence</h3>
                  </div>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    "Should I accept the senior management position?"
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <div className="text-xs font-medium text-slate-500 mb-2">Multi-perspective Analysis:</div>
                    <div className="text-sm text-slate-700">Strategic • Intuitive • Risk-aware</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
