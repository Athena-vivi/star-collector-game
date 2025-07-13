"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Star, Sparkles, Target, Calendar, Brain, Loader2 } from "lucide-react"
import type { Goal } from "@/lib/ai-services"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useToast } from "@/components/ui/use-toast";

interface StarSetterProps {
  onGoalCreated: (goal: Goal) => void
}

// 辅助函数定义在组件外部
function formatDatePretty(date: string | Date) {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date + (date.length === 10 ? 'T00:00:00' : '')) : date;
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function extractUsefulDescription(desc: string): string {
  if (!desc) return "";
  let str = desc.trim();
  // 去除 markdown 代码块包裹
  if (/^```(json)?[\s\S]*```$/.test(str)) {
    str = str.replace(/^```(json)?/, '').replace(/```$/, '').trim();
  }
  // 解析 JSON，优先取 description/summary 字段
  try {
    const obj = JSON.parse(str);
    if (typeof obj === 'object' && obj !== null) {
      if (typeof obj.description === 'string' && obj.description.trim()) {
        return obj.description.trim();
      }
      if (typeof obj.summary === 'string' && obj.summary.trim()) {
        return obj.summary.trim();
      }
      // 如果是数组，尝试拼接文本
      if (Array.isArray(obj)) {
        return obj.map(item => typeof item === 'string' ? item : JSON.stringify(item)).join('\n');
      }
      // 兜底：拼接所有字符串字段
      const texts = Object.values(obj).filter(v => typeof v === 'string').join('\n');
      if (texts) return texts;
    }
  } catch {}
  // 兜底：去除 markdown 包裹后直接返回
  return str;
}

function safeDescription(desc: string) {
  if (!desc) return "";
  const useful = extractUsefulDescription(desc);
  // 如果 useful 为空或内容依然是原始 JSON/markdown，才报错
  if (!useful || /^\s*[{\[].*[}\]]\s*$/.test(useful) || /^```(json)?[\s\S]*```$/.test(useful)) {
    return "AI未能正确生成目标内容，请重试。";
  }
  return useful;
}

function generateMilestones(totalAmount: number, unit: string, today: Date, targetDate: Date, count = 4) {
  const milestones = [];
  const start = today.getTime();
  const end = targetDate.getTime();
  for (let i = 1; i <= count; i++) {
    const progress = i / count;
    const date = new Date(start + (end - start) * progress);
    date.setHours(0, 0, 0, 0);
    const amount = Math.round(totalAmount * progress * 100) / 100;
    let label = i === count
      ? `Goal achieved! ${totalAmount} ${unit} by ${date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`
      : `Step ${i}: ${amount} ${unit} by ${date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`;
    milestones.push({
      amount,
      unit,
      date: date.toISOString().split('T')[0],
      label,
    });
  }
  return milestones;
}

