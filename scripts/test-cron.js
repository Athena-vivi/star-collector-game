#!/usr/bin/env node

/**
 * CRON定时任务测试脚本
 * 用于手动触发每日天象数据更新任务
 */

const https = require('https')
const http = require('http')

// 配置
const config = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  cronSecret: process.env.CRON_SECRET || 'your-cron-secret',
  endpoint: '/api/cron/daily-update'
}

// 发送HTTP请求
function makeRequest(url, options) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    
    const req = client.request(url, options, (res) => {
      let data = ''
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data)
          resolve({
            status: res.statusCode,
            data: jsonData
          })
        } catch (error) {
          resolve({
            status: res.statusCode,
            data: data
          })
        }
      })
    })
    
    req.on('error', (error) => {
      reject(error)
    })
    
    if (options.body) {
      req.write(options.body)
    }
    
    req.end()
  })
}

// 测试CRON任务
async function testCronTask() {
  console.log('🧪 开始测试CRON定时任务...')
  console.log(`📍 目标URL: ${config.baseUrl}${config.endpoint}`)
  console.log(`🔑 使用密钥: ${config.cronSecret.substring(0, 10)}...`)
  console.log('')
  
  try {
    // 测试GET请求（模拟Vercel CRON）
    console.log('📡 测试GET请求（模拟Vercel CRON）...')
    const getResponse = await makeRequest(`${config.baseUrl}${config.endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.cronSecret}`,
        'User-Agent': 'Vercel-Cron/1.0',
        'Content-Type': 'application/json'
      }
    })
    
    console.log(`✅ GET请求状态: ${getResponse.status}`)
    console.log('📊 响应数据:')
    console.log(JSON.stringify(getResponse.data, null, 2))
    console.log('')
    
    // 测试POST请求（手动触发）
    console.log('📡 测试POST请求（手动触发）...')
    const postResponse = await makeRequest(`${config.baseUrl}${config.endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.cronSecret}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'manual_trigger',
        test: true
      })
    })
    
    console.log(`✅ POST请求状态: ${postResponse.status}`)
    console.log('📊 响应数据:')
    console.log(JSON.stringify(postResponse.data, null, 2))
    console.log('')
    
    // 测试无权限请求
    console.log('📡 测试无权限请求...')
    const unauthorizedResponse = await makeRequest(`${config.baseUrl}${config.endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    console.log(`❌ 无权限请求状态: ${unauthorizedResponse.status}`)
    console.log('📊 响应数据:')
    console.log(JSON.stringify(unauthorizedResponse.data, null, 2))
    console.log('')
    
    console.log('🎉 CRON测试完成！')
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message)
    process.exit(1)
  }
}

// 测试Cosmic-Ping API
async function testCosmicPing() {
  console.log('🌌 测试Cosmic-Ping API...')
  console.log(`📍 目标URL: ${config.baseUrl}/api/cosmic-ping`)
  console.log('')
  
  try {
    const response = await makeRequest(`${config.baseUrl}/api/cosmic-ping?city=北京&lat=39.9042&lng=116.4074`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    console.log(`✅ Cosmic-Ping状态: ${response.status}`)
    console.log('📊 响应数据:')
    console.log(JSON.stringify(response.data, null, 2))
    console.log('')
    
  } catch (error) {
    console.error('❌ Cosmic-Ping测试失败:', error.message)
  }
}

// 主函数
async function main() {
  const args = process.argv.slice(2)
  const command = args[0]
  
  switch (command) {
    case 'cron':
      await testCronTask()
      break
    case 'cosmic':
      await testCosmicPing()
      break
    case 'all':
      await testCosmicPing()
      console.log('')
      await testCronTask()
      break
    default:
      console.log('使用方法:')
      console.log('  node scripts/test-cron.js cron     - 测试CRON任务')
      console.log('  node scripts/test-cron.js cosmic   - 测试Cosmic-Ping API')
      console.log('  node scripts/test-cron.js all      - 测试所有功能')
      console.log('')
      console.log('环境变量:')
      console.log('  BASE_URL     - 应用基础URL (默认: http://localhost:3000)')
      console.log('  CRON_SECRET  - CRON密钥 (默认: your-cron-secret)')
  }
}

// 运行主函数
if (require.main === module) {
  main().catch(console.error)
}

module.exports = {
  testCronTask,
  testCosmicPing
} 