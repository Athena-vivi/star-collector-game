'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { 
  User, 
  CreditCard, 
  Download, 
  MessageSquare, 
  Sparkles,
  Crown,
  Zap,
  Check,
  X,
  Settings,
  History,
  Star
} from 'lucide-react'

interface Subscription {
  id: string
  plan: 'free' | 'plus' | 'pro'
  status: 'active' | 'canceled' | 'expired'
  startDate: Date
  endDate?: Date
  price: number
  currency: string
}

interface Usage {
  wallpapersGenerated: number
  wallpapersRemaining: number
  questionsAsked: number
  questionsRemaining: number
  totalUsage: number
}

interface Plan {
  id: string
  name: string
  price: number
  currency: string
  features: string[]
  popular?: boolean
  icon: React.ReactNode
}

export default function AccountPage() {
  const [subscription, setSubscription] = useState<Subscription>({
    id: '1',
    plan: 'free',
    status: 'active',
    startDate: new Date(),
    price: 0,
    currency: 'USD'
  })
  
  const [usage, setUsage] = useState<Usage>({
    wallpapersGenerated: 2,
    wallpapersRemaining: 1,
    questionsAsked: 5,
    questionsRemaining: 95,
    totalUsage: 7
  })

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      currency: 'USD',
      icon: <Star className="w-6 h-6" />,
      features: [
        '1 wallpaper generation per day',
        'Basic AI Q&A',
        'Stargazing alerts preview',
        'Community support'
      ]
    },
    {
      id: 'plus',
      name: 'Plus',
      price: 4.99,
      currency: 'USD',
      popular: true,
      icon: <Zap className="w-6 h-6" />,
      features: [
        'Unlimited wallpaper generation',
        'GPT-4o AI Q&A',
        'Personalized stargazing alerts',
        'Priority customer support',
        'No watermark downloads',
        'Advanced style options'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 9.99,
      currency: 'USD',
      icon: <Crown className="w-6 h-6" />,
      features: [
        'All Plus features',
        'Commercial wallpaper license',
        'API access',
        'Dedicated support',
        'Batch generation',
        'Advanced analytics',
        'Custom model training'
      ]
    }
  ]

  const handleUpgrade = (planId: string) => {
    // 这里集成Stripe支付
    console.log('升级到:', planId)
  }

  const handleCancelSubscription = () => {
    // 取消订阅逻辑
    console.log('取消订阅')
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'free': return <Star className="w-5 h-5" />
      case 'plus': return <Zap className="w-5 h-5" />
      case 'pro': return <Crown className="w-5 h-5" />
      default: return <Star className="w-5 h-5" />
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'text-gray-400'
      case 'plus': return 'text-blue-400'
              case 'pro': return 'text-indigo-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            My Account
          </h1>
          <p className="text-gray-300">
            Manage your subscription and usage
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Account Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Account Overview */}
            <Card className="bg-black/40 backdrop-blur-sm border-indigo-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text" />
                  Account Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Current Plan</span>
                  <Badge 
                    variant="outline" 
                    className={`${getPlanColor(subscription.plan)} border-current`}
                  >
                    {subscription.plan === 'free' && 'Free'}
                    {subscription.plan === 'plus' && 'Plus'}
                    {subscription.plan === 'pro' && 'Pro'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Status</span>
                  <Badge 
                    variant="outline" 
                    className={subscription.status === 'active' ? 'border-green-500 text-green-300' : 'border-red-500 text-red-300'}
                  >
                    {subscription.status === 'active' ? 'Active' : 'Canceled'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Start Date</span>
                  <span className="text-white">{formatDate(subscription.startDate)}</span>
                </div>
                
                {subscription.endDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">End Date</span>
                    <span className="text-white">{formatDate(subscription.endDate)}</span>
                  </div>
                )}
                
                {subscription.plan !== 'free' && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Monthly Fee</span>
                    <span className="text-white">${subscription.price}/{subscription.currency}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Usage */}
            <Card className="bg-black/40 backdrop-blur-sm border-indigo-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text" />
                  Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm">Wallpapers Generated</span>
                    <span className="text-white text-sm">
                      {usage.wallpapersGenerated}/{subscription.plan === 'free' ? 1 : '∞'}
                    </span>
                  </div>
                  {subscription.plan === 'free' && (
                    <Progress 
                      value={(usage.wallpapersGenerated / 1) * 100} 
                      className="h-2"
                    />
                  )}
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm">AI Q&A</span>
                    <span className="text-white text-sm">
                      {usage.questionsAsked}/{subscription.plan === 'free' ? 100 : '∞'}
                    </span>
                  </div>
                  {subscription.plan === 'free' && (
                    <Progress 
                      value={(usage.questionsAsked / 100) * 100} 
                      className="h-2"
                    />
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-300 text-sm">Total Usage</span>
                  <span className="text-white text-sm">{usage.totalUsage}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Subscription Plans */}
          <div className="lg:col-span-2">
            <Card className="bg-black/40 backdrop-blur-sm border-indigo-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text" />
                  Subscription Plans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`relative p-6 rounded-lg border-2 transition-all ${
                        plan.popular 
                          ? 'border-indigo-500 bg-indigo-500/10' 
                          : 'border-indigo-500/30 bg-white/5'
                      } ${
                        subscription.plan === plan.id 
                          ? 'ring-2 ring-indigo-500/50' 
                          : 'hover:border-indigo-500/40'
                      }`}
                    >
                      {plan.popular && (
                        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white">
                          Most Popular
                        </Badge>
                      )}
                      
                      <div className="text-center mb-6">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                          plan.popular ? 'bg-indigo-500' : 'bg-gray-600'
                        }`}>
                          {plan.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                        <div className="text-3xl font-bold text-white mb-1">
                          ${plan.price}
                          <span className="text-gray-400 text-sm font-normal">/month</span>
                        </div>
                        {plan.price === 0 && (
                          <p className="text-gray-400 text-sm">Permanent Free</p>
                        )}
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button
                        onClick={() => handleUpgrade(plan.id)}
                        disabled={subscription.plan === plan.id}
                        className={`w-full ${
                          subscription.plan === plan.id
                            ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                            : plan.popular
                            ? 'bg-indigo-600 hover:bg-indigo-700'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {subscription.plan === plan.id ? 'Current Plan' : 'Choose Plan'}
                      </Button>
                    </div>
                  ))}
                </div>
                
                {subscription.plan !== 'free' && (
                  <div className="mt-8 pt-6 border-t border-indigo-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Manage Subscription</h4>
                        <p className="text-gray-400 text-sm">
                          Cancel subscription or change payment method
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={handleCancelSubscription}
                        className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                      >
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 