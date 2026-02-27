import type { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';
import { useLanguage } from '../contexts/LanguageContext';

interface TodoListProps {
  todos: Todo[];
  filter: string;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoList({ todos, filter, onToggle, onDelete }: TodoListProps) {
  const { t } = useLanguage();

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📋</div>
        <p>
          {filter === 'all'
            ? t.emptyAll
            : filter === 'pending'
            ? t.emptyPending
            : t.emptyCompleted}
        </p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
