import { useState } from 'react';
import type { PriorityType } from '../types/todo';
import { useLanguage } from '../contexts/LanguageContext';

interface TodoInputProps {
  onAdd: (text: string, priority: PriorityType) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const { t } = useLanguage();
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<PriorityType>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
    setPriority('medium');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="input-section">
      <form className="input-wrapper" onSubmit={handleSubmit}>
        <input
          type="text"
          id="todoInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t.inputPlaceholder}
          maxLength={100}
        />
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value as PriorityType)}
        >
          <option value="high">{t.priorityHigh}</option>
          <option value="medium">{t.priorityMedium}</option>
          <option value="low">{t.priorityLow}</option>
        </select>
        <button type="submit" id="addBtn">
          {t.add}
        </button>
      </form>
    </div>
  );
}
