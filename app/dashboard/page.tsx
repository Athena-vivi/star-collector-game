"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Plus, Target, Calendar, TrendingUp, Brain, Compass, BarChart3, ArrowLeft } from "lucide-react"
import StarSetter from "@/components/star-setter"
import DailyCompass from "@/components/daily-compass"
import DecisionObservatory from "@/components/decision-observatory"
import MemoryInsights from "@/components/memory-insights"
import type { Goal, JournalEntry } from "@/lib/ai-services"
import Link from "next/link"
import { renderGoalCard } from "@/components/star-setter"

// 在文件顶部添加格式化函数
const formatDatePretty = (date: string | Date) => {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date + (date.length === 10 ? 'T00:00:00' : '')) : date;
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "goals" | "compass" | "decisions" | "insights">("overview")
  const [goals, setGoals] = useState<Goal[]>([])
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)

  const handleGoalCreated = (goal: Goal) => {
    setGoals((prevGoals) => {
      const idx = prevGoals.findIndex(g => g.title === goal.title)
      if (idx !== -1) {
        if (window.confirm("A goal with the same title already exists. Overwrite it?")) {
          const newGoals = [...prevGoals]
          newGoals[idx] = goal
          return newGoals
        } else {
          return prevGoals
        }
      }
      return [...prevGoals, goal]
    })
    setActiveTab("dashboard")
  }

  const handleJournalEntry = (entry: JournalEntry) => {
    setJournalEntries([...journalEntries, entry])
  }

  const handleDeleteGoal = (id: string) => {
    setGoals(goals => goals.filter(g => g.id !== id))
  }

  const handleEditGoal = (goal: Goal) => {
    setActiveTab("goals")
    setEditingGoal(goal)
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "goals", label: "Set Goals", icon: Star },
    { id: "compass", label: "Daily Compass", icon: Compass },
    { id: "decisions", label: "Decisions", icon: Brain },
    { id: "insights", label: "Insights", icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-yellow-900/10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>

      {/* Top Navigation Bar */}
      <div className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-lg shadow-lg">
                <Star className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Star-Collector</span>
            </Link>

            {/* Navigation Actions */}
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent border-slate-600 text-slate-200 hover:text-white hover:bg-slate-800/50 hover:border-slate-500"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <Button
                variant="default"
                size="sm"
                className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white border-0"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        {/* Header - 居中显示 */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Your Growth Dashboard</h1>
          <p className="text-xl text-slate-200">Track your progress and achieve your goals with AI guidance</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-slate-800/50 p-2 rounded-lg border border-slate-600/50 justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-amber-600 text-white hover:bg-amber-700"
                    : "text-slate-200 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </Button>
            )
          })}
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-300 text-sm">Active Goals</p>
                      <p className="text-2xl font-bold text-white">{goals.length}</p>
                    </div>
                    <Target className="h-8 w-8 text-amber-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-300 text-sm">Journal Entries</p>
                      <p className="text-2xl font-bold text-white">{journalEntries.length}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-300 text-sm">Completion Rate</p>
                      <p className="text-2xl font-bold text-white">87%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-300 text-sm">Current Streak</p>
                      <p className="text-2xl font-bold text-white">12 days</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Goals */}
            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Your Goals</CardTitle>
              </CardHeader>
              <CardContent>
                {goals.length === 0 ? (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-200 mb-4">No goals set yet</p>
                    <Button
                      onClick={() => setActiveTab("goals")}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Set Your First Goal
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {goals.map((goal, idx) => (
                      <div key={goal.id} className="mb-6">
                        <div className="font-bold text-purple-400 mb-1">Goal {idx + 1}</div>
                        {renderGoalCard(goal)}
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditGoal(goal)}>Edit</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteGoal(goal.id)}>Delete</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "goals" && <StarSetter onGoalCreated={handleGoalCreated} />}
        {activeTab === "compass" && <DailyCompass goals={goals} onJournalEntry={handleJournalEntry} />}
        {activeTab === "decisions" && <DecisionObservatory />}
        {activeTab === "insights" && <MemoryInsights />}
      </div>
    </div>
  )
}
