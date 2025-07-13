'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Clock,
  MessageSquare,
  Lightbulb,
  BookOpen
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  links?: string[]
  images?: string[]
}

interface QuickQuestion {
  id: string
  text: string
  icon: React.ReactNode
}

export default function AskPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your cosmic exploration assistant. I can answer any questions about astronomy, the universe, planets, stars, galaxies, and more. I\'ll explain complex scientific concepts in simple, easy-to-understand language.',
      timestamp: new Date(),
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [freeAskCount, setFreeAskCount] = useState(5);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const key = `ai_ask_count_${today}`;
    setFreeAskCount(5 - parseInt(typeof window !== 'undefined' ? localStorage.getItem(key) || "0" : "0", 10));
  }, []);

  // 每次提问后更新剩余次数
  const updateFreeAskCount = () => {
    const today = new Date().toISOString().slice(0, 10);
    const key = `ai_ask_count_${today}`;
    setFreeAskCount(5 - parseInt(localStorage.getItem(key) || "0", 10));
  };

  const quickQuestions: QuickQuestion[] = [
    {
      id: '1',
      text: 'Why does the moon have craters?',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      id: '2',
      text: 'What is a black hole?',
      icon: <Lightbulb className="w-4 h-4" />
    },
    {
      id: '3',
      text: 'How many planets are in the solar system?',
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: '4',
      text: 'What is dark matter?',
      icon: <MessageSquare className="w-4 h-4" />
    }
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const today = new Date().toISOString().slice(0, 10);
    const key = `ai_ask_count_${today}`;
    const count = parseInt(localStorage.getItem(key) || "0", 10);
    if (count >= 5) {
      alert("You have used all your free credits for today.");
      return;
    }
    localStorage.setItem(key, (count + 1).toString());
    updateFreeAskCount();

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ask-universe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: content.trim(),
          userId: 'user123',
          subscription: 'free'
        })
      })

      const data = await response.json()
      console.log('API返回内容', data)

      const answer = data?.data?.answer || data?.answer
      if (data.success && answer) {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: answer,
          timestamp: new Date(),
          links: (data.data && data.data.links) || data.links || [],
          images: (data.data && data.data.images) || data.images || []
        }
        setMessages(prev => [...prev, aiResponse])
      } else {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: 'AI temporarily cannot answer this question, please try again later or ask a different question.',
          timestamp: new Date(),
          links: [],
          images: []
        }
        setMessages(prev => [...prev, aiResponse])
      }
    } catch (error) {
      console.error('AI Q&A request failed:', error)
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateMockResponse(content),
        timestamp: new Date(),
        links: ['https://en.wikipedia.org/wiki/Astronomy', 'https://www.nasa.gov/'],
        images: []
      }
      setMessages(prev => [...prev, aiResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const generateMockResponse = (question: string): string => {
    const responses = {
      'Why does the moon have craters?': 'The moon\'s craters are primarily formed by meteorite impacts. When asteroids or comets collide with the lunar surface, they create tremendous impact forces that eject material from the surface, forming circular depressions known as craters.\n\nThe size of craters depends on the mass and velocity of the impacting object. Larger impacts can create craters hundreds of kilometers in diameter, while smaller impacts form smaller craters.\n\nInterestingly, Earth also has craters, but due to our atmosphere and geological activity, most have been eroded or buried. The moon has no atmosphere, so craters can be preserved for billions of years.',
      'What is a black hole?': 'Black holes are among the most mysterious objects in the universe. Simply put, a black hole is a region with extremely strong gravity where nothing, not even light, can escape.\n\nBlack holes typically form in two ways:\n1. When massive stars die, their cores collapse to form black holes\n2. Supermassive black holes at the centers of galaxies\n\nBlack holes have three main parts:\n- Event horizon: The "boundary" of the black hole, once crossed there\'s no return\n- Singularity: The center of the black hole, a point of infinite density\n- Accretion disk: A disk of material rotating around the black hole\n\nAlthough black holes seem terrifying, they play crucial roles in cosmic evolution, such as helping galaxies form and maintain their structure.',
      'How many planets are in the solar system?': 'The solar system currently has 8 planets, ordered from closest to farthest from the sun:\n\n1. Mercury - The smallest planet with extreme temperature variations\n2. Venus - The hottest planet with a thick carbon dioxide atmosphere\n3. Earth - Our home, the only known planet with life\n4. Mars - The red planet, scientists believe it may have once had water\n5. Jupiter - The largest planet, famous for its Great Red Spot\n6. Saturn - Known for its beautiful ring system\n7. Uranus - An ice giant with a highly tilted rotation axis\n8. Neptune - The farthest planet with intense storms\n\nIn 2006, Pluto was reclassified as a dwarf planet, so the solar system now has 8 planets instead of 9.',
      'What is dark matter?': 'Dark matter is a mysterious substance in the universe that we cannot directly see, but we can infer its existence through its gravitational effects on other objects.\n\nCharacteristics of dark matter:\n- Does not emit, reflect, or absorb light\n- Only interacts with other matter through gravity\n- Comprises about 27% of the universe\'s total matter\n- Helps galaxies maintain their shape\n\nScientists believe dark matter may be composed of particles we haven\'t discovered yet. Although we haven\'t directly detected dark matter, its existence explains why galaxies rotate faster than expected and why galaxy clusters stay together.'
    }

    return responses[question as keyof typeof responses] || 
      'This is a fascinating question! Let me explain it in simple terms:\n\n[This is where an AI-generated response would provide detailed yet accessible explanations based on your specific question.]\n\nIf you\'d like more in-depth information, I can provide relevant scientific links and references.'
  }

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Explore Cosmic Mysteries
          </h1>
          <p className="text-gray-300">
            Ask AI any astronomy question and get simple, understandable explanations
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* 聊天区域 - 在移动端显示在上方，桌面端显示在右侧 */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <Card className="bg-black/40 backdrop-blur-sm border-blue-500/20 h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Bot className="w-5 h-5 text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text" />
                    AI Cosmic Assistant
                  </CardTitle>
                  {/* 免费额度浮层 */}
                  <div className="ml-auto bg-white/90 text-blue-700 text-xs font-bold px-3 py-1 rounded shadow">
                    Daily Free Credits: {freeAskCount}/5
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {/* 快速问题 */}
                <div className="mb-6">
                  <p className="text-gray-300 text-sm mb-3">Quick Questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((q) => (
                      <Button
                        key={q.id}
                        variant="outline"
                        size="sm"
                        className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
                        onClick={() => handleQuickQuestion(q.text)}
                      >
                        {q.icon}
                        <span className="ml-1">{q.text}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator className="bg-blue-500/20 mb-4" />

                {/* 消息列表 */}
                <ScrollArea className="flex-1 mb-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                          <div className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              message.type === 'user' 
                                ? 'bg-blue-500' 
                                : 'bg-indigo-500'
                            }`}>
                              {message.type === 'user' ? (
                                <User className="w-4 h-4 text-white" />
                              ) : (
                                <Bot className="w-4 h-4 text-white" />
                              )}
                            </div>
                            
                            <div className={`${
                              message.type === 'user' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white/10 text-white'
                            } rounded-lg p-3`}>
                              <p className="whitespace-pre-wrap">{message.content}</p>
                              
                              {message.links && message.links.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-white/20">
                                  <p className="text-sm text-gray-300 mb-2">Related Links:</p>
                                  <div className="space-y-1">
                                    {message.links.map((link, index) => (
                                      <a
                                        key={index}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 text-sm block"
                                      >
                                        {link}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              <p className="text-xs text-gray-400 mt-2">
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-white/10 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-border"></div>
                              <span className="text-gray-300">AI is thinking...</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* 输入框 */}
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                    placeholder="Enter your astronomy question..."
                    className="flex-1 bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                  />
                  <Button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 历史记录 - 在移动端显示在下方，桌面端显示在左侧 */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="bg-black/40 backdrop-blur-sm border-blue-500/20 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text" />
                  Chat History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <div className="space-y-2">
                    {messages.filter(m => m.type === 'user').slice(-5).map((message) => (
                      <div 
                        key={message.id}
                        className="p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                        onClick={() => handleSendMessage(message.content)}
                      >
                        <p className="text-white text-sm truncate">{message.content}</p>
                        <p className="text-gray-400 text-xs mt-1">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 