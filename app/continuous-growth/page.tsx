"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, ArrowLeft, Brain, Target, Calendar, Users, Zap, Award } from "lucide-react"
import Link from "next/link"
import Header from "@/components/landing/header"
import Footer from "@/components/landing/footer"
import { useEffect } from "react"

export default function ContinuousGrowthPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 bg-slate-700/80 text-slate-100 border-slate-500/50">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics & Insights
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Continuous{" "}
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Growth</span>
            </h1>

            <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Track your progress with AI-powered analytics, receive weekly insights, and get personalized
              recommendations to accelerate your growth journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg font-medium"
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Your Analytics
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

      {/* Analytics Features */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Powerful Growth Analytics</h2>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto">
              Get deep insights into your progress patterns and receive AI-powered recommendations for optimization.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Progress Tracking</h3>
                <p className="text-slate-200 leading-relaxed">
                  Visualize your goal completion rates, streak tracking, and milestone achievements with beautiful
                  charts and graphs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">AI Insights</h3>
                <p className="text-slate-200 leading-relaxed">
                  Receive weekly AI-generated reports that identify patterns, suggest optimizations, and predict future
                  success.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Goal Optimization</h3>
                <p className="text-slate-200 leading-relaxed">
                  Get personalized recommendations to adjust your goals, timelines, and strategies based on your
                  performance data.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Weekly Reports */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Weekly Growth Reports</h2>
            <p className="text-xl text-slate-200">AI-powered insights delivered every week</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Calendar className="h-5 w-5 text-purple-400" />
                  This Week's Highlights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-700/60 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="h-5 w-5 text-yellow-400" />
                    <span className="font-medium text-white">Achievement Unlocked</span>
                  </div>
                  <p className="text-slate-200 text-sm">
                    Completed 7-day meditation streak - your consistency is paying off!
                  </p>
                </div>
                <div className="bg-slate-700/60 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    <span className="font-medium text-white">Progress Trend</span>
                  </div>
                  <p className="text-slate-200 text-sm">
                    Your goal completion rate increased by 23% compared to last week.
                  </p>
                </div>
                <div className="bg-slate-700/60 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="h-5 w-5 text-blue-400" />
                    <span className="font-medium text-white">Energy Pattern</span>
                  </div>
                  <p className="text-slate-200 text-sm">
                    You're most productive on Tuesday mornings - consider scheduling important tasks then.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Brain className="h-5 w-5 text-purple-400" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-700/60 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="h-5 w-5 text-purple-400" />
                    <span className="font-medium text-white">Goal Adjustment</span>
                  </div>
                  <p className="text-slate-200 text-sm">
                    Consider breaking your "Learn Spanish" goal into smaller weekly vocabulary targets.
                  </p>
                </div>
                <div className="bg-slate-700/60 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="h-5 w-5 text-blue-400" />
                    <span className="font-medium text-white">Timing Optimization</span>
                  </div>
                  <p className="text-slate-200 text-sm">
                    Your reflection quality improves when you journal before 9 PM. Try setting a reminder.
                  </p>
                </div>
                <div className="bg-slate-700/60 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-5 w-5 text-green-400" />
                    <span className="font-medium text-white">Social Support</span>
                  </div>
                  <p className="text-slate-200 text-sm">
                    Consider sharing your fitness goal with a friend - accountability partners increase success by 65%.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Analytics Dashboard Preview */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Your Growth Dashboard</h2>
            <p className="text-xl text-slate-200">Comprehensive analytics at your fingertips</p>
          </div>

          <div className="bg-slate-800/80 border-slate-600/50 rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">87%</div>
                <div className="text-slate-200 text-sm">Goal Completion</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">23</div>
                <div className="text-slate-200 text-sm">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">8.2</div>
                <div className="text-slate-200 text-sm">Avg Mood</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">12</div>
                <div className="text-slate-200 text-sm">Milestones</div>
              </div>
            </div>

            <div className="bg-slate-700/60 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-slate-200 text-sm">Completed morning workout - Fitness Goal</span>
                  <span className="text-slate-400 text-xs ml-auto">2 hours ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-slate-200 text-sm">Finished daily Spanish lesson - Learning Goal</span>
                  <span className="text-slate-400 text-xs ml-auto">5 hours ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-slate-200 text-sm">Reflected on career progress - Professional Goal</span>
                  <span className="text-slate-400 text-xs ml-auto">1 day ago</span>
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
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Accelerate Your Growth?</h2>
          <p className="text-xl text-slate-100 mb-8 max-w-2xl mx-auto">
            Start tracking your progress today and unlock the power of AI-driven insights for continuous improvement.
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg font-medium"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              Start Tracking Progress
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
