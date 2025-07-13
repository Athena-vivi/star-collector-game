# Star Collector - Astronomical Portal

A comprehensive Next.js-based astronomical portal website that integrates stargazing alerts, AI Q&A, and AI wallpaper creation features.

## 🌟 功能特性

### 1. Cosmic-Ping 「今晚看啥」
- 自动检测地理位置
- 展示今晚最佳观测窗口
- 提供零基础科普内容
- 支持城市切换

### 2. Ask-The-Universe AI问答
- 基于GPT-4o的智能问答
- 用中学水平解释复杂概念
- 提供相关科学链接
- 支持历史对话记录

### 3. Space-Image Studio AI壁纸
- 使用Stable Diffusion XL生成
- 多种风格选择（星云、行星、星系、太空海报）
- 支持自定义描述
- 实时生成进度显示

### 4. 订阅管理
- 免费版：每日1张壁纸 + 基础问答
- Plus版：无限壁纸 + GPT-4o问答
- Pro版：商用授权 + API访问

### 5. CRON定时任务
- 每日10 AM UTC自动更新天象数据
- 集成NASA、Heavens-Above、MPC等数据源
- 使用Claude-3-Haiku生成150字摘要
- 支持邮件和Push通知推送

## 🚀 技术栈

- **前端**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **UI组件**: Radix UI + shadcn/ui
- **AI服务**: OpenRouter (GPT-4o) + Fal.ai (Stable Diffusion)
- **支付**: Stripe
- **部署**: Vercel
- **数据库**: PlanetScale (MySQL)

## 📦 安装和运行

### 环境要求
- Node.js 18+
- pnpm (推荐) 或 npm

### 快速开始
```bash
# 1. 安装依赖
pnpm install

# 2. 配置环境变量（推荐使用配置向导）
pnpm setup

# 3. 启动开发服务器
pnpm dev

# 4. 测试CRON功能（可选）
pnpm test:cron
```

### 环境变量配置

#### 方式1: 使用配置向导（推荐）
```bash
pnpm setup
```

#### 方式2: 手动配置
创建 `.env.local` 文件：
```env
# AI服务
OPENROUTER_API_KEY=your_openrouter_key
FAL_KEY=your_fal_key

# 支付
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# 数据库
DATABASE_URL=your_planetscale_url

# CRON定时任务
CRON_SECRET=your_cron_secret_here
```

#### 最小配置（仅用于测试）
```env
OPENROUTER_API_KEY=your_openrouter_key
FAL_KEY=your_fal_key
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

### 开发模式
```bash
pnpm dev
```

### 构建生产版本
```bash
pnpm build
pnpm start
```

## 🏗️ 项目结构

```
cosmic-portal/
├── app/                    # Next.js App Router
│   ├── api/               # API路由
│   │   ├── cosmic-ping/   # 天象数据API
│   │   ├── ask-universe/  # AI问答API
│   │   ├── space-image/   # 壁纸生成API
│   │   └── cron/          # CRON定时任务
│   ├── ask/               # AI问答页面
│   ├── studio/            # 壁纸工作室页面
│   ├── account/           # 账户管理页面
│   └── page.tsx           # 首页
├── components/            # React组件
│   ├── ui/               # 基础UI组件
│   └── navigation.tsx    # 导航组件
├── lib/                  # 工具库
├── types/                # TypeScript类型定义
└── public/               # 静态资源
```

## 🔧 API接口

### 1. Cosmic-Ping API
```
GET /api/cosmic-ping?lat=39.9042&lng=116.4074&city=北京
```

### 2. Ask-Universe API
```
POST /api/ask-universe
{
  "question": "为什么月亮有环形山？",
  "userId": "user123",
  "subscription": "free"
}
```

### 3. Space-Image API
```
POST /api/space-image
{
  "prompt": "一片紫色的星云",
  "style": "nebula",
  "userId": "user123",
  "subscription": "free"
}
```

### 4. CRON Daily Update API
```
GET /api/cron/daily-update
Authorization: Bearer your_cron_secret

POST /api/cron/daily-update
{
  "action": "manual_trigger",
  "test": true
}
```

## 🎨 设计系统

项目使用统一的设计系统：
- 深色主题为主
- 紫色和蓝色渐变
- 宇宙星空背景
- 毛玻璃效果
- 响应式设计

## 📱 响应式支持

- 桌面端：完整功能体验
- 平板端：适配触摸操作
- 移动端：优化布局和交互

## 🔒 安全特性

- API密钥环境变量管理
- 用户权限验证
- 请求频率限制
- 内容安全策略

## 🚀 部署

### Vercel部署
1. 连接GitHub仓库
2. 配置环境变量
3. 自动部署

### 自定义部署
```bash
# 构建
pnpm build

# 启动
pnpm start
```

## 🤝 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 发起Pull Request

## 📄 许可证

MIT License

## 📞 联系方式

- 项目地址：[GitHub](https://github.com/your-username/cosmic-portal)
- 问题反馈：[Issues](https://github.com/your-username/cosmic-portal/issues)

## 🙏 致谢

- [NASA](https://www.nasa.gov/) - 天文数据
- [OpenRouter](https://openrouter.ai/) - AI服务
- [Fal.ai](https://fal.ai/) - 图像生成
- [shadcn/ui](https://ui.shadcn.com/) - UI组件 