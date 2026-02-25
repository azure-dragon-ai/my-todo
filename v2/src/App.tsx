import { useMemo } from 'react';
import { useTodos } from './hooks/useTodos';
import { Header } from './components/Header';
import { TodoInput } from './components/TodoInput';
import { FilterBar } from './components/FilterBar';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

function App() {
  const {
    todos,
    stats,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  } = useTodos();

  const date = useMemo(() => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    return new Date().toLocaleDateString('zh-CN', options);
  }, []);

  const hasCompleted = stats.completed > 0;

  return (
    <div className="container">
      <Header date={date} stats={stats} />
      <TodoInput onAdd={addTodo} />
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <TodoList
        todos={todos}
        filter={filter}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      <Footer
        pendingCount={stats.pending}
        hasCompleted={hasCompleted}
        onClearCompleted={clearCompleted}
      />
    </div>
  );
}

export default App;
