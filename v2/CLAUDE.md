# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码库中工作提供指导。

## 常用命令

```bash
npm run dev      # 启动开发服务器 (localhost:5173)
npm run build    # 构建生产包
npm run preview  # 预览生产版本
```

## 架构

**技术栈**: React 19 + TypeScript + Vite

**项目结构**:
- `src/components/` - UI 组件 (Header, Footer, TodoInput, TodoList, TodoItem, FilterBar, LanguageSwitch)
- `src/hooks/useTodos.ts` - 核心状态管理，通过自定义 Hook 处理所有待办事项的增删改查 + localStorage 持久化
- `src/contexts/LanguageContext.tsx` - 国际化系统，支持中文/英文切换，语言偏好存储于 localStorage
- `src/types/todo.ts` - TypeScript 类型定义 (Todo, PriorityType, FilterType)

**数据流**:
- `App.tsx` 使用 `LanguageProvider` 包裹内容，调用 `useTodos()` Hook
- `useTodos` 管理 todos 数组和筛选状态，每次变更自动同步到 localStorage
- 优先级：高（红色）、中（橙色）、低（绿色），通过 CSS 左边框标识
- 所有用户界面文本通过翻译上下文获取 (`useLanguage().t`)
