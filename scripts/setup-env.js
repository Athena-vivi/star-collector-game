#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setupEnvironment() {
  console.log('🌟 Cosmic Portal 环境变量配置向导\n');
  
  const envPath = path.join(process.cwd(), '.env.local');
  
  // 检查是否已存在.env.local文件
  if (fs.existsSync(envPath)) {
    const overwrite = await question('检测到已存在 .env.local 文件，是否覆盖？(y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('配置已取消');
      rl.close();
      return;
    }
  }
  
  console.log('请按照提示输入相应的API密钥和配置信息：\n');
  
  const envVars = [];
  
  // 必需配置
  console.log('=== 必需配置 ===');
  
  const openrouterKey = await question('OpenRouter API Key (用于AI问答): ');
  if (openrouterKey) {
    envVars.push(`OPENROUTER_API_KEY=${openrouterKey}`);
  }
  
  const falKey = await question('Fal.ai API Key (用于图像生成): ');
  if (falKey) {
    envVars.push(`FAL_KEY=${falKey}`);
  }
  
  // 可选配置
  console.log('\n=== 可选配置 ===');
  
  const stripeSecret = await question('Stripe Secret Key (可选，用于支付): ');
  if (stripeSecret) {
    envVars.push(`STRIPE_SECRET_KEY=${stripeSecret}`);
  }
  
  const stripePublishable = await question('Stripe Publishable Key (可选): ');
  if (stripePublishable) {
    envVars.push(`STRIPE_PUBLISHABLE_KEY=${stripePublishable}`);
  }
  
  const databaseUrl = await question('Database URL (可选，用于数据存储): ');
  if (databaseUrl) {
    envVars.push(`DATABASE_URL=${databaseUrl}`);
  }
  
  const weatherKey = await question('Weather API Key (可选，用于观星条件): ');
  if (weatherKey) {
    envVars.push(`WEATHER_API_KEY=${weatherKey}`);
  }
  
  const geocodingKey = await question('Geocoding API Key (可选，用于位置检测): ');
  if (geocodingKey) {
    envVars.push(`GEOCODING_API_KEY=${geocodingKey}`);
  }
  
  // 基础配置
  console.log('\n=== 基础配置 ===');
  
  const nextauthSecret = await question('NextAuth Secret (随机字符串): ') || 'your-secret-key-change-this';
  envVars.push(`NEXTAUTH_SECRET=${nextauthSecret}`);
  
  const nextauthUrl = await question('NextAuth URL (默认: http://localhost:3000): ') || 'http://localhost:3000';
  envVars.push(`NEXTAUTH_URL=${nextauthUrl}`);
  
  // 环境配置
  envVars.push('NODE_ENV=development');
  
  // 写入文件
  const envContent = envVars.join('\n') + '\n';
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ 环境变量配置完成！');
    console.log(`📁 配置文件位置: ${envPath}`);
    console.log('\n🚀 现在可以启动开发服务器:');
    console.log('   pnpm dev');
    console.log('\n📖 更多配置说明请查看 ENV_SETUP.md');
  } catch (error) {
    console.error('❌ 配置文件写入失败:', error.message);
  }
  
  rl.close();
}

// 运行配置向导
setupEnvironment().catch(console.error); 