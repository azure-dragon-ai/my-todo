# GEMINI 任务助手上下文

本文档描述了当前目录下的待办事项 (Todo) 项目结构、技术栈、使用方法和开发约定，旨在为未来的开发工作提供上下文。

## 项目概览

此目录包含了一个待办事项应用程序的两个不同版本实现，主要目的是演示不同的技术栈和架构：

1.  **纯 HTML/JS 版本**：位于根目录的 `index.html` 文件，使用原生 HTML、CSS 和 Vanilla JavaScript 构建。
2.  **React 版本**：位于 `react-todo` 目录中，是使用现代前端技术栈重构的版本，保持了与原始 HTML 版本一致的功能和 UI 风格。

### 核心功能

两个版本均实现了以下核心的待办事项功能：

*   **添加任务**：支持输入文本并添加到待办列表。
*   **切换状态**：标记任务为已完成或未完成。
*   **删除任务**：删除单个特定的待办事项。
*   **状态过滤**：支持按照“全部”、“未完成”、“已完成”过滤显示任务。
*   **清除已完成**：一键清理所有已完成的任务。
*   **数据持久化**：使用浏览器的 `localStorage`（键名为 `my-todos`）存储数据，确保刷新页面数据不丢失。

### 技术栈（React 版本）

*   **框架**：React 19
*   **语言**：TypeScript
*   **构建工具**：Vite
*   **样式**：原生 CSS (`index.css`)

## 目录结构

```
.
├── GEMINI.md            # 项目上下文说明文档
├── index.html           # 纯 HTML/JS 版本的待办应用
└── react-todo/          # React + TypeScript 版本的待办应用
    ├── package.json     # 项目依赖和脚本配置
    ├── src/             # 源代码目录
    │   ├── App.tsx      # React 主组件，包含核心业务逻辑
    │   ├── main.tsx     # React 应用入口
    │   └── index.css    # 全局样式文件（移植自 index.html）
    └── ...
```

## 构建与运行

### React 版本 (`react-todo` 目录)

首先需要进入项目目录并安装依赖：

```bash
cd react-todo
npm install
```

然后，你可以使用以下命令：

*   **启动开发服务器**：
    ```bash
    npm run dev
    ```
*   **构建生产版本**：
    ```bash
    npm run build
    ```
*   **预览生产构建**：
    ```bash
    npm run preview
    ```
*   **运行代码检查 (Linting)**：
    ```bash
    npm run lint
    ```

### HTML 版本

直接在任何现代网页浏览器中打开根目录下的 `index.html` 文件即可运行和测试。

## 开发约定

*   **数据结构**：任务对象包含三个属性：`id` (字符串，通常是时间戳)、`text` (字符串，任务内容)、`completed` (布尔值，是否完成)。
*   **UI/UX 风格**：两个版本应保持相同的视觉风格。主要的样式定义（如 CSS 变量、布局、色彩）集中在 `react-todo/src/index.css` (或 `index.html` 的 `<style>` 标签) 中。
*   **状态管理**：React 版本使用了简单的组件内部状态 (`useState`) 进行管理，并将副作用 (`useEffect`) 用于同步 `localStorage`。对于目前的功能复杂度，这已经足够。