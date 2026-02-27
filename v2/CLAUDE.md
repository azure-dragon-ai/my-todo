# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:5173)
npm run build    # Build production bundle
npm run preview  # Preview production build
```

## Architecture

**Stack**: React 19 + TypeScript + Vite

**Structure**:
- `src/components/` - UI components (Header, Footer, TodoInput, TodoList, TodoItem, FilterBar, LanguageSwitch)
- `src/hooks/useTodos.ts` - Central state management via custom hook, handles all todo CRUD operations + localStorage persistence
- `src/contexts/LanguageContext.tsx` - i18n system with Chinese/English translations, language preference persisted to localStorage
- `src/types/todo.ts` - TypeScript definitions (Todo, PriorityType, FilterType)

**Data Flow**:
- `App.tsx` wraps content with `LanguageProvider`, calls `useTodos()` hook
- `useTodos` manages todos array and filter state, syncs to localStorage on every change
- Priority levels: high (red), medium (orange), low (green) with CSS border-left indicators
- All user-facing strings go through translation context (`useLanguage().t`)
