# 释放创意 - 情绪释放挑战应用

一个帮助用户完成情绪释放挑战流程的单页应用。

## 功能特点

- 🎯 **无需登录**: 直接使用，简单便捷
- 📱 **响应式设计**: 支持手机和PC端自适应
- 🌊 **流畅体验**: 4个核心场景无缝切换
- 💭 **情绪分类**: 提供丰富的情绪词汇分类选择
- 🎪 **释放挑战**: 独特的4步问题引导流程

## 核心场景

1. **感受输入** - 用户可以自由输入或从分类表选择情绪
2. **核心释放挑战** - 通过4个引导问题帮助用户释放情绪
3. **查看与选择** - 用户可以选择再次释放或继续
4. **结束** - 完成释放，可以开始新的释放流程

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **构建工具**: Next.js内置

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
释放/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── components/            # React组件
│   ├── EmotionInput.tsx   # 感受输入组件
│   ├── ChallengeScene.tsx # 核心挑战组件
│   ├── ReviewScene.tsx    # 查看选择组件
│   └── EndScene.tsx       # 结束场景组件
├── data/                  # 数据文件
│   ├── emotions.ts        # 情绪词汇数据
│   └── questions.ts       # 挑战问题数据
├── types/                 # TypeScript类型定义
│   └── index.ts           # 应用类型
└── 配置文件...
```

## 响应式设计

应用采用移动优先的响应式设计：

- **移动端**: 单列布局，触摸友好的按钮
- **平板/桌面**: 适配更大屏幕，保持良好的视觉比例
- **自适应**: 使用Tailwind CSS的响应式工具类

## 部署

可以部署到任何支持Next.js的平台：

- Vercel (推荐)
- Netlify
- 自托管服务器

## 开发说明

- 使用函数式组件和React Hooks
- 遵循Next.js App Router最佳实践
- TypeScript严格模式
- 移动优先的响应式设计 