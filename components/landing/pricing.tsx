import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown } from "lucide-react"

const plans = [
  {
    name: "Free Explorer",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with AI-powered goal setting",
    icon: Star,
    color: "from-slate-500 to-slate-600",
    features: [
      "Up to 3 active goals",
      "Basic daily check-ins",
      "Simple weekly reviews",
      "Community access",
      "Mobile app",
    ],
    limitations: ["Limited AI conversations", "Basic goal templates", "7-day memory retention"],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Star-Collector+",
    price: "$12",
    period: "per month",
    description: "Unlock the full power of AI-driven personal growth",
    icon: Zap,
    color: "from-purple-500 to-purple-600",
    features: [
      "Unlimited goals & projects",
      "Advanced AI coaching",
      "Multi-perspective decisions",
      "Unlimited memory & context",
      "Progress analytics",
      "Priority support",
      "Export your data",
    ],
    limitations: [],
    cta: "Start 14-Day Trial",
    popular: true,
  },
  {
    name: "Life Architect",
    price: "$29",
    period: "per month",
    description: "For serious achievers who want maximum AI support",
    icon: Crown,
    color: "from-amber-500 to-orange-500",
    features: [
      "Everything in Star-Collector+",
      "1-on-1 AI strategy sessions",
      "Custom goal frameworks",
      "Advanced integrations",
      "Team/family sharing",
      "White-glove onboarding",
      "Direct access to founders",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 glass-dark border-slate-600/30 text-slate-300">
            Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
            Choose your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
              growth plan
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Start free and upgrade as you grow. All plans include our core AI features with increasing levels of
            personalization and support.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <Card
                key={index}
                className={`relative ${
                  plan.popular
                    ? "border-2 border-purple-500/50 shadow-2xl scale-105 glass"
                    : "border border-slate-600/30 hover:shadow-2xl glass-dark"
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto p-3 rounded-xl bg-gradient-to-r ${plan.color} shadow-lg mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-100">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-slate-100">{plan.price}</span>
                    <span className="text-slate-400 ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-slate-300 mt-2">{plan.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button
                    className={`w-full mb-6 ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0"
                        : "glass-dark border-slate-600/30 text-slate-300 hover:text-slate-100 hover:border-purple-500/50"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-100 mb-3">What's included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div className="pt-4 border-t border-slate-600/30">
                        <h4 className="font-semibold text-slate-100 mb-3">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <li key={limitIndex} className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full border-2 border-slate-500 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-400 text-sm">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <div className="glass-dark rounded-2xl p-8 shadow-2xl border border-slate-600/30 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-100 mb-6">Pricing FAQ</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-slate-100 mb-2">Can I change plans anytime?</h4>
                <p className="text-slate-300 text-sm">
                  Yes! Upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-100 mb-2">What happens to my data if I cancel?</h4>
                <p className="text-slate-300 text-sm">
                  Your data remains accessible for 30 days after cancellation. You can export it anytime.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-100 mb-2">Do you offer student discounts?</h4>
                <p className="text-slate-300 text-sm">
                  Yes! Students get 50% off all paid plans with valid student ID verification.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-100 mb-2">Is there a money-back guarantee?</h4>
                <p className="text-slate-300 text-sm">30-day money-back guarantee, no questions asked.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
