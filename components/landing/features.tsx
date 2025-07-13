import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Compass, Telescope, Brain, Target, TrendingUp, Users, Shield } from "lucide-react"

const features = [
  {
    icon: Star,
    title: "Intelligent Goal Architecture",
    description:
      "Transform abstract aspirations into structured, achievable objectives through conversational AI guidance",
    badge: "Core",
  },
  {
    icon: Compass,
    title: "Daily Growth Compass",
    description: "Morning intention setting and evening reflection with personalized insights and pattern recognition",
    badge: "Daily",
  },
  {
    icon: Telescope,
    title: "Decision Intelligence",
    description:
      "Multi-perspective analysis for complex decisions using strategic, creative, and risk-aware frameworks",
    badge: "Premium",
  },
  {
    icon: Brain,
    title: "Contextual Memory",
    description:
      "AI maintains long-term context of your journey, providing increasingly personalized guidance over time",
    badge: "Premium",
  },
  {
    icon: Target,
    title: "Progress Analytics",
    description: "Sophisticated tracking with behavioral insights and performance optimization recommendations",
    badge: "Analytics",
  },
  {
    icon: TrendingUp,
    title: "Growth Intelligence",
    description: "Weekly synthesis reports highlighting patterns, progress, and strategic recommendations",
    badge: "Insights",
  },
  {
    icon: Users,
    title: "Collaborative Growth",
    description: "Share goals and insights with trusted advisors while maintaining complete privacy control",
    badge: "Coming Soon",
  },
  {
    icon: Shield,
    title: "Privacy Architecture",
    description: "End-to-end encryption with local data storage options and complete user data sovereignty",
    badge: "Security",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-6 border-slate-200 text-slate-600 bg-slate-50">
            Platform Capabilities
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-light text-slate-900 mb-6 tracking-tight">
            Comprehensive Growth
            <br />
            <span className="font-medium text-slate-700">Infrastructure</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
            A sophisticated ecosystem of AI-powered tools designed for ambitious professionals seeking systematic
            personal and career advancement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-slate-200 bg-white">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-slate-100 transition-colors duration-300">
                      <Icon className="h-6 w-6 text-slate-600" />
                    </div>
                    <Badge variant="outline" className="text-xs border-slate-200 text-slate-500 bg-slate-50">
                      {feature.badge}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Architecture Highlight */}
        <div className="mt-20 bg-slate-50 rounded-2xl p-12 text-center border border-slate-200">
          <h3 className="text-2xl font-semibold text-slate-900 mb-4">Multi-Model AI Architecture</h3>
          <p className="text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Unlike single-model solutions, our platform orchestrates specialized AI models for different cognitive
            tasks— strategic analysis, creative ideation, empathetic conversation, and risk assessment.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Badge variant="outline" className="border-slate-300 text-slate-600 bg-white">
              GPT-4o for Strategic Analysis
            </Badge>
            <Badge variant="outline" className="border-slate-300 text-slate-600 bg-white">
              Claude for Empathetic Dialogue
            </Badge>
            <Badge variant="outline" className="border-slate-300 text-slate-600 bg-white">
              Llama for Creative Thinking
            </Badge>
            <Badge variant="outline" className="border-slate-300 text-slate-600 bg-white">
              Mistral for Risk Assessment
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
