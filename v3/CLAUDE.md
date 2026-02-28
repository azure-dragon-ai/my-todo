# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

单文件 HTML 待办事项应用，使用原生 HTML/CSS/JavaScript 实现，数据持久化到 localStorage。

## Architecture

### 文件结构
- `todo.html` - 基础版本，浅色主题（紫色渐变）
- `todo-pro.html` - 专业版本，深色主题，带进度条和优先级徽章

### 核心功能
- 添加/删除任务
- 切换完成状态
- 筛选过滤（全部/进行中/已完成）
- 清除已完成任务
- localStorage 持久化
- 响应式设计

### 技术特点
- 无依赖，纯原生实现
- CSS 变量管理主题配色
- 事件委托处理交互
- 相对时间格式化（刚刚/X 分钟前/X 小时前/X 天前）
- 动画效果：slideIn 进入动画，悬停交互

## Development

直接在浏览器中打开 HTML 文件即可运行，无需构建步骤。

## Design System (todo-pro.html)

深色主题配色方案：
- `--bg`: #0f172a (背景)
- `--surface`: #1e293b (卡片)
- `--primary`: #6366f1 (主色)
- `--success`: #10b981 (完成)
- `--danger`: #ef4444 (危险)
- `--warning`: #f59e0b (警告)
