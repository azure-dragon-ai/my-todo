import { useState, useEffect, KeyboardEvent } from 'react';
import './index.css';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  // 初始化时从 localStorage 获取数据
  useEffect(() => {
    const savedTasks = localStorage.getItem('my-todos');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error('Failed to parse tasks from localStorage', e);
      }
    }
  }, []);

  // 当任务数据更新时，自动保存到 localStorage
  useEffect(() => {
    localStorage.setItem('my-todos', JSON.stringify(tasks));
  }, [tasks]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const addTask = () => {
    const text = inputValue.trim();
    if (text !== '') {
      const newTask: Task = {
        id: Date.now().toString(),
        text: text,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="container">
      <h1>我的待办事项</h1>
      
      <div className="input-group">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="添加一个新的待办事项..." 
          onKeyDown={handleKeyPress}
        />
        <button onClick={addTask}>添加</button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <label className="checkbox-container">
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleTask(task.id)} 
              />
            </label>
            <span className="task-text">{task.text}</span>
            <button className="delete-btn" onClick={() => deleteTask(task.id)} title="删除">✕</button>
          </li>
        ))}
      </ul>

      {filteredTasks.length === 0 && (
        <div className="empty-state">
          暂无待办事项，快去添加一个吧！
        </div>
      )}

      <div className="filters">
        <span>{activeCount} 个未完成</span>
        <div className="filter-btns">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            全部
          </button>
          <button 
            className={filter === 'active' ? 'active' : ''} 
            onClick={() => setFilter('active')}
          >
            未完成
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >
            已完成
          </button>
        </div>
        <button 
          style={{ background: 'none', color: 'var(--text-muted)', padding: 0 }} 
          onClick={clearCompleted}
        >
          清除已完成
        </button>
      </div>
    </div>
  );
}

export default App;