import { NextResponse } from 'next/server'
import { OpenRouterClient, API_KEYS } from '@/lib/openrouter'

export async function GET() {
  try {
    // 模拟一周天象事件（实际可对接数据库或外部API）
    const weekEvents = [
      { day: 'Monday', event: 'Jupiter opposition, best viewing at 21:00.' },
      { day: 'Tuesday', event: 'First quarter moon, ideal for lunar observation.' },
      { day: 'Wednesday', event: 'Mars visible in the east after midnight.' },
      { day: 'Thursday', event: 'Perseid meteor shower peaks, up to 20 meteors/hour.' },
      { day: 'Friday', event: 'Saturn at highest point, visible all night.' },
      { day: 'Saturday', event: 'Clear skies, good for deep sky objects.' },
      { day: 'Sunday', event: 'Partial lunar eclipse visible before dawn.' },
    ]
    const eventsText = weekEvents.map(e => `${e.day}: ${e.event}`).join('\n')

    // 用AI生成本周天象综述
    const client = new OpenRouterClient(API_KEYS.GPT4O)
    const prompt = `Summarize the following weekly celestial events for astronomy enthusiasts in 2-3 sentences, highlighting the most exciting phenomena and best viewing opportunities.\n\n${eventsText}`
    const response = await client.chat('openai/gpt-4o', [
      { role: 'system', content: 'You are an expert astronomy event summarizer.' },
      { role: 'user', content: prompt }
    ], { max_tokens: 200 })
    const summary = response.choices[0].message.content

    return NextResponse.json({
      summary,
      weekEvents
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate weekly celestial summary.' }, { status: 500 })
  }
} 