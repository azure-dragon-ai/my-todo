# GEMINI 代码伴侣上下文

本文档为 Gemini AI 助手提供了理解项目结构、约定和目标的上下文。

## 项目概览

这是一个“monorepo”，包含“MyTodo”应用程序的多个实现。主要且功能最丰富的版本是位于根目录 `src` 中的 **Vue 3** 应用程序。该存储库还在 `v1`、`v2` 和 `v3` 目录中包含旧版本或替代版本，它们似乎是使用 React 和纯 HTML 构建的。

### 主要应用程序 (Vue 3)

主要应用程序是一个功能全面的待办事项列表管理器，具有以下功能：

*   **核心功能：** 任务的创建、读取、更新和删除 (CRUD)。
*   **高级功能：** 任务优先级、类别、截止日期、子任务和重复任务。
*   **数据与分析：** 一个统计仪表板，包含图表，用于可视化任务完成情况、优先级分布等。
*   **数据可移植性：** 支持从 JSON 和 CSV 文件导入/导出任务。

### 技术栈（主要应用程序）

*   **框架：** Vue 3 (组合式 API with `<script setup>`)
*   **构建工具：** Vite
*   **状态管理：** Pinia
*   **路由：** Vue Router
*   **样式：** TailwindCSS
*   **图表：** Chart.js
*   **图标：** Lucide

## 构建与运行

以下命令适用于主要的 Vue 3 应用程序。

*   **安装依赖：**
    ```bash
    npm install
    ```

*   **启动开发服务器：**
    ```bash
    npm run dev
    ```

*   **构建生产版本：**
    ```bash
    npm run build
    ```

*   **预览生产构建：**
    ```bash
    npm run preview
    ```

## 项目结构（主要应用程序）

主要应用程序的源代码组织如下：

```
src/
├── main.js              # 应用程序入口文件 (Vue 应用初始化，插件)
├── App.vue              # 根 Vue 组件
├── router.js            # Vue Router 配置 (定义页面/路由)
├── components/          # 可重用 UI 组件 (例如，TodoItem, FilterPanel)
├── views/               # 每个路由的页面级组件 (例如，Dashboard, Tasks)
├── stores/              # Pinia 状态管理存储 (例如，todos, categories)
├── composables/         # 可重用组合式 API 逻辑 (例如，useTodos, useFilters)
├── utils/               # 工具函数 (例如，localStorage 访问)
└── styles/              # 全局 CSS 和 TailwindCSS 样式
```

## 开发约定

*   **状态管理：** 业务逻辑和应用程序状态集中在 Pinia 存储 (`src/stores`) 中管理。组件应与存储交互，而不是管理复杂的局部状态。
*   **代码风格：** 项目使用 Vue 3 的 `<script setup>` 语法，以实现更简洁和可读的组件逻辑。
*   **模块化：** 逻辑分离到 `composables` (`src/composables`) 中，以实现更好的可重用性和组织性。
*   **数据持久化：** 所有任务数据都持久化在浏览器的 `localStorage` 中。
