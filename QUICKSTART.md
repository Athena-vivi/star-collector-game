# 🚀 Cosmic Portal 快速开始指南

## 5分钟快速启动

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd cosmic-portal
```

### 2. 安装依赖
```bash
pnpm install
```

### 3. 配置环境变量
```bash
# 方式1: 使用配置向导（推荐）
pnpm setup

# 方式2: 手动创建 .env.local 文件
cp ENV_SETUP.md .env.local
# 然后编辑 .env.local 文件
```

### 4. 启动开发服务器
```bash
pnpm dev
```

### 5. 访问网站
打开浏览器访问: http://localhost:3000

## 🎯 最小配置

如果只是想快速体验，只需要配置以下两个API密钥：

```env
# 最小配置 (.env.local)
OPENROUTER_API_KEY=your_openrouter_key
FAL_KEY=your_fal_key
NEXTAUTH_SECRET=your-random-secret
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

## 🔑 获取API密钥

### OpenRouter API (必需)
1. 访问 https://openrouter.ai/keys
2. 注册账号并创建API密钥
3. 免费额度：每天1000次请求

### Fal.ai API (必需)
1. 访问 https://fal.ai/keys
2. 注册账号并创建API密钥
3. 免费额度：每天100次生成

## 📱 功能体验

配置完成后，你可以体验以下功能：

### 首页 - 今晚观测窗口
- 查看今晚最佳观星时间
- 了解天象信息
- 切换城市位置

### AI问答 - 宇宙探索助手
- 提问任何天文问题
- 获得通俗易懂的解释
- 查看相关科学链接

### 壁纸工作室 - 太空创作
- 描述你想要的太空场景
- 选择不同风格（星云、行星、星系）
- 生成专属壁纸并下载

### 账户管理 - 订阅计划
- 查看不同订阅方案
- 了解功能限制
- 管理使用情况

## 🛠️ 开发调试

### 查看API响应
- 打开浏览器开发者工具
- 查看Network标签页
- 检查API请求和响应

### 常见问题
1. **API密钥错误**: 检查.env.local文件中的密钥是否正确
2. **页面加载慢**: 首次访问需要编译，后续访问会更快
3. **功能不可用**: 确保API密钥有效且有足够额度

## 🚀 部署到生产

### Vercel部署（推荐）
1. 推送代码到GitHub
2. 在Vercel中导入项目
3. 配置环境变量
4. 自动部署

### 自定义部署
```bash
pnpm build
pnpm start
```

## 📚 更多资源

- [详细配置说明](ENV_SETUP.md)
- [项目文档](README.md)
- [API接口文档](README.md#api接口)
- [设计系统说明](README.md#设计系统)

## 🤝 获取帮助

- 查看 [Issues](https://github.com/your-username/cosmic-portal/issues)
- 阅读 [FAQ](README.md#常见问题)
- 提交 [Bug报告](https://github.com/your-username/cosmic-portal/issues/new)

---

**享受探索宇宙的乐趣！** 🌟 