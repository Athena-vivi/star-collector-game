import { NextRequest, NextResponse } from 'next/server'

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
  coordinates?: {
    ra: number
    dec: number
  }
}

interface WeatherData {
  condition: string
  cloudCover: number
  humidity: number
  visibility: number
  lightPollution: 'low' | 'medium' | 'high'
}

interface CosmicPingResponse {
  location: {
    city: string
    lat: number
    lng: number
    timezone: string
  }
  date: string
  events: CelestialEvent[]
  weather: WeatherData
  summary: {
    totalEvents: number
    bestEvent?: CelestialEvent
    recommendations: string[]
  }
}

// 通用fetch超时工具
function fetchWithTimeout(promise: Promise<any>, ms = 5000, fallback: any = undefined) {
  return Promise.race([
    promise,
    new Promise(resolve => setTimeout(() => resolve(fallback), ms))
  ])
}

// NASA APOD API
async function fetchNASAData(): Promise<any[]> {
  try {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5')
    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('NASA API Error:', error)
    return []
  }
}

// Heavens-Above RSS Feed
async function fetchHeavensAboveData(): Promise<any[]> {
  try {
    // 使用RSS解析器获取Heavens-Above数据
    const response = await fetch('https://www.heavens-above.com/rss.aspx?satid=25544&lat=39.9042&lng=116.4074&alt=0&tz=ChST')
    const text = await response.text()
    
    // 简单的RSS解析（实际项目中应使用专门的RSS解析库）
    const events: any[] = []
    const lines = text.split('\n')
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line.includes('<title>') && !line.includes('Heavens-Above')) {
        const title = line.replace(/<[^>]*>/g, '').trim()
        if (title && title.length > 5) {
          events.push({
            title,
            source: 'Heavens-Above',
            type: 'satellite'
          })
        }
      }
    }
    
    return events
  } catch (error) {
    console.error('Heavens-Above RSS Error:', error)
    return []
  }
}

// Minor Planet Center Data
async function fetchMPCData(): Promise<any[]> {
  try {
    // MPC提供小行星和彗星数据
    const response = await fetch('https://minorplanetcenter.net/data')
    const text = await response.text()
    
    // 解析MPC数据（简化处理）
    const events: any[] = []
    const lines = text.split('\n')
    
    for (const line of lines) {
      if (line.includes('COMET') || line.includes('ASTEROID')) {
        events.push({
          title: line.substring(0, 50).trim(),
          source: 'MPC',
          type: line.includes('COMET') ? 'comet' : 'asteroid'
        })
      }
    }
    
    return events.slice(0, 5) // 只取前5个
  } catch (error) {
    console.error('MPC API Error:', error)
    return []
  }
}

