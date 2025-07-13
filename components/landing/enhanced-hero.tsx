"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight, Play, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function EnhancedHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      {/* 动态背景元素 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-500/5 to-transparent rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge
              variant="outline"
              className="mb-8 px-6 py-3 text-sm font-medium border-slate-600/30 text-slate-300 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Personal Growth Platform
            </Badge>
          </motion.div>

          {/* 主标题 */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-8 leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Personal
            <br />
            <span className="font-medium bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
              Growth Architect
            </span>
          </motion.h1>

          {/* 副标题 */}
          <motion.p
            className="text-xl sm:text-2xl text-slate-300 mb-6 leading-relaxed max-w-4xl mx-auto font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your personal AI growth coach: set goals, reflect daily, and achieve more with tailored guidance.
          </motion.p>

          {/* 适用人群/场景描述 */}
          <motion.p
            className="text-base sm:text-lg text-slate-400 mb-10 max-w-2xl mx-auto font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Perfect for ambitious professionals, students, and anyone seeking structured, AI-powered personal growth.
          </motion.p>

          {/* CTA 按钮 */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* 移除 /dashboard 相关按钮 */}
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-4 h-auto font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 border-2 border-slate-400 hover:border-purple-400 flex items-center gap-2"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
                <span className="ml-1">▶</span>
              </Button>
            </Link>
          </motion.div>

          {/* 社会证明 */}
          {/*
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-12 text-slate-400 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 border-2 border-slate-800 shadow-lg"
                  />
                ))}
              </div>
              <span className="text-sm font-medium">Trusted by 10,000+ professionals</span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 text-sm font-medium">4.9 out of 5</span>
            </div>
          </motion.div>
          */}
        </div>

        {/* Hero 视觉效果 */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl transform -rotate-1" />
            <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-12">
              {/* 删除 Daily Free Credits 浮层 */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* 目标设定预览 */}
                <motion.div
                  className="bg-slate-900/50 rounded-xl p-8 border border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-purple-500/30"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
                      <Star className="h-4 w-4 text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-slate-200">Goal Architecture</h3>
                  </div>
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                    "I want to advance my career and improve work-life balance..."
                  </p>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
                    <div className="text-xs font-medium text-purple-400 mb-2">AI-Structured Goal:</div>
                    <div className="text-sm text-slate-300 leading-relaxed">
                      Complete leadership certification by Q2, delegate 30% of tasks, establish 6pm work boundary
                    </div>
                  </div>
                </motion.div>

                {/* 日常指南预览 */}
                <motion.div
                  className="bg-slate-900/50 rounded-xl p-8 border border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-500/30"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-blue-400" />
                    </div>
                    <h3 className="font-semibold text-slate-200">Daily Reflection</h3>
                  </div>
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                    "How did today's leadership meeting align with your growth goals?"
                  </p>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
                    <div className="text-xs font-medium text-blue-400 mb-2">Insight Score: 8.5/10</div>
                    <div className="text-sm text-slate-300 leading-relaxed">
                      "Successfully facilitated team discussion. Felt confident in decision-making."
                    </div>
                  </div>
                </motion.div>

                {/* 决策分析预览 */}
                <motion.div
                  className="bg-slate-900/50 rounded-xl p-8 border border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-emerald-500/30"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-slate-200">Decision Intelligence</h3>
                  </div>
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                    "Should I accept the senior management position?"
                  </p>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
                    <div className="text-xs font-medium text-emerald-400 mb-2">Multi-perspective Analysis:</div>
                    <div className="text-sm text-slate-300">Strategic • Intuitive • Risk-aware</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
