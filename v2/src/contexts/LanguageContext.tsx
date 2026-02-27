import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'zh' | 'en';

export interface Translation {
  title: string;
  date: string;
  total: string;
  pending: string;
  completed: string;
  inputPlaceholder: string;
  add: string;
  filterAll: string;
  filterPending: string;
  filterCompleted: string;
  itemsLeft: string;
  clearCompleted: string;
  emptyAll: string;
  emptyPending: string;
  emptyCompleted: string;
  priorityHigh: string;
  priorityMedium: string;
  priorityLow: string;
}

export const translations: Record<Language, Translation> = {
  zh: {
    title: '📝 待办事项',
    date: '',
    total: '总计',
    pending: '待完成',
    completed: '已完成',
    inputPlaceholder: '添加新的待办事项...',
    add: '添加',
    filterAll: '全部',
    filterPending: '待完成',
    filterCompleted: '已完成',
    itemsLeft: '{count} 个项目待完成',
    clearCompleted: '清除已完成',
    emptyAll: '还没有待办事项，添加一个开始吧！',
    emptyPending: '没有待完成的事项',
    emptyCompleted: '没有已完成的事项',
    priorityHigh: '高',
    priorityMedium: '中',
    priorityLow: '低',
  },
  en: {
    title: '📝 To Do',
    date: '',
    total: 'Total',
    pending: 'Pending',
    completed: 'Completed',
    inputPlaceholder: 'Add a new todo...',
    add: 'Add',
    filterAll: 'All',
    filterPending: 'Pending',
    filterCompleted: 'Completed',
    itemsLeft: '{count} items pending',
    clearCompleted: 'Clear completed',
    emptyAll: 'No todos yet, add one to get started!',
    emptyPending: 'No pending items',
    emptyCompleted: 'No completed items',
    priorityHigh: 'High',
    priorityMedium: 'Med',
    priorityLow: 'Low',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'zh' || saved === 'en') ? saved : 'zh';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
