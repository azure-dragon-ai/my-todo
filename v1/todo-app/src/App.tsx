import { TodoInput } from './components/TodoInput';
import { FilterBar } from './components/FilterBar';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';
import './App.css';

function App() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    activeCount,
    completedCount
  } = useTodos();

  const currentDate = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  return (
    <div className="container">
      <div className="header">
        <h1>待办事项</h1>
        <p>{currentDate}</p>
      </div>

      <TodoInput onAdd={addTodo} />

      <FilterBar filter={filter} onFilterChange={setFilter} />

      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      <div className="footer">
        <span>{activeCount} 个进行中，{completedCount} 个已完成</span>
        <button className="clear-btn" onClick={clearCompleted}>清除已完成</button>
      </div>
    </div>
  );
}

export default App;
