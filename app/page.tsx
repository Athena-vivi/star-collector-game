'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Telescope, 
  Moon, 
  Star, 
  MapPin, 
  Calendar,
  Sparkles,
  ArrowRight,
  Download,
  Cloud,
  Eye,
  Zap,
  MessageSquare,
  Palette,
  Globe,
  Users,
  CheckCircle,
  Play,
  ChevronRight,
  ChevronLeft,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import { GlowingGradientIcon } from '@/components/ui/gradient-icon'

interface CelestialEvent {
  id: string
  name: string
  type: 'planet' | 'meteor' | 'moon' | 'star' | 'comet' | 'eclipse' | 'satellite'
  description: string
  bestTime: string
  visibility: 'excellent' | 'good' | 'fair' | 'poor'
  magnitude?: number
  constellation?: string
  source: string
  icon: React.ReactNode
  expertAdvice?: {
    observationTips?: string;
    scienceInsight?: string;
    difficulty?: string;
    safetyTips?: string;
  };
  publishedAt?: string; // Added for new_code
}

interface WeatherData {
  condition: string
  cloudCover: number
  humidity: number
  visibility: number
  lightPollution: 'low' | 'medium' | 'high'
}

export default function HomePage() {
  const [location, setLocation] = useState('New York')
  const [tonightEvents, setTonightEvents] = useState<CelestialEvent[]>([])
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showCityModal, setShowCityModal] = useState(false)
  const [newCity, setNewCity] = useState('')
  const [fetchDate, setFetchDate] = useState<string | null>(null)
  // 删除与weeklySummary、weeklyEvents、weeklyLoading、fetchWeeklySummary等相关的所有代码和展示

  useEffect(() => {
    const fetchTonightEvents = async () => {
      try {
        const response = await fetch('/api/cosmic-ping')
        const data = await response.json()
        console.log('API Response:', data)
        
        if (data.success && data.data && data.data.events) {
          const events = data.data.events.map((event: any) => ({
            id: event.id || `event_${Math.random()}`,
            name: event.name || 'Unknown Event',
            type: event.type || 'star',
            description: event.description || 'No description available',
            bestTime: event.bestTime || '20:00 - 22:00',
            visibility: event.visibility || 'fair',
            magnitude: event.magnitude,
            constellation: event.constellation,
            source: event.source || 'API',
            icon: getEventIcon(event.type || 'star'),
            expertAdvice: event.expertAdvice || {},
            publishedAt: event.publishedAt // Added for new_code
          }))
          setTonightEvents(events)
          
          if (data.data.weather) {
            setWeather(data.data.weather)
          }
          if (data.data.date) {
            setFetchDate(data.data.date)
          }
        } else {
          const defaultEvents: CelestialEvent[] = [
            {
              id: '1',
              name: 'Jupiter Opposition',
              type: 'planet',
              description: 'Jupiter reaches its best viewing position tonight with magnitude -2.9',
              bestTime: '20:30 - 22:00',
              visibility: 'excellent',
              source: 'System Default',
              icon: <Telescope className="w-5 h-5" />,
              expertAdvice: {
                observationTips: "Look for Jupiter's distinctive cloud belts and moons. Use a telescope for better detail.",
                scienceInsight: "Jupiter is the largest planet in our solar system, known for its Great Red Spot and numerous moons.",
                difficulty: "Intermediate",
                safetyTips: "Avoid direct eye observation of the Great Red Spot without proper eye protection."
              },
              publishedAt: '2023-10-26' // Added for new_code
            },
            {
              id: '2',
              name: 'First Quarter Moon',
              type: 'moon',
              description: 'The moon shows a perfect half-circle, ideal for observing lunar surface details',
              bestTime: '19:00 - 21:00',
              visibility: 'good',
              source: 'System Default',
              icon: <Moon className="w-5 h-5" />,
              expertAdvice: {
                observationTips: "Use a small telescope or binoculars to see the lunar surface features.",
                scienceInsight: "The Moon's surface is covered in craters, mountains, and seas, revealing Earth's past.",
                difficulty: "Beginner",
                safetyTips: "No special safety precautions needed for this event."
              },
              publishedAt: '2023-10-26' // Added for new_code
            },
            {
              id: '3',
              name: 'Perseid Meteor Shower',
              type: 'meteor',
              description: '10-15 meteors per hour visible, recommend viewing away from urban light pollution',
              bestTime: '23:00 - 02:00',
              visibility: 'fair',
              source: 'System Default',
              icon: <Sparkles className="w-5 h-5" />,
              expertAdvice: {
                observationTips: "Find a dark location away from city lights. Use a comfortable chair or blanket.",
                scienceInsight: "Meteor showers are caused by Earth passing through the debris trail of a comet.",
                difficulty: "Intermediate",
                safetyTips: "Always use a safe location and proper eye protection."
              },
              publishedAt: '2023-10-26' // Added for new_code
            }
          ]
          setTonightEvents(defaultEvents)
        }
      } catch (error) {
        console.error('Failed to fetch celestial data:', error)
        const defaultEvents: CelestialEvent[] = [
          {
            id: '1',
            name: 'Jupiter Opposition',
            type: 'planet',
            description: 'Jupiter reaches its best viewing position tonight with magnitude -2.9',
            bestTime: '20:30 - 22:00',
            visibility: 'excellent',
            source: 'System Default',
            icon: <Telescope className="w-5 h-5" />,
            expertAdvice: {
              observationTips: "Look for Jupiter's distinctive cloud belts and moons. Use a telescope for better detail.",
              scienceInsight: "Jupiter is the largest planet in our solar system, known for its Great Red Spot and numerous moons.",
              difficulty: "Intermediate",
              safetyTips: "Avoid direct eye observation of the Great Red Spot without proper eye protection."
            },
            publishedAt: '2023-10-26' // Added for new_code
          },
          {
            id: '2',
            name: 'First Quarter Moon',
            type: 'moon',
            description: 'The moon shows a perfect half-circle, ideal for observing lunar surface details',
            bestTime: '19:00 - 21:00',
            visibility: 'good',
            source: 'System Default',
            icon: <Moon className="w-5 h-5" />,
            expertAdvice: {
              observationTips: "Use a small telescope or binoculars to see the lunar surface features.",
              scienceInsight: "The Moon's surface is covered in craters, mountains, and seas, revealing Earth's past.",
              difficulty: "Beginner",
              safetyTips: "No special safety precautions needed for this event."
            },
            publishedAt: '2023-10-26' // Added for new_code
          },
          {
            id: '3',
            name: 'Perseid Meteor Shower',
            type: 'meteor',
            description: '10-15 meteors per hour visible, recommend viewing away from urban light pollution',
            bestTime: '23:00 - 02:00',
            visibility: 'fair',
            source: 'System Default',
            icon: <Sparkles className="w-5 h-5" />,
            expertAdvice: {
              observationTips: "Find a dark location away from city lights. Use a comfortable chair or blanket.",
              scienceInsight: "Meteor showers are caused by Earth passing through the debris trail of a comet.",
              difficulty: "Intermediate",
              safetyTips: "Always use a safe location and proper eye protection."
            },
            publishedAt: '2023-10-26' // Added for new_code
          }
        ]
        setTonightEvents(defaultEvents)
      } finally {
        setLoading(false)
      }
    }

    fetchTonightEvents()
  }, [])

  // 删除与weeklySummary、weeklyEvents、weeklyLoading、fetchWeeklySummary等相关的所有代码和展示

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'planet': return <GlowingGradientIcon icon={<Telescope />} gradient="blue" />
      case 'moon': return <GlowingGradientIcon icon={<Moon />} gradient="blue" />
      case 'meteor': return <GlowingGradientIcon icon={<Sparkles />} gradient="blue" />
      case 'star': return <GlowingGradientIcon icon={<Star />} gradient="blue" />
      case 'comet': return <GlowingGradientIcon icon={<Sparkles />} gradient="blue" />
      case 'eclipse': return <GlowingGradientIcon icon={<Moon />} gradient="blue" />
      case 'satellite': return <GlowingGradientIcon icon={<Telescope />} gradient="blue" />
      default: return <GlowingGradientIcon icon={<Telescope />} gradient="blue" />
    }
  }

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case 'excellent': return 'bg-blue-700'
      case 'good': return 'bg-blue-700'
      case 'fair': return 'bg-blue-700'
      case 'poor': return 'bg-blue-700'
      default: return 'bg-gray-500'
    }
  }

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Astrophysicist",
      content: "Star Collector has revolutionized how I plan my observation sessions. The AI-powered insights are incredibly accurate.",
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Amateur Astronomer",
      content: "The wallpaper studio is amazing! I've created stunning backgrounds that showcase the beauty of our universe.",
      avatar: "MR"
    },
    {
      name: "Emily Watson",
      role: "Science Educator",
      content: "Perfect for teaching astronomy. The AI Q&A helps students understand complex concepts easily.",
      avatar: "EW"
    }
  ]

  const features = [
    {
      icon: <Telescope className="w-8 h-8" />,
      title: "Tonight's Celestial Events",
      description: "Get real-time updates on what's visible in your sky tonight, including planets, stars, and meteor showers."
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "AI Astronomy Assistant",
      description: "Ask any question about space and get instant, accurate answers powered by advanced AI technology."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "AI Wallpaper Studio",
      description: "Create stunning space-themed wallpapers with our AI-powered design tools and celestial imagery."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Location Support",
      description: "Get personalized celestial data for any location worldwide with accurate weather and light pollution data."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Features",
      description: "Connect with fellow astronomy enthusiasts and share your observations and discoveries."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Updates",
      description: "Stay informed with live updates on celestial events, weather conditions, and viewing opportunities."
    }
  ]

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      features: [
        "1 wallpaper generation per day",
        "Basic AI Q&A",
        "Stargazing alerts preview",
        "Community support"
      ],
      cta: "Current Plan",
      popular: false
    },
    {
      name: "Plus",
      price: "$4.99",
      period: "/month",
      features: [
        "Unlimited wallpaper generation",
        "GPT-4o AI Q&A",
        "Personalized stargazing alerts",
        "Priority customer support",
        "No watermark downloads",
        "Advanced style options"
      ],
      cta: "Choose Plan",
      popular: true
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/month",
      features: [
        "All Plus features",
        "Commercial wallpaper license",
        "API access",
        "Dedicated support",
        "Batch generation",
        "Advanced analytics",
        "Custom model training"
      ],
      cta: "Choose Plan",
      popular: false
    }
  ]

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const maxDayLength = Math.max(...weekDays.map(day => day.length));
  const cardMinWidth = `${maxDayLength + 2}em`;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-relaxed">
              Explore the Universe
              <span className="block text-transparent bg-gradient-to-r from-blue-700 via-indigo-800 to-blue-900 bg-clip-text leading-normal">
                Tonight
              </span>
                </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Your all-in-one astronomy portal featuring real-time celestial alerts, AI-powered Q&A, and stunning space wallpaper creation.
            </p>
            
            {/* Location Selection */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <GlowingGradientIcon icon={<MapPin />} gradient="blue" />
              <span className="text-white">{location}</span>
                        <Button
                variant="ghost" 
                          size="sm"
                className="text-blue-400 hover:text-blue-300"
                onClick={() => setShowCityModal(true)}
                        >
                Change City
                        </Button>
                      </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/ask">
                <Button size="lg" className="bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white px-8 py-3">
                  Start Exploring
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/studio">
                <Button variant="outline" size="lg" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3">
                  <Palette className="mr-2 w-5 h-5" />
                  Create Wallpaper
                </Button>
              </Link>
            </div>
          </div>

          {/* Tonight's Best Viewing Window */}
          <Card className="bg-black/40 backdrop-blur-sm border-blue-800/40 shadow-2xl max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-6 h-6 text-transparent bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text" />
                Tonight's Best Viewing Window
              </CardTitle>
              {/* 抓取时间已移除 */}
            </CardHeader>
            <CardContent>
              {loading ? (
                        <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-transparent bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-border mx-auto"></div>
                  <p className="text-gray-400 mt-2">Fetching tonight's celestial data...</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {tonightEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex flex-col gap-2 p-4 bg-white/5 rounded-lg border border-blue-800/40 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>{event.icon}</div>
                          <div>
                            <h3 className="text-white font-semibold">{event.name}</h3>
                            {/* 发布时间已移除 */}
                            <p className="text-gray-400 text-sm">{event.description}</p>
                            {event.source && (
                              <p className="text-gray-500 text-xs mt-1">Source: {event.source}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right min-w-[80px]">
                          <p className="text-white text-sm font-medium">{event.bestTime}</p>
                          <Badge className={`bg-blue-700 text-white border-0`}>
                            {event.visibility === 'excellent' && 'Excellent'}
                            {event.visibility === 'good' && 'Good'}
                            {event.visibility === 'fair' && 'Fair'}
                            {event.visibility === 'poor' && 'Poor'}
                          </Badge>
                        </div>
                      </div>
                      {/* 专家建议区块 */}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="bg-blue-800/30" />

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need for Astronomy</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From beginner stargazers to professional astronomers, Star Collector has the tools you need to explore the cosmos.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 max-w-4xl w-full">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white/5 backdrop-blur-sm border-blue-800/40 text-white hover:bg-white/10 transition-all duration-300 max-w-sm">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-300">Start free and upgrade as you explore deeper into the cosmos</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                         {pricingPlans.map((plan, index) => (
               <Card key={index} className={`bg-white/10 backdrop-blur-sm border-white/20 text-white relative ${
                 plan.popular ? 'border-blue-700/50 bg-blue-700/10' : ''
               }`}>
                 {plan.popular && (
                   <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                     <Badge className="bg-blue-700 text-white">Most Popular</Badge>
                   </div>
                 )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                                     <Button 
                     className={`w-full ${
                       plan.popular 
                         ? 'bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950' 
                         : 'bg-white/10 hover:bg-white/20'
                     }`}
                   >
                     {plan.cta}
                   </Button>
                </CardContent>
              </Card>
                            ))}
                        </div>
        </div>
      </section>

      {/* How Star Collector Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How Star Collector Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get started in just three simple steps and begin your astronomical journey
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-700 to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Set Your Location</h3>
              <p className="text-gray-300">
                Enter your city or coordinates to get personalized celestial data for your exact location
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-700 to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Discover Tonight's Events</h3>
              <p className="text-gray-300">
                View real-time updates on planets, stars, meteor showers, and other celestial phenomena
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-700 to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Explore & Create</h3>
              <p className="text-gray-300">
                Use AI tools to learn about space and create stunning astronomical wallpapers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">Everything you need to know about Star Collector</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Is Star Collector free to use?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Yes! Star Collector offers a free tier with basic features. You can upgrade to Pro for unlimited access to all features.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">How accurate is the celestial data?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Our data comes from reliable astronomical databases and is updated in real-time. We use multiple sources to ensure accuracy.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Can I use Star Collector from anywhere in the world?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Absolutely! Star Collector works globally. Just set your location and get personalized celestial data for your area.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">What equipment do I need to use Star Collector?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  No special equipment required! You can use Star Collector with just your smartphone or computer. For actual stargazing, binoculars or a telescope will enhance your experience.
                </p>
                    </CardContent>
                  </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-blue-800/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg flex items-center justify-center">
                  <Telescope className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Star Collector</span>
              </div>
              <p className="text-gray-300 mb-4">
                Your gateway to the cosmos. Discover, learn, and create with the universe.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Tonight's Events</Link></li>
                <li><Link href="/ask" className="hover:text-white transition-colors">AI Q&A</Link></li>
                <li><Link href="/studio" className="hover:text-white transition-colors">Wallpaper Studio</Link></li>
                <li><Link href="/account" className="hover:text-white transition-colors">Account</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="bg-blue-800/30 my-8" />
          
          {/* 删除How Star Collector Works部分下方的Start Your Journey和Learn More按钮相关代码 */}
        </div>
      </footer>

      {/* City Selection Modal */}
      {showCityModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-sm border border-blue-800/40 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">Change Your Location</h3>
            <p className="text-gray-300 mb-4">
              Enter your city name to get personalized celestial data for your location.
            </p>
            <input
              type="text"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              placeholder="Enter city name..."
              className="w-full p-3 bg-white/10 border border-blue-800/40 rounded-lg text-white placeholder-gray-400 mb-4 focus:outline-none focus:border-blue-600"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  if (newCity.trim()) {
                    setLocation(newCity.trim())
                    setShowCityModal(false)
                    setNewCity('')
                  }
                }
              }}
            />
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  if (newCity.trim()) {
                    setLocation(newCity.trim())
                    setShowCityModal(false)
                    setNewCity('')
                  }
                }}
                className="flex-1 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white"
              >
                Update Location
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowCityModal(false)
                  setNewCity('')
                }}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
