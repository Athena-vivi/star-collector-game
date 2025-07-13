"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Target, ArrowLeft, CheckCircle, Lightbulb, Brain, Zap } from "lucide-react"
import Link from "next/link"
import Header from "@/components/landing/header"
import Footer from "@/components/landing/footer"
import { useEffect } from "react"

export default function SetStarsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 bg-slate-700/80 text-slate-100 border-slate-500/50">
              <Star className="w-4 h-4 mr-2" />
              Goal Setting with AI
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Set Your{" "}
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Stars</span>
            </h1>

            <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform vague aspirations into SMART goals with our AI coach. Get personalized guidance, clear
              timelines, and actionable steps to achieve your dreams.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 shadow-lg font-medium"
                >
                  <Star className="mr-2 h-5 w-5" />
                  Start Setting Goals
                </Button>
              </Link>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-slate-800/80 border-slate-400 text-slate-100 hover:bg-slate-700/80 hover:text-white hover:border-slate-300 font-medium"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How AI Goal Setting Works</h2>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto">
              Our AI coach uses proven frameworks to help you create achievable, meaningful goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Share Your Vision</h3>
                <p className="text-slate-200 leading-relaxed">
                  Tell our AI what you want to achieve. Don't worry about being specific - our coach will help you
                  refine your ideas.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">AI Refinement</h3>
                <p className="text-slate-200 leading-relaxed">
                  Our AI asks clarifying questions and applies the SMART framework to create specific, measurable,
                  achievable goals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Get Your Plan</h3>
                <p className="text-slate-200 leading-relaxed">
                  Receive a detailed action plan with milestones, deadlines, and personalized strategies for success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Powerful Goal Setting Features</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-600/20 rounded-lg border border-purple-400/30">
                  <Lightbulb className="h-6 w-6 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">SMART Goal Framework</h3>
                  <p className="text-slate-200 leading-relaxed">
                    Automatically converts vague ideas into Specific, Measurable, Achievable, Relevant, and Time-bound
                    goals.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-600/20 rounded-lg border border-blue-400/30">
                  <Brain className="h-6 w-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Personalized Coaching</h3>
                  <p className="text-slate-200 leading-relaxed">
                    AI asks the right questions to understand your motivation, constraints, and preferred working style.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-pink-600/20 rounded-lg border border-pink-400/30">
                  <Zap className="h-6 w-6 text-pink-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Milestone Planning</h3>
                  <p className="text-slate-200 leading-relaxed">
                    Break down big goals into manageable milestones with clear deadlines and success metrics.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/80 border-slate-600/50 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-white">Example Goal Transformation</h3>
              <div className="space-y-4">
                <div className="bg-slate-700/60 rounded-lg p-4 border-l-4 border-slate-500">
                  <p className="text-sm text-slate-300 mb-1">Before (Vague):</p>
                  <p className="font-medium text-slate-100">"I want to get healthier"</p>
                </div>
                <div className="bg-slate-700/60 rounded-lg p-4 border-l-4 border-purple-400">
                  <p className="text-sm text-purple-300 mb-1">After (SMART Goal):</p>
                  <p className="font-medium text-slate-100 leading-relaxed">
                    "Run 3 times per week for 30 minutes, meal prep healthy lunches every Sunday, and sleep by 10:30 PM
                    on weekdays to lose 10 pounds in 3 months"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600/30 to-pink-600/30 relative">
        <div className="absolute inset-0 bg-slate-900/60"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Set Your First Star?</h2>
          <p className="text-xl text-slate-100 mb-8 max-w-2xl mx-auto">
            Join thousands who have transformed their dreams into achievable goals with AI guidance.
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 shadow-lg font-medium"
            >
              <Star className="mr-2 h-5 w-5" />
              Start Your Goal Journey
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
