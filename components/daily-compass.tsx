"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Compass, Sun, Moon, Heart, Brain, Target, Loader2 } from "lucide-react"
import type { Goal, JournalEntry } from "@/lib/ai-services"

interface DailyCompassProps {
  goals: Goal[]
  onJournalEntry: (entry: JournalEntry) => void
}

export default function DailyCompass({ goals, onJournalEntry }: DailyCompassProps) {
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "evening">("morning")
  const [mood, setMood] = useState([7])
  const [energy, setEnergy] = useState([7])
  const [reflection, setReflection] = useState("")
  const [priorities, setPriorities] = useState("")
  const [gratitude, setGratitude] = useState("")
  const [challenges, setChallenges] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [encouragement, setEncouragement] = useState("")

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Create journal entry
      const entry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date(),
        mood: mood[0],
        energy: energy[0],
        reflection,
        priorities,
        gratitude,
        challenges,
        timeOfDay,
      }

      // Get AI encouragement
      const response = await fetch(`/api/ai/${timeOfDay}-encouragement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: mood[0],
          energy: energy[0],
          reflection,
          priorities,
          gratitude,
          challenges,
          goals: goals.slice(0, 3), // Send top 3 goals for context
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setEncouragement(result.encouragement)
      }

      onJournalEntry(entry)

      // Reset form
      setReflection("")
      setPriorities("")
      setGratitude("")
      setChallenges("")
    } catch (error) {
      console.error("Failed to submit journal entry:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Compass className="h-6 w-6 text-blue-400" />
            Daily Compass
          </CardTitle>
          <p className="text-slate-200">Check in with yourself and get personalized guidance for your day</p>
        </CardHeader>
      </Card>

      {/* Time of Day Selection */}
      <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant={timeOfDay === "morning" ? "default" : "outline"}
              onClick={() => setTimeOfDay("morning")}
              className={`flex items-center gap-2 ${
                timeOfDay === "morning"
                  ? "bg-orange-600 hover:bg-orange-700 text-white"
                  : "border-slate-600 text-slate-200 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Sun className="h-4 w-4" />
              Morning Check-in
            </Button>
            <Button
              variant={timeOfDay === "evening" ? "default" : "outline"}
              onClick={() => setTimeOfDay("evening")}
              className={`flex items-center gap-2 ${
                timeOfDay === "evening"
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "border-slate-600 text-slate-200 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Moon className="h-4 w-4" />
              Evening Reflection
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mood & Energy */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Heart className="h-5 w-5 text-red-400" />
              Mood
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-3xl font-bold text-white">{mood[0]}/10</span>
              </div>
              <Slider value={mood} onValueChange={setMood} max={10} min={1} step={1} className="w-full" />
              <div className="flex justify-between text-xs text-slate-400">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Brain className="h-5 w-5 text-purple-400" />
              Energy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-3xl font-bold text-white">{energy[0]}/10</span>
              </div>
              <Slider value={energy} onValueChange={setEnergy} max={10} min={1} step={1} className="w-full" />
              <div className="flex justify-between text-xs text-slate-400">
                <span>Drained</span>
                <span>Energized</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reflection Questions */}
      <div className="space-y-6">
        {timeOfDay === "morning" ? (
          <>
            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">What are your top priorities for today?</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={priorities}
                  onChange={(e) => setPriorities(e.target.value)}
                  placeholder="List 2-3 key things you want to accomplish today..."
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 min-h-[100px]"
                />
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">What are you grateful for this morning?</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={gratitude}
                  onChange={(e) => setGratitude(e.target.value)}
                  placeholder="Take a moment to appreciate what's going well in your life..."
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 min-h-[100px]"
                />
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">How did your day go?</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Reflect on your day - what went well, what could be improved..."
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-indigo-500 min-h-[100px]"
                />
              </CardContent>
            </Card>

            <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">What challenges did you face?</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  placeholder="What obstacles or difficulties did you encounter today?"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-indigo-500 min-h-[100px]"
                />
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Active Goals */}
      {goals.length > 0 && (
        <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Target className="h-5 w-5 text-green-400" />
              Your Active Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {goals.slice(0, 3).map((goal) => (
                <div key={goal.id} className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">{goal.title}</span>
                    <Badge variant="outline" className="border-slate-500 text-slate-200 bg-slate-800/50">
                      {goal.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      <div className="text-center">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || (!priorities && !reflection)}
          className={`px-8 py-3 text-lg ${
            timeOfDay === "morning"
              ? "bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          } text-white`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Getting Guidance...
            </>
          ) : (
            <>
              <Compass className="h-5 w-5 mr-2" />
              Get AI Guidance
            </>
          )}
        </Button>
      </div>

      {/* AI Encouragement */}
      {encouragement && (
        <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Brain className="h-5 w-5 text-blue-400" />
              Your AI Compass
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-100 leading-relaxed">{encouragement}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
