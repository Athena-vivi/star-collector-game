"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Compass, Telescope, Brain, Target, TrendingUp, Users, Shield } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Star,
    title: "AI Q&A",
    description: "Ask astronomy questions and get instant answers powered by GPT-4o.",
    badge: "Core",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  {
    icon: Telescope,
    title: "Astronomy Wallpaper Generation",
    description: "Generate stunning space wallpapers with AI (FAL).",
    badge: "Premium",
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  {
    icon: Compass,
    title: "Weather Data Integration",
    description: "Get real-time weather data for stargazing (OpenWeather).",
    badge: "Weather",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
]

export default function EnhancedFeatures() {
  return (
    <section id="features" className="py-24 relative w-full overflow-hidden">
      {/* 全屏深色背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" />
      {/* 背景装饰 */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 border-slate-600/30 text-slate-300 glass-dark">
              Platform Capabilities
            </Badge>
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl font-light text-slate-100 mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Comprehensive Growth
            <br />
            <span className="font-medium bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
              Infrastructure
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A sophisticated ecosystem of AI-powered tools designed for ambitious professionals seeking systematic
            personal and career advancement.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-300 glass-dark border-slate-600/30 h-full hover:border-purple-500/30">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`p-3 rounded-xl ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="h-6 w-6 text-slate-300" />
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs border-slate-600/30 text-slate-400 bg-slate-700/30 ${feature.borderColor}`}
                      >
                        {feature.badge}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-3 group-hover:text-purple-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* 架构亮点 */}
      </div>
    </section>
  )
}
