# 项目架构文档

## 目录结构

```
src/
├── locales/            # 国际化资源
│   ├── en/             # 英文翻译
│   └── zh/             # 中文翻译
├── hooks/              # 自定义Hooks
│   ├── useTheme.ts     # 主题相关逻辑
│   ├── useLanguage.ts  # 语言相关逻辑
│   └── useSettings.ts  # 设置相关逻辑
├── components/         # UI组件
│   ├── common/         # 通用组件
│   ├── ui/             # UI基础组件
│   └── forms/          # 表单组件
├── pages/              # 页面组件
│   ├── Home.tsx        # 首页
│   ├── Settings.tsx    # 设置页面
│   └── About.tsx       # 关于页面
└── stores/             # 状态管理
    ├── themeStore.ts   # 主题状态
    ├── languageStore.ts # 语言状态
    └── userStore.ts    # 用户状态
```

## 主要模块

### 1. 国际化 (i18n)
- 使用i18next库进行国际化管理
- 按语言组织翻译文件
- 在appStore中增加语言状态

### 2. 自定义Hooks
- 封装通用逻辑为可复用Hook
- 提供主题、语言、设置等常用逻辑

### 3. UI组件
- 按功能划分组件目录
- 实现可复用、可组合的UI组件
- 遵循原子设计原则

### 4. 页面
- 按功能划分页面组件
- 使用路由管理页面导航
- 保持页面逻辑简洁

### 5. 状态管理
- 使用Zustand进行状态管理
- 按功能划分store模块
- 支持状态持久化