import { useState } from 'react';
import type { PriorityType } from '../types/todo';

interface TodoInputProps {
  onAdd: (text: string, priority: PriorityType) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
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
          placeholder="添加新的待办事项..."
          maxLength={100}
        />
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value as PriorityType)}
        >
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
        </select>
        <button type="submit" id="addBtn">
          添加
        </button>
      </form>
    </div>
  );
}
