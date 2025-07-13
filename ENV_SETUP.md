# 环境变量配置指南

## 创建环境变量文件

在项目根目录创建 `.env.local` 文件，并添加以下配置：

```env
# AI服务配置
# OpenRouter API - 用于GPT-4o问答
# 获取地址: https://openrouter.ai/keys
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Fal.ai API - 用于Stable Diffusion图像生成
# 获取地址: https://fal.ai/keys
FAL_KEY=your_fal_key_here

# 支付服务配置
# Stripe - 用于订阅支付
# 获取地址: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# 数据库配置
# PlanetScale MySQL - 用于用户数据和订阅管理
# 获取地址: https://planetscale.com/
DATABASE_URL=mysql://your_username:your_password@your_host:3306/cosmic_portal

# 应用配置
# Next.js 应用配置
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# 第三方服务
# 天气API - 用于观星条件判断
# 推荐: OpenWeatherMap API
WEATHER_API_KEY=your_weather_api_key_here

# 地理位置服务
# 用于自动检测用户位置
# 推荐: Google Maps Geocoding API
GEOCODING_API_KEY=your_geocoding_api_key_here

# 文件存储
# Cloudflare R2 - 用于存储生成的壁纸
# 获取地址: https://dash.cloudflare.com/
R2_ACCESS_KEY_ID=your_r2_access_key_here
R2_SECRET_ACCESS_KEY=your_r2_secret_key_here
R2_BUCKET_NAME=cosmic-portal-images
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com

# 监控和分析
# Vercel Analytics
VERCEL_ANALYTICS_ID=your_vercel_analytics_id_here

# CRON定时任务
# 用于每日天象数据更新
CRON_SECRET=your_cron_secret_here

# 应用基础配置
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# 开发环境配置
NODE_ENV=development
```

## 必需的服务配置

### 1. OpenRouter API (必需)
- 用途：GPT-4o AI问答功能
- 获取地址：https://openrouter.ai/keys
- 免费额度：每天1000次请求

### 2. Fal.ai API (必需)
- 用途：Stable Diffusion图像生成
- 获取地址：https://fal.ai/keys
- 免费额度：每天100次生成

### 3. Stripe (可选，用于支付)
- 用途：订阅支付处理
- 获取地址：https://dashboard.stripe.com/apikeys
- 测试模式：使用 `sk_test_` 和 `pk_test_` 前缀

## 可选的服务配置

### 4. PlanetScale (可选，用于数据库)
- 用途：用户数据和订阅管理
- 获取地址：https://planetscale.com/
- 免费额度：每月1GB存储

### 5. OpenWeatherMap (可选)
- 用途：观星条件判断
- 获取地址：https://openweathermap.org/api
- 免费额度：每天1000次请求

### 6. Google Maps Geocoding (可选)
- 用途：地理位置自动检测
- 获取地址：https://developers.google.com/maps/documentation/geocoding
- 免费额度：每月$200额度

### 7. Cloudflare R2 (可选)
- 用途：存储生成的壁纸
- 获取地址：https://dash.cloudflare.com/
- 免费额度：每月10GB存储

## 开发环境最小配置

如果只是本地开发测试，可以使用最小配置：

```env
# 最小开发配置
OPENROUTER_API_KEY=your_openrouter_api_key_here
FAL_KEY=your_fal_key_here
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

## 生产环境配置

部署到生产环境时，需要：

1. 使用生产环境的API密钥
2. 配置正确的域名
3. 设置安全的环境变量

```env
# 生产环境配置示例
NEXTAUTH_URL=https://your-domain.com
NODE_ENV=production
# 其他生产环境密钥...
```

## 安全注意事项

1. **永远不要提交 `.env.local` 文件到Git**
2. 使用强密码和随机密钥
3. 定期轮换API密钥
4. 在生产环境中使用环境变量管理服务

## 验证配置

配置完成后，重启开发服务器：

```bash
pnpm dev
```

检查控制台是否有环境变量相关的错误信息。 