// 天气数据获取
async function fetchWeatherData(lat: number, lng: number): Promise<WeatherData> {
  try {
    const weatherApiKey = process.env.WEATHER_API_KEY || 'demo_key'
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherApiKey}&units=metric`
    )
    const data = await response.json()
    
    return {
      condition: data.weather?.[0]?.main || 'Clear',
      cloudCover: data.clouds?.all || 0,
      humidity: data.main?.humidity || 50,
      visibility: data.visibility || 10000,
      lightPollution: getLightPollutionLevel(lat, lng)
    }
  } catch (error) {
    console.error('Weather API Error:', error)
    return {
      condition: 'Clear',
      cloudCover: 20,
      humidity: 50,
      visibility: 10000,
      lightPollution: 'medium'
    }
  }
}

// 光污染评估
function getLightPollutionLevel(lat: number, lng: number): 'low' | 'medium' | 'high' {
  // Simplified light pollution assessment
  // In production, use professional light pollution map data
  const urbanAreas = [
    { lat: 40.7128, lng: -74.0060, level: 'high' }, // New York
    { lat: 34.0522, lng: -118.2437, level: 'high' }, // Los Angeles
    { lat: 41.8781, lng: -87.6298, level: 'high' }, // Chicago
  ]
  
  for (const area of urbanAreas) {
    const distance = Math.sqrt(
      Math.pow(lat - area.lat, 2) + Math.pow(lng - area.lng, 2)
    )
    if (distance < 0.5) {
      return area.level as 'low' | 'medium' | 'high'
    }
  }
  
  return 'medium'
}

// 使用Claude-3-Haiku生成摘要
async function generateSummary(events: any[], weather: WeatherData): Promise<string> {
  try {
    const openrouterKey = process.env.CLAUDE_HAIKU_API_KEY
    if (!openrouterKey) {
      return generateFallbackSummary(events, weather)
    }
    
    const prompt = `
As an astronomy expert, please generate a summary of about 150 words for tonight's stargazing activities.

Tonight's celestial events:
${events.map(e => `- ${e.name || e.title}: ${e.description || 'Visible'}`).join('\n')}

Weather conditions:
- Weather: ${weather.condition}
- Cloud cover: ${weather.cloudCover}%
- Visibility: ${weather.visibility}m
- Light pollution: ${weather.lightPollution}

Please provide stargazing recommendations for amateur astronomers in clear, accessible language.
`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openrouterKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    })

    const data = await response.json()
    return data.choices?.[0]?.message?.content || generateFallbackSummary(events, weather)
  } catch (error) {
    console.error('AI Summary Error:', error)
    return generateFallbackSummary(events, weather)
  }
}

// Fallback summary generation
function generateFallbackSummary(events: any[], weather: WeatherData): string {
  const eventCount = events.length
  const bestEvent = events.find(e => e.visibility === 'excellent')
  
  let summary = `Tonight there are ${eventCount} celestial events worth observing.`
  
  if (bestEvent) {
    summary += ` Among them, ${bestEvent.name} has the best viewing conditions, recommended for observation at ${bestEvent.bestTime}.`
  }
  
  if (weather.cloudCover < 30) {
    summary += ' Tonight\'s weather is clear with minimal cloud cover, perfect for stargazing.'
  } else if (weather.cloudCover < 70) {
    summary += ' Tonight has moderate cloud cover, suggest choosing times with less cloud coverage for observation.'
  } else {
    summary += ' Tonight has heavy cloud cover, poor viewing conditions, suggest trying another day.'
  }
  
  if (weather.lightPollution === 'low') {
    summary += ' Light pollution is minimal, great time to observe faint objects.'
  } else if (weather.lightPollution === 'high') {
    summary += ' Urban light pollution is heavy, recommend observing bright objects.'
  }
  
  return summary
}

// 处理天象数据
function processEvents(nasaData: any[], heavensData: any[], mpcData: any[]): CelestialEvent[] {
  const events: CelestialEvent[] = []
  
  // 处理NASA数据
  nasaData.forEach((item, index) => {
    if (item.title && item.explanation) {
      events.push({
        id: `nasa_${index}`,
        name: item.title,
        type: 'star',
        description: item.explanation.substring(0, 100) + '...',
        bestTime: '20:00 - 22:00',
        visibility: 'good',
        source: 'NASA APOD'
      })
    }
  })
  
  // 处理Heavens-Above数据
  heavensData.forEach((item, index) => {
    if (item.title) {
      events.push({
        id: `ha_${index}`,
        name: item.title,
        type: 'satellite',
        description: 'Satellite transit observation opportunity',
        bestTime: '19:30 - 21:30',
        visibility: 'fair',
        source: 'Heavens-Above'
      })
    }
  })
  
  // 处理MPC数据
  mpcData.forEach((item, index) => {
    if (item.title) {
      events.push({
        id: `mpc_${index}`,
        name: item.title,
        type: item.type as any,
        description: `${item.type === 'comet' ? 'Comet' : 'Asteroid'} observation opportunity`,
        bestTime: '21:00 - 23:00',
        visibility: 'fair',
        source: 'MPC'
      })
    }
  })
  
  // Add default events if data is insufficient
  if (events.length < 3) {
    const defaultEvents: CelestialEvent[] = [
      {
        id: 'default_1',
        name: 'Jupiter Opposition',
        type: 'planet',
        description: 'Jupiter reaches its best viewing position tonight with magnitude -2.9',
        bestTime: '20:30 - 22:00',
        visibility: 'excellent',
        magnitude: -2.9,
        constellation: 'Pisces',
        source: 'System Default'
      },
      {
        id: 'default_2',
        name: 'First Quarter Moon',
        type: 'moon',
        description: 'The moon shows a perfect half-circle, ideal for observing lunar surface details',
        bestTime: '19:00 - 21:00',
        visibility: 'good',
        source: 'System Default'
      }
    ]
    events.push(...defaultEvents.slice(0, 3 - events.length))
  }
  
  return events.slice(0, 5) // 最多返回5个事件
}

// 使用Claude-3-Haiku生成摘要
async function generateSummaryWithTimeout(events: any[], weather: WeatherData, ms = 5000): Promise<string> {
  return Promise.race([
    generateSummary(events, weather),
    new Promise<string>(resolve => setTimeout(() => resolve(generateFallbackSummary(events, weather)), ms))
  ])
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = parseFloat(searchParams.get('lat') || '39.9042')
    const lng = parseFloat(searchParams.get('lng') || '116.4074')
    const city = searchParams.get('city') || 'New York'

    console.log(`🌌 Fetching celestial data for: ${city} (${lat}, ${lng})`)

    // 并发+超时获取所有数据源
    const [nasaData, heavensData, mpcData, weather] = await Promise.all([
      fetchWithTimeout(fetchNASAData(), 5000, []),
      fetchWithTimeout(fetchHeavensAboveData(), 5000, []),
      fetchWithTimeout(fetchMPCData(), 5000, []),
      fetchWithTimeout(fetchWeatherData(lat, lng), 5000, {
        condition: 'Clear',
        cloudCover: 20,
        humidity: 50,
        visibility: 10000,
        lightPollution: 'medium'
      })
    ])

    // 处理天象数据
    const events = processEvents(nasaData, heavensData, mpcData)
    // AI摘要加超时
    const summary = await generateSummaryWithTimeout(events, weather, 5000)

    const response: CosmicPingResponse = {
      location: {
        city,
        lat,
        lng,
        timezone: 'America/New_York'
      },
      date: new Date().toISOString(),
      events,
      weather,
      summary: {
        totalEvents: events.length,
        bestEvent: events.find(e => e.visibility === 'excellent'),
        recommendations: [summary]
      }
    }

    return NextResponse.json({
      success: true,
      data: response
    })
  } catch (error) {
    console.error('Cosmic-Ping API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch celestial data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// CRON定时任务处理
export async function POST(request: NextRequest) {
  try {
    const { cron, action } = await request.json()
    
    if (action === 'daily_update') {
      // Daily update at 10 AM UTC
      console.log('🕐 Executing daily celestial data update')
      
      // Add scheduled task logic here
      // Such as sending email notifications, updating cache, etc.
      
      return NextResponse.json({
        success: true,
        message: 'Daily update task executed successfully'
      })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Unknown scheduled task type'
    })
  } catch (error) {
    console.error('CRON Task Error:', error)
    return NextResponse.json(
      { success: false, error: 'Scheduled task execution failed' },
      { status: 500 }
    )
  }
} 