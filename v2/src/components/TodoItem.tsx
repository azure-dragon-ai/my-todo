import type { Todo } from '../types/todo';
import { useLanguage } from '../contexts/LanguageContext';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const { t } = useLanguage();

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return t.priorityHigh;
      case 'medium':
        return t.priorityMedium;
      case 'low':
        return t.priorityLow;
      default:
        return priority;
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}>
      <div className="checkbox" onClick={() => onToggle(todo.id)}></div>
      <span className="todo-text">{todo.text}</span>
      <span className={`priority-badge priority-${todo.priority}`}>
        {getPriorityLabel(todo.priority)}
      </span>
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        ×
      </button>
    </li>
  );
}
