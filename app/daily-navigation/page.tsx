"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Compass, Sun, Moon, Heart, ArrowLeft, TrendingUp, MessageCircle } from "lucide-react"
import Link from "next/link"
import Header from "@/components/landing/header"
import Footer from "@/components/landing/footer"
import { useEffect } from "react"

export default function DailyNavigationPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-indigo-900/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 bg-slate-700/80 text-slate-100 border-slate-500/50">
              <Compass className="w-4 h-4 mr-2" />
              Daily Guidance & Reflection
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Daily{" "}
              <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Navigation
              </span>
            </h1>

            <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Start each day with AI-powered motivation and end with guided reflection. Build consistent habits that
              compound into extraordinary results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* 移除 /dashboard 相关按钮 */}
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

      {/* Morning & Evening Flow */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Your Daily Rhythm</h2>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto">
              Two powerful moments each day to align with your goals and reflect on your progress.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Morning */}
            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Sun className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Morning Compass</CardTitle>
                <p className="text-slate-200">Start your day with purpose and energy</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-slate-200">Personalized daily motivation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-slate-200">Today's focus areas from your goals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-slate-200">AI-generated encouragement</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-slate-200">Quick intention setting</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Evening */}
            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-purple-500/10 to-blue-500/10">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Moon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Evening Reflection</CardTitle>
                <p className="text-slate-200">End your day with gratitude and insights</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-slate-200">Mood tracking and emotional check-in</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-slate-200">Personalized reflection questions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-slate-200">Achievement celebration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-slate-200">Tomorrow's preparation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Smart Daily Features</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Adaptive Questions</h3>
                <p className="text-slate-200 leading-relaxed">
                  AI generates personalized reflection questions based on your goals, recent activities, and emotional
                  patterns.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Mood Intelligence</h3>
                <p className="text-slate-200 leading-relaxed">
                  Track your emotional journey and receive insights about patterns that affect your productivity and
                  well-being.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Progress Insights</h3>
                <p className="text-slate-200 leading-relaxed">
                  Get weekly summaries of your daily check-ins with actionable insights for continuous improvement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Questions */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Sample Reflection Questions</h2>
            <p className="text-xl text-slate-200">Our AI generates thoughtful questions tailored to your journey</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Sun className="h-5 w-5 text-yellow-400" />
                  Morning Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm italic text-slate-200">
                  "What's one small action you can take today toward your fitness goal?"
                </p>
                <p className="text-sm italic text-slate-200">"How are you feeling about your progress this week?"</p>
                <p className="text-sm italic text-slate-200">"What would make today feel successful for you?"</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Moon className="h-5 w-5 text-purple-400" />
                  Evening Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm italic text-slate-200">"What's one thing you're grateful for today?"</p>
                <p className="text-sm italic text-slate-200">"How did you grow as a person today?"</p>
                <p className="text-sm italic text-slate-200">"What challenge did you overcome, no matter how small?"</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 relative">
        <div className="absolute inset-0 bg-slate-900/60"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl font-bold text-white mb-6">Start Your Daily Practice</h2>
          <p className="text-xl text-slate-100 mb-8 max-w-2xl mx-auto">
            Build the habit that successful people swear by - daily reflection and intention setting.
          </p>
          {/* 移除 /dashboard 相关按钮 */}
        </div>
      </section>

      <Footer />
    </div>
  )
}
