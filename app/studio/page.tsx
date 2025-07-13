'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { 
  Download, 
  Palette, 
  Sparkles, 
  Image, 
  Settings,
  Clock,
  Heart,
  Share2,
  Copy,
  RefreshCw
} from 'lucide-react'
import { toast } from 'sonner'

interface GeneratedImage {
  id: string
  url: string
  prompt: string
  style: string
  timestamp: Date
  status: 'generating' | 'completed' | 'failed'
  progress?: number
}

interface StyleOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  prompt: string
}

function GeneratedImagePreview({ img }: { img: { url: string; prompt: string } }) {
  const [imgSize, setImgSize] = useState({ width: 1, height: 1 });
  useEffect(() => {
    if (img.url) {
      const image = new window.Image();
      image.onload = () => {
        setImgSize({ width: image.width, height: image.height });
      };
      image.src = img.url;
    }
  }, [img.url]);
  return (
    <div
      style={{
        maxWidth: 3840,
        maxHeight: 3840,
        aspectRatio: `${imgSize.width} / ${imgSize.height}`,
        background: '#111',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img
        src={img.url}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block'
        }}
        alt={img.prompt}
      />
    </div>
  );
}

export default function StudioPage() {
  const [prompt, setPrompt] = useState('')
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<'1:1' | '9:16' | '16:9'>('1:1')
  const [selectedResolution, setSelectedResolution] = useState('standard')

  // 当比例改变时，重置清晰度为standard
  const handleAspectRatioChange = (ratio: string) => {
    setSelectedAspectRatio(ratio as '1:1' | '9:16' | '16:9')
    setSelectedResolution('standard')
  }
  const [customStyle, setCustomStyle] = useState('')
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [remainingFree, setRemainingFree] = useState(10) // 增加免费额度用于测试
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 比例选项
  const aspectRatioOptions = [
    { id: '1:1', name: 'Square (1:1)', description: 'Square' },
    { id: '9:16', name: 'Portrait (9:16)', description: 'Portrait' },
    { id: '16:9', name: 'Landscape (16:9)', description: 'Landscape' }
  ]

  // 恢复分辨率映射
  const resolutionMap = {
    '1:1': { width: 1024, height: 1024 },
    '9:16': { width: 768, height: 1024 },
    '16:9': { width: 1024, height: 768 }
  }

  // 检测提示词中的分辨率信息
  const detectResolutionFromPrompt = (promptText: string) => {
    const text = promptText.toLowerCase()
    
    // 检测比例
    if (text.includes('1:1') || text.includes('square') || text.includes('正方形')) {
      setSelectedAspectRatio('1:1')
    } else if (text.includes('9:16') || text.includes('portrait') || text.includes('竖屏')) {
      setSelectedAspectRatio('9:16')
    } else if (text.includes('16:9') || text.includes('landscape') || text.includes('横屏')) {
      setSelectedAspectRatio('16:9')
    }
    
    // 所有清晰度都使用standard
    setSelectedResolution('standard')
  }

  const handleGenerate = async () => {
    if (isGenerating) return; // 防止并发
    if (!prompt.trim()) {
      toast.error('Please enter a description')
      return
    }

    if (remainingFree <= 0) {
      toast.error('Daily free generation limit reached. Please upgrade to Plus version')
      return
    }

    // 检测提示词中的分辨率信息
    detectResolutionFromPrompt(prompt)

    // 根据比例选择分辨率
    const size = resolutionMap[selectedAspectRatio]
    const fullPrompt = `${prompt}, ${customStyle}`.trim()

    const newImage: GeneratedImage = {
      id: Date.now().toString(),
      url: '',
      prompt: fullPrompt,
      style: `${selectedAspectRatio}`,
      timestamp: new Date(),
      status: 'generating',
      progress: 0
    }

    setGeneratedImages([newImage]) // 只保留最新一条生成记录
    setIsGenerating(true)
    setRemainingFree(prev => prev - 1)

    // 伪进度条动画
    let fakeProgress = 0
    const progressInterval = setInterval(() => {
      fakeProgress += Math.random() * 8 + 2 // 每次递增2-10%
      if (fakeProgress >= 95) fakeProgress = 95
      setGeneratedImages(prev => prev.map(img =>
        img.id === newImage.id ? { ...img, progress: fakeProgress } : img
      ))
    }, 200)

    try {
      // 调用AI壁纸生成API，传递分辨率
      const response = await fetch('/api/space-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          width: size.width,
          height: size.height
        })
      })

      const data = await response.json()

      if (response.ok && data.success && data.url) {
        clearInterval(progressInterval)
        setGeneratedImages(prev => prev.map(img =>
          img.id === newImage.id
            ? { ...img, url: data.url, status: 'completed', progress: 100 }
            : img
        ))
        setIsGenerating(false)
        toast.success('Wallpaper generated successfully!')
      } else {
        throw new Error(data.error || '图片生成服务暂时不可用')
      }
    } catch (error) {
      clearInterval(progressInterval)
      setGeneratedImages(prev => prev.map(img =>
        img.id === newImage.id
          ? { ...img, status: 'failed', progress: 100 }
          : img
      ))
      setIsGenerating(false)
      toast.error('Image generation service temporarily unavailable')
    }
  }

  // 复制图片到剪贴板
  const handleCopyImage = async (image: GeneratedImage) => {
    if (!image.url) return
    
    try {
      // 创建一个临时的canvas来复制图片
      const img = new window.Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = async () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          canvas.toBlob(async (blob) => {
            if (blob) {
              try {
                await navigator.clipboard.write([
                  new ClipboardItem({
                    [blob.type]: blob
                  })
                ])
                toast.success('Image copied to clipboard')
              } catch (error) {
                // 如果ClipboardItem不支持，尝试复制图片链接
                await navigator.clipboard.writeText(image.url)
                toast.success('Image link copied to clipboard')
              }
            }
          })
        }
      }
      
      img.onerror = async () => {
        // 如果图片加载失败，复制链接
        await navigator.clipboard.writeText(image.url)
        toast.success('Image link copied to clipboard')
      }
      
      img.src = image.url
    } catch (error) {
              toast.error('Copy failed')
    }
  }

  // 下载图片
  const handleDownload = async (image: GeneratedImage) => {
    if (!image.url) return
    
    try {
      const response = await fetch(image.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `star-collector-${Date.now()}.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
              toast.success('Image downloaded successfully')
    } catch (error) {
              toast.error('Download failed')
    }
  }

  // 分享图片
  const handleShare = async (image: GeneratedImage) => {
    if (!image.url) return
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Star Collector - AI Generated Wallpaper',
          text: `Check out this amazing space wallpaper: ${image.prompt}`,
          url: image.url
        })
      } else {
        // Fallback: 复制图片链接
        await navigator.clipboard.writeText(image.url)
        toast.success('Image link copied to clipboard')
      }
    } catch (error) {
      toast.error('分享失败')
    }
  }

  // 重新生成
  const handleRegenerate = async (image: GeneratedImage) => {
    if (isGenerating) return
    
    // 直接使用当前输入框中的prompt重新生成
    // 这样可以保持用户当前的输入和设置
    if (!prompt.trim()) {
      toast.error('Please enter a description first')
      return
    }
    
    await handleGenerate()
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  // 重置免费额度（仅用于开发测试）
  const resetFreeCredits = () => {
    setRemainingFree(10)
            toast.success('Free credits reset successfully')
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Wallpaper Studio
          </h1>
          <p className="text-gray-300">
            Transform your imagination into unique cosmic wallpapers
          </p>
          {/* 删除顶部 Daily Free Credits 显示，只保留右侧卡片内的 */}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 左侧创作区域 */}
          <div className="space-y-6">
            <Card className="bg-black/40 backdrop-blur-sm border-indigo-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text" />
                  Creation Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 描述输入 */}
                <div className="space-y-3">
                  <Label htmlFor="prompt" className="text-white">
                    Describe your wallpaper
                  </Label>
                  <Textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A purple nebula dotted with twinkling stars, with blue gas clouds in the distance..."
                    className="bg-white/10 border-indigo-500/30 text-white placeholder:text-gray-400 min-h-[100px]"
                  />
                  
                  {/* 快速选择 */}
                  <div className="space-y-2">
                    <Label className="text-white text-sm">Quick Suggestions</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        "A vibrant purple nebula with swirling gas clouds and distant stars",
                        "A spiral galaxy with golden arms and a bright central core",
                        "A cosmic landscape with multiple planets and asteroid fields",
                        "A deep space scene with colorful nebulae and star clusters",
                        "A futuristic space station orbiting a ringed planet",
                        "A cosmic storm with lightning and dark matter clouds"
                      ].map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setPrompt(suggestion)}
                          className="text-left p-2 text-xs text-gray-300 hover:text-white hover:bg-indigo-500/10 rounded border border-indigo-500/20 hover:border-indigo-500/40 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 自定义风格 */}
                <div className="space-y-2">
                  <Label htmlFor="customStyle" className="text-white">
                    Custom Style (Optional)
                  </Label>
                  <Input
                    id="customStyle"
                    value={customStyle}
                    onChange={(e) => setCustomStyle(e.target.value)}
                    placeholder="e.g., cinematic quality, dreamy colors, artistic style..."
                    className="bg-white/10 border-indigo-500/30 text-white placeholder:text-gray-400"
                  />
                </div>

                {/* 生成按钮 */}
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim() || remainingFree <= 0}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Start Generation
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 右侧生成队列 */}
          <div>
            <Card className="bg-black/40 backdrop-blur-sm border-indigo-500/30 relative">
              {/* Daily Free Credits 右上角浮层 */}
              <div className="absolute top-4 right-4 z-20 bg-white/90 text-blue-700 text-xs font-bold px-3 py-1 rounded shadow">
                Daily Free Credits: {remainingFree}
              </div>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text" />
                  Generation Queue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generatedImages.length === 0 ? (
                    <div className="text-center py-12">
                      <Image className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">No wallpapers generated yet</p>
                      <p className="text-gray-500 text-sm">Enter a description on the left to start creating</p>
                    </div>
                  ) : (
                    generatedImages.map(img => (
                      <div key={img.id} className="relative bg-white/10 border border-indigo-500/30 rounded-lg p-4 flex flex-col items-center mb-4">
                        {/* 生成中进度条 */}
                        {img.status === 'generating' && (
                          <>
                            <div className="w-full h-2 bg-gray-700 rounded mt-2 overflow-hidden">
                              <div
                                className="h-2 transition-all duration-200 bg-gradient-to-r from-indigo-500 to-blue-500"
                                style={{ width: `${img.progress ?? 0}%` }}
                              />
                            </div>
                            <div className="text-xs text-gray-300 mt-1">Generating... {Math.floor(img.progress ?? 0)}%</div>
                          </>
                        )}
                        {/* 生成失败进度条 */}
                        {img.status === 'failed' && (
                          <>
                            <div className="w-full h-2 bg-gray-700 rounded mt-2 overflow-hidden">
                              <div
                                className="h-2 bg-red-500 transition-all duration-200"
                                style={{ width: '100%' }}
                              />
                            </div>
                            <div className="text-xs text-red-400 mt-1">Generation failed</div>
                            {/* 失败时重新生成按钮 */}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRegenerate(img)}
                              className="mt-2 border-red-500/30 text-red-300 hover:bg-red-500/10 text-xs"
                            >
                              <RefreshCw className="w-3 h-3 mr-1" />
                              Regenerate
                            </Button>
                          </>
                        )}
                        {/* 生成完成显示图片 */}
                        {img.status === 'completed' && img.url && (
                          <GeneratedImagePreview img={img} />
                        )}
                        {/* 操作按钮 */}
                        <div className="flex flex-wrap gap-2 mt-3 justify-center">
                          <Button
                            size="sm"
                            onClick={() => handleDownload(img)}
                            className="bg-green-600 hover:bg-green-700 text-xs"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopyImage(img)}
                            className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 text-xs"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleShare(img)}
                            className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 text-xs"
                          >
                            <Share2 className="w-3 h-3 mr-1" />
                            Share
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRegenerate(img)}
                            className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 text-xs"
                          >
                            <RefreshCw className="w-3 h-3 mr-1" />
                            Regenerate
                          </Button>
                        </div>
                        {/* 其他信息 */}
                        <div className="text-xs text-gray-400 mt-2 line-clamp-2 text-center">{img.prompt}</div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 