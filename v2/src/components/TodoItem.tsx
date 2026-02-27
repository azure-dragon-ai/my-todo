import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}>
      <div className="checkbox" onClick={() => onToggle(todo.id)}></div>
      <span className="todo-text">{todo.text}</span>
      <span className={`priority-badge priority-${todo.priority}`}>
        {todo.priority === 'high' ? '高' : todo.priority === 'medium' ? '中' : '低'}
      </span>
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        ×
      </button>
    </li>
  );
}
