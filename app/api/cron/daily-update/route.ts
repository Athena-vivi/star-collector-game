import { NextRequest, NextResponse } from 'next/server'

interface DailyUpdateData {
  date: string
  events: any[]
  weather: any
  summary: string
  subscribers: number
}

// 验证CRON请求
function validateCronRequest(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET || 'your-cron-secret'
  
  // 验证Authorization header
  if (authHeader !== `Bearer ${cronSecret}`) {
    return false
  }
  
  // 验证User-Agent（Vercel Cron）
  const userAgent = request.headers.get('user-agent') || ''
  if (!userAgent.includes('Vercel') && !userAgent.includes('cron')) {
    return false
  }
  
  return true
}

// 获取订阅用户列表
async function getSubscribers(): Promise<string[]> {
  // 实际项目中这里会从数据库获取订阅用户
  // 现在返回模拟数据
  return [
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
  ]
}

// 发送邮件通知
async function sendEmailNotification(email: string, data: DailyUpdateData): Promise<boolean> {
  try {
    // 实际项目中这里会集成邮件服务（如SendGrid、Mailgun等）
    console.log(`📧 发送邮件到: ${email}`)
    console.log(`📅 日期: ${data.date}`)
    console.log(`🌌 天象数量: ${data.events.length}`)
    console.log(`📝 摘要: ${data.summary.substring(0, 100)}...`)
    
    // 模拟邮件发送延迟
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return true
  } catch (error) {
    console.error(`邮件发送失败: ${email}`, error)
    return false
  }
}

// 发送Web Push通知
async function sendPushNotification(userId: string, data: DailyUpdateData): Promise<boolean> {
  try {
    // 实际项目中这里会集成Web Push服务
    console.log(`🔔 发送Push通知到用户: ${userId}`)
    console.log(`🌌 今晚有${data.events.length}个天象值得关注`)
    
    return true
  } catch (error) {
    console.error(`Push通知发送失败: ${userId}`, error)
    return false
  }
}

// 更新缓存数据
async function updateCacheData(data: DailyUpdateData): Promise<void> {
  try {
    // 实际项目中这里会更新Redis缓存或数据库
    console.log('💾 更新缓存数据')
    console.log(`📊 缓存${data.events.length}个天象事件`)
    
    // 模拟缓存更新
    await new Promise(resolve => setTimeout(resolve, 200))
  } catch (error) {
    console.error('缓存更新失败:', error)
  }
}

// 生成每日报告
async function generateDailyReport(): Promise<DailyUpdateData> {
  try {
    // Get today's celestial data
    const cosmicPingResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/cosmic-ping?city=New%20York`)
    const cosmicPingData = await cosmicPingResponse.json()
    
    if (!cosmicPingData.success) {
      throw new Error('获取天象数据失败')
    }
    
    return {
      date: new Date().toISOString(),
      events: cosmicPingData.data.events,
      weather: cosmicPingData.data.weather,
      summary: cosmicPingData.data.summary.recommendations[0] || '今晚天气适合观星',
      subscribers: 0 // 实际项目中会从数据库获取
    }
  } catch (error) {
    console.error('生成每日报告失败:', error)
    return {
      date: new Date().toISOString(),
      events: [],
      weather: { condition: 'Unknown' },
      summary: '今日天象数据获取失败',
      subscribers: 0
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    // 验证CRON请求
    if (!validateCronRequest(request)) {
      return NextResponse.json(
        { success: false, error: '未授权的CRON请求' },
        { status: 401 }
      )
    }
    
    console.log('🕐 开始执行每日天象数据更新任务')
    
    // 生成每日报告
    const dailyData = await generateDailyReport()
    
    // 获取订阅用户
    const subscribers = await getSubscribers()
    dailyData.subscribers = subscribers.length
    
    // 并行发送通知
    const notificationPromises = subscribers.map(email => 
      sendEmailNotification(email, dailyData)
    )
    
    const notificationResults = await Promise.allSettled(notificationPromises)
    const successCount = notificationResults.filter(
      result => result.status === 'fulfilled' && result.value
    ).length
    
    // 更新缓存
    await updateCacheData(dailyData)
    
    console.log(`✅ 每日更新任务完成`)
    console.log(`📧 邮件发送: ${successCount}/${subscribers.length} 成功`)
    console.log(`🌌 天象事件: ${dailyData.events.length} 个`)
    
    return NextResponse.json({
      success: true,
      data: {
        date: dailyData.date,
        eventsCount: dailyData.events.length,
        subscribersCount: subscribers.length,
        notificationsSent: successCount,
        summary: dailyData.summary
      }
    })
  } catch (error) {
    console.error('每日更新任务失败:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '每日更新任务执行失败',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// 手动触发每日更新（用于测试）
export async function POST(request: NextRequest) {
  try {
    const { action, test } = await request.json()
    
    if (action === 'manual_trigger') {
      console.log('🔧 手动触发每日更新任务')
      
      // 如果是测试模式，跳过验证
      if (test) {
        console.log('🧪 测试模式 - 跳过验证')
      } else if (!validateCronRequest(request)) {
        return NextResponse.json(
          { success: false, error: '未授权的请求' },
          { status: 401 }
        )
      }
      
      // 执行更新任务
      const dailyData = await generateDailyReport()
      
      return NextResponse.json({
        success: true,
        message: '手动更新任务执行成功',
        data: {
          date: dailyData.date,
          eventsCount: dailyData.events.length,
          summary: dailyData.summary
        }
      })
    }
    
    return NextResponse.json({
      success: false,
      error: '未知的操作类型'
    })
  } catch (error) {
    console.error('手动更新任务失败:', error)
    return NextResponse.json(
      { success: false, error: '手动更新任务执行失败' },
      { status: 500 }
    )
  }
} 