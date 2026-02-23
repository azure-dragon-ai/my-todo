# MyTodo - Vue 3 待办事项应用

一个功能完整的待办事项应用，基于 Vue 3 + Vite + TailwindCSS 构建。

## 功能特性

### 核心功能
- 创建、编辑、删除待办事项
- 标记任务完成/未完成
- 任务列表展示

### 进阶功能
- **优先级系统**：高、中、低、无四个优先级
- **分类管理**：支持多分类，预设工作、个人、购物、健康等分类
- **截止日期**：设置任务截止时间，逾期提醒
- **搜索过滤**：全文搜索，按状态、优先级、分类筛选
- **排序功能**：按创建时间、截止日期、优先级排序

### 高级功能
- **子任务**：支持添加子任务，显示完成进度
- **重复任务**：支持每日、每周、每月、每年重复
- **统计图表**：完成任务趋势图、优先级分布、分类分布
- **数据导出**：支持 JSON 和 CSV 格式导出
- **数据导入**：支持从 JSON 文件导入

### 数据存储
- 使用 LocalStorage 本地存储
- 预留 Supabase 接口供后续扩展

## 技术栈

- **框架**：Vue 3 (Composition API + `<script setup>`)
- **构建工具**：Vite
- **UI 库**：TailwindCSS
- **图表库**：Chart.js + vue-chartjs
- **路由**：Vue Router
- **状态管理**：Pinia
- **图标**：Lucide Vue Next

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173/

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
src/
├── main.js              # 应用入口
├── App.vue              # 根组件
├── router.js            # 路由配置
├── components/          # 可复用组件
│   ├── TodoItem.vue     # 任务项组件
│   ├── TodoList.vue     # 任务列表组件
│   ├── TodoForm.vue     # 任务表单组件
│   ├── SubTaskList.vue  # 子任务列表组件
│   ├── CategorySelector.vue  # 分类选择器
│   ├── PriorityBadge.vue     # 优先级徽章
│   ├── SearchBar.vue         # 搜索栏
│   ├── FilterPanel.vue       # 筛选面板
│   ├── StatsChart.vue        # 统计图表
│   └── ExportModal.vue       # 导出模态框
├── views/               # 页面组件
│   ├── Dashboard.vue    # 仪表盘
│   ├── Tasks.vue        # 任务页面
│   ├── Statistics.vue   # 统计页面
│   └── Settings.vue     # 设置页面
├── stores/              # Pinia 状态管理
│   ├── todos.js         # 任务存储
│   ├── categories.js    # 分类存储
│   └── settings.js      # 设置存储
├── composables/         # 组合式函数
│   ├── useTodos.js      # 任务相关逻辑
│   ├── useFilters.js    # 筛选逻辑
│   └── useExport.js     # 导出逻辑
├── utils/               # 工具函数
│   ├── storage.js       # 本地存储
│   └── recurrence.js    # 重复任务计算
└── styles/              # 样式文件
    └── index.css        # 全局样式
```

## 使用说明

### 创建任务
1. 点击"新建任务"按钮
2. 填写任务标题（必填）
3. 可选填写描述、设置优先级、分类、截止日期
4. 可选择重复规则
5. 点击"创建"按钮

### 编辑任务
1. 点击任务右侧的编辑图标
2. 修改任务信息
3. 点击"更新"按钮

### 删除任务
1. 点击任务右侧的删除图标
2. 确认删除

### 筛选和搜索
1. 点击"筛选"按钮展开筛选面板
2. 选择状态、优先级、分类
3. 设置排序方式
4. 使用搜索栏进行全文搜索

### 导出数据
1. 进入"设置"页面
2. 点击"导出数据"
3. 选择 JSON 或 CSV 格式
4. 点击"导出"按钮

## 后续计划

- [ ] 添加深色模式切换
- [ ] 集成 Supabase 云端存储
- [ ] 添加用户认证
- [ ] 支持任务拖拽排序
- [ ] 添加任务提醒通知
- [ ] 支持多语言
- [ ] PWA 离线支持

## License

MIT
