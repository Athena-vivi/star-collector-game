"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Star, Compass, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

const steps = [
  {
    step: "01",
    icon: Star,
    title: "Set Your Stars",
    href: "/set-stars",
    description:
      "Share your aspirations with our AI coach. Through conversational guidance, transform vague goals into specific, achievable targets.",
    details: ["AI asks clarifying questions", "SMART goal framework", "Personalized timeline", "Progress milestones"],
    color: "from-amber-400 to-orange-500",
  },
  {
    step: "02",
    icon: Compass,
    title: "Daily Navigation",
    href: "/daily-navigation",
    description:
      "Start each day with AI-powered motivation and end with guided reflection. Build consistent habits that compound over time.",
    details: ["Morning encouragement", "Evening reflection", "Mood tracking", "Pattern recognition"],
    color: "from-blue-400 to-indigo-500",
  },
  {
    step: "03",
    icon: BarChart3,
    title: "Continuous Growth",
    href: "/continuous-growth",
    description:
      "Receive weekly insights, track your progress, and get AI recommendations for course corrections and optimizations.",
    details: ["Progress visualization", "Trend analysis", "Personalized recommendations"],
    color: "from-purple-400 to-pink-500",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 glass-dark border-slate-600/30 text-slate-300">
            How It Works
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
            Your journey to success in{" "}
            <span className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
              three simple steps
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Our AI-powered system guides you through a proven framework for sustainable personal growth and achievement.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isLast = index === steps.length - 1

            return (
              <div key={index} className="relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                  {/* Content */}
                  <motion.div
                    className={`${index % 2 === 1 ? "lg:order-2" : ""}`}
                    initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-r ${step.color} shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-6xl font-bold text-slate-700/30">{step.step}</div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-100 mb-4">{step.title}</h3>
                    <p className="text-lg text-slate-300 mb-6 leading-relaxed">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-3 text-slate-300">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-400" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <Link href={step.href} scroll={false}>
                      <Button
                        variant="outline"
                        className="mt-4 glass-dark border-slate-600/30 text-slate-300 hover:text-slate-100 hover:border-purple-500/50 bg-transparent"
                        onClick={() => {
                          setTimeout(() => {
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }, 100)
                        }}
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </motion.div>

                  {/* Visual */}
                  <motion.div
                    className={`${index % 2 === 1 ? "lg:order-1" : ""}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                  >
                    <Card className="glass-dark border-slate-600/30 shadow-2xl">
                      <CardContent className="p-8">
                        <div className="aspect-square bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-2xl flex items-center justify-center shadow-inner">
                          <div className={`p-8 rounded-full bg-gradient-to-r ${step.color} shadow-2xl`}>
                            <Icon className="h-16 w-16 text-white" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Arrow */}
                {!isLast && (
                  <div className="flex justify-center mb-16">
                    <div className="p-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full shadow-lg">
                      <ArrowRight className="h-6 w-6 text-white" />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-dark rounded-2xl p-8 border border-slate-600/30 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-100 mb-4">Ready to start your transformation?</h3>
            <p className="text-slate-300 mb-6">Join thousands who have already begun their journey to success.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                No credit card required
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                Cancel anytime
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