export function renderGoalCard(goal: any, onCreate?: () => void) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const futureMilestones = Array.isArray(goal.milestones)
    ? goal.milestones.filter((m: any) => {
        const d = new Date(m.date);
        d.setHours(0, 0, 0, 0);
        return d >= today;
      })
    : [];

  let milestones = futureMilestones;
  if (milestones.length < 3 && goal.targetDate) {
    let totalAmount = goal.milestones?.[goal.milestones.length - 1]?.amount;
    let unit = goal.milestones?.[goal.milestones.length - 1]?.unit || goal.unit || '';
    // 兜底：尝试从 title/description 提取数值
    if (!totalAmount || totalAmount === 0) {
      const match = (goal.title + ' ' + goal.description).match(/(\d+(\.\d+)?)/);
      if (match) totalAmount = parseFloat(match[1]);
    }
    // 兜底：如果依然为0，给个默认值
    if (!totalAmount || totalAmount === 0) {
      totalAmount = 1;
    }
    milestones = generateMilestones(
      totalAmount,
      unit,
      today,
      new Date(goal.targetDate),
      4
    );
  }

  return (
    <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30 shadow-xl my-4">
      <CardHeader>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-white text-2xl">
            <Brain className="h-6 w-6 text-purple-400" />
            <span>{goal.title}</span>
            <Badge className="ml-2">{goal.category}</Badge>
          </div>
          <div className="flex items-center gap-1 mt-3 text-sm text-slate-300">
            <Calendar className="h-4 w-4" />
            <b>{formatDatePretty(goal.targetDate)}</b>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-slate-200 mb-4">{safeDescription(goal.description)}</p>
        {milestones.length > 0 ? (
          <div className="overflow-x-auto">
            <h4 className="font-semibold text-white mb-3">Key Milestones</h4>
            <table className="w-full text-sm border border-slate-600 bg-slate-900/60 rounded-lg">
              <thead>
                <tr className="bg-slate-700/60 text-purple-300">
                  <th className="border border-slate-600 px-2 py-1">阶段</th>
                  <th className="border border-slate-600 px-2 py-1">目标</th>
                  <th className="border border-slate-600 px-2 py-1">日期</th>
                </tr>
              </thead>
              <tbody>
                {milestones.map((m: any, i: number) => (
                  <tr key={i} className="even:bg-slate-800/40">
                    <td className="border border-slate-600 px-2 py-1 text-center">{i + 1}</td>
                    <td className="border border-slate-600 px-2 py-1">{m.label}</td>
                    <td className="border border-slate-600 px-2 py-1 text-center">{formatDatePretty(m.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-slate-400 italic">No upcoming milestones.</div>
        )}
        {onCreate && (
          <div className="text-center pt-4">
            <Button
              onClick={onCreate}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 text-lg"
            >
              <Star className="h-5 w-5 mr-2" />
              Create This Goal
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// StarSetter 组件支持编辑模式
export default function StarSetter({ onGoalCreated, editingGoal }: StarSetterProps & { editingGoal?: Goal }) {
  const [title, setTitle] = useState(editingGoal?.title || "")
  const [description, setDescription] = useState(editingGoal?.description || "")
  const [category, setCategory] = useState(editingGoal?.category || "")
  const [targetDate, setTargetDate] = useState<Date | null>(editingGoal?.targetDate ? new Date(editingGoal.targetDate) : null);
  const [isRefining, setIsRefining] = useState(false)
  const [refinedGoal, setRefinedGoal] = useState<Goal | null>(null)
  const { toast } = useToast();

  const categories = [
    "Health & Fitness",
    "Career & Professional",
    "Personal Development",
    "Relationships",
    "Financial",
    "Creative & Hobbies",
    "Education & Learning",
    "Spiritual & Mindfulness",
  ]

  // 日期合法性校验
  const isValidDate = (dateStr: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
    const d = new Date(dateStr);
    return !isNaN(d.getTime()) && d.getFullYear().toString().length === 4;
  };

  const refineGoal = async () => {
    if (!title.trim() || !description.trim() || !category || !targetDate) return

    setIsRefining(true)
    try {
      const response = await fetch("/api/ai/refine-goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInput: title,
          userContext: description,
          category,
          targetDate: targetDate ? targetDate.toISOString().split("T")[0] : "",
          unit: "斤", // 如有单位输入控件可动态传递
        }),
      })

      if (response.ok) {
        const result = await response.json()
        // 优先使用用户输入的 targetDate，如果 AI 返回的 targetDate 不存在或无效
        let aiGoal = result.goal
        if (!aiGoal.targetDate || isNaN(new Date(aiGoal.targetDate).getTime())) {
          aiGoal.targetDate = targetDate ? targetDate.toISOString().split("T")[0] : "";
        }
        setRefinedGoal(aiGoal)
      }
    } catch (error) {
      console.error("Failed to refine goal:", error)
    } finally {
      setIsRefining(false)
    }
  }

  const createGoal = () => {
    if (refinedGoal) {
      onGoalCreated(refinedGoal);
      toast({
        title: "Goal created successfully!",
        description: "Your goal has been added. Keep up the good work!",
        duration: 3000,
      });
      // Reset form
      setTitle("")
      setDescription("")
      setCategory("")
      setTargetDate(null)
      setRefinedGoal(null)
    }
  }

  const getCategoryColor = (cat: string) => {
    const colors = {
      "Health & Fitness": "bg-green-500/10 text-green-400 border-green-500/30",
      "Career & Professional": "bg-blue-500/10 text-blue-400 border-blue-500/30",
      "Personal Development": "bg-purple-500/10 text-purple-400 border-purple-500/30",
      Relationships: "bg-pink-500/10 text-pink-400 border-pink-500/30",
      Financial: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      "Creative & Hobbies": "bg-orange-500/10 text-orange-400 border-orange-500/30",
      "Education & Learning": "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      "Spiritual & Mindfulness": "bg-teal-500/10 text-teal-400 border-teal-500/30",
    }
    return colors[cat as keyof typeof colors] || "bg-slate-500/10 text-slate-400 border-slate-500/30"
  }

  // 专家级：安全解析 refinedGoal
  function parseGoalData(data: any) {
    let goal = data;
    for (let i = 0; i < 2; i++) {
      if (typeof goal === 'string') {
        try {
          goal = JSON.parse(goal);
        } catch {
          break;
        }
      }
    }
    if (!goal || typeof goal !== 'object' || !goal.title) return null;
    return goal;
  }

  // 自动提取AI返回的markdown代码块或JSON中的目标内容
  function extractGoalFromAny(data: any) {
    let str = typeof data === 'string' ? data.trim() : '';
    if (str.startsWith('```')) {
      str = str.replace(/^```(json)?/, '').replace(/```$/, '').trim();
    }
    let obj = data;
    if (typeof str === 'string' && str.length > 0) {
      try {
        obj = JSON.parse(str);
      } catch {
        // 不是有效JSON，继续用原始data
      }
    }
    if (obj && typeof obj === 'object' && (obj.title || obj.description || obj.milestones)) {
      return obj;
    }
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Star className="h-6 w-6 text-purple-400" />
            Set Your Star
          </CardTitle>
          <p className="text-slate-200">Transform your aspirations into achievable goals with AI-powered guidance</p>
        </CardHeader>
      </Card>

      {/* Goal Input Form */}
      <Card className="bg-slate-800/80 border-slate-600/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white">What's your goal?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Goal Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Run a marathon, Learn Spanish, Start a business"
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your goal in more detail. What does success look like?"
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 min-h-[100px]"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-purple-500">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-white hover:bg-slate-700">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Target Date</label>
              <DatePicker
                selected={targetDate}
                onChange={(date) => setTargetDate(date)}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                placeholderText="Select target date"
                className="bg-slate-700/50 border-slate-600 text-white focus:border-purple-500 w-full rounded-md px-3 py-2"
              />
              {targetDate && !isValidDate(targetDate.toISOString().split("T")[0]) && (
                <div className="text-red-500 text-xs mt-1">Please enter a valid date (YYYY-MM-DD, 4-digit year)</div>
              )}
              {!targetDate && (
                <div className="text-red-500 text-xs mt-1">Please select a target date</div>
              )}
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={refineGoal}
              disabled={
                isRefining ||
                !title.trim() ||
                !description.trim() ||
                !category ||
                !targetDate ||
                !isValidDate(targetDate.toISOString().split("T")[0])
              }
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
            >
              {isRefining ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  AI is refining your goal...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Refine with AI
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Refined Goal Preview */}
      {refinedGoal && (() => {
        let goalObj = parseGoalData(refinedGoal);
        // 新增：如果 description 字段是 markdown/JSON，自动提取
        if (goalObj && typeof goalObj.description === 'string') {
          const extracted = extractGoalFromAny(goalObj.description);
          if (extracted) {
            goalObj = { ...goalObj, ...extracted };
          }
        }
        if (!goalObj || !goalObj.title) {
          return <div className="text-red-500">AI返回内容异常，未能自动修复，请重试。</div>;
        }
        return renderGoalCard(goalObj, createGoal);
      })()}
    </div>
  )
}