"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Telescope, Plus, X, Brain, TrendingUp, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"

interface DecisionOption {
  id: string
  title: string
  description: string
  pros: string[]
  cons: string[]
}

interface DecisionAnalysis {
  recommendation: string
  reasoning: string
  riskLevel: "low" | "medium" | "high"
  confidence: number
  considerations: string[]
}

// 限制每日AI问答次数
function canAskAI() {
  const today = new Date().toISOString().slice(0, 10);
  const key = `ai_ask_count_${today}`;
  const count = parseInt(localStorage.getItem(key) || "0", 10);
  return count < 5;
}
function recordAIAsk() {
  const today = new Date().toISOString().slice(0, 10);
  const key = `ai_ask_count_${today}`;
  const count = parseInt(localStorage.getItem(key) || "0", 10);
  localStorage.setItem(key, (count + 1).toString());
}

export default function DecisionObservatory() {
  const [decisionTitle, setDecisionTitle] = useState("")
  const [decisionContext, setDecisionContext] = useState("")
  const [options, setOptions] = useState<DecisionOption[]>([])
  const [newOption, setNewOption] = useState({ title: "", description: "" })
  const [analysis, setAnalysis] = useState<DecisionAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const addOption = () => {
    if (newOption.title.trim()) {
      const option: DecisionOption = {
        id: Date.now().toString(),
        title: newOption.title,
        description: newOption.description,
        pros: [],
        cons: [],
      }
      setOptions([...options, option])
      setNewOption({ title: "", description: "" })
    }
  }

  const removeOption = (id: string) => {
    setOptions(options.filter((option) => option.id !== id))
  }

  const analyzeDecision = async () => {
    if (!decisionTitle.trim() || options.length < 2) return

    // 新增：AI问答每日5次限制
    if (!canAskAI()) {
      alert("今日免费额度已用完");
      return;
    }
    recordAIAsk();
    setIsAnalyzing(true)

    try {
      const response = await fetch("/api/ai/analyze-decision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: decisionTitle,
          context: decisionContext,
          options: options,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setAnalysis(result.analysis)
      }
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-400 bg-green-400/10 border-green-400/30"
      case "medium":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30"
      case "high":
        return "text-red-400 bg-red-400/10 border-red-400/30"
      default:
        return "text-slate-400 bg-slate-400/10 border-slate-400/30"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low":
        return <CheckCircle className="h-4 w-4" />
      case "medium":
        return <AlertTriangle className="h-4 w-4" />
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Telescope className="h-6 w-6 text-purple-400" />
            Decision Observatory
          </CardTitle>
          <p className="text-slate-200">Get AI-powered analysis to make better decisions with confidence</p>
        </CardHeader>
      </Card>

      {/* Decision Input */}
      <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white">What decision are you facing?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Decision Title</label>
            <Input
              value={decisionTitle}
              onChange={(e) => setDecisionTitle(e.target.value)}
              placeholder="e.g., Should I change careers?"
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Context & Background (Optional)</label>
            <Textarea
              value={decisionContext}
              onChange={(e) => setDecisionContext(e.target.value)}
              placeholder="Provide any relevant context, constraints, or background information..."
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Options */}
      <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white">Your Options</CardTitle>
          <p className="text-slate-300 text-sm">Add at least 2 options to compare</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Option */}
          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
            <div className="space-y-3">
              <Input
                value={newOption.title}
                onChange={(e) => setNewOption({ ...newOption, title: e.target.value })}
                placeholder="Option title (e.g., Stay in current job)"
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
              />
              <Textarea
                value={newOption.description}
                onChange={(e) => setNewOption({ ...newOption, description: e.target.value })}
                placeholder="Brief description of this option..."
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
              />
              <Button
                onClick={addOption}
                disabled={!newOption.title.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            </div>
          </div>

          {/* Existing Options */}
          {options.map((option) => (
            <div key={option.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/30">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{option.title}</h3>
                  {option.description && <p className="text-slate-200 text-sm mb-2">{option.description}</p>}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOption(option.id)}
                  className="text-slate-400 hover:text-red-400 hover:bg-red-400/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {options.length === 0 && (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-300">No options added yet</p>
              <p className="text-slate-400 text-sm">Add your first option above to get started</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Button */}
      {decisionTitle.trim() && options.length >= 2 && (
        <div className="text-center">
          <Button
            onClick={analyzeDecision}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Analyzing Decision...
              </>
            ) : (
              <>
                <Brain className="h-5 w-5 mr-2" />
                Analyze Decision
              </>
            )}
          </Button>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-6 w-6 text-green-400" />
              AI Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Risk Level & Confidence */}
            <div className="flex items-center gap-4">
              <Badge className={`flex items-center gap-2 px-3 py-1 ${getRiskColor(analysis.riskLevel)}`}>
                {getRiskIcon(analysis.riskLevel)}
                Risk: {analysis.riskLevel.toUpperCase()}
              </Badge>
              <div className="text-slate-200">
                <span className="text-sm">Confidence: </span>
                <span className="font-semibold">{analysis.confidence}%</span>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
              <h3 className="font-semibold text-white mb-2">Recommendation</h3>
              <p className="text-slate-200">{analysis.recommendation}</p>
            </div>

            {/* Reasoning */}
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
              <h3 className="font-semibold text-white mb-2">Reasoning</h3>
              <p className="text-slate-200">{analysis.reasoning}</p>
            </div>

            {/* Key Considerations */}
            {analysis.considerations.length > 0 && (
              <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                <h3 className="font-semibold text-white mb-3">Key Considerations</h3>
                <ul className="space-y-2">
                  {analysis.considerations.map((consideration, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-200">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      {consideration}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
