import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Sparkles } from "lucide-react"
import Link from "next/link"

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-slate-800/60 rounded-full backdrop-blur-sm">
              <Star className="h-12 w-12 text-white" />
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-100">
            Your transformation
            <br />
            starts today
          </h2>

          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of ambitious individuals who have already begun their journey to success with AI-powered
            personal growth. Your future self is waiting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {/* 移除 /dashboard 相关按钮 */}
            <Link href="/demo">
            <Button
              size="lg"
              variant="outline"
                className="border-slate-400 text-slate-100 hover:bg-slate-800/60 text-lg px-8 py-4 h-auto bg-transparent"
            >
              Watch Demo
            </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-300">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>

          {/* Trust indicators */}
        </div>
      </div>
    </section>
  )
}
