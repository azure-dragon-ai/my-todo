import { useState, useEffect } from 'react';
import { CheckSquare, Plus, Heart } from 'lucide-react';

interface Todo {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  completed: boolean;
}

const initialTodos: Todo[] = [
  {
    id: '1',
    title: '完成前端课程文档',
    category: '工作',
    categoryColor: 'bg-blue-500',
    date: '今天 · 下午3:00',
    completed: false,
  },
  {
    id: '2',
    title: '准备周末的生日派对',
    category: '个人',
    categoryColor: 'bg-pink-500',
    date: '周六 · 下午6:00',
    completed: false,
  },
  {
    id: '3',
    title: '跑步 5 公里',
    category: '健身',
    categoryColor: 'bg-green-500',
    date: '昨天 · 早上7:00',
    completed: false,
  },
  {
    id: '4',
    title: '阅读《设计中心理学》第三章',
    category: '个人',
    categoryColor: 'bg-pink-500',
    date: '已完成',
    completed: true,
  },
];

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('flowy-todos');
    return saved ? JSON.parse(saved) : initialTodos;
  });
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem('flowy-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        title: newTodo,
        category: '工作',
        categoryColor: 'bg-blue-500',
        date: '今天',
        completed: false,
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const allCount = todos.length;
  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">
              <span className="text-gray-800">Flowy </span>
              <span className="text-purple-600">Todo</span>
            </h1>
          </div>
          <p className="text-sm text-gray-500">让每一天都井井有条</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-1">{allCount}</div>
            <div className="text-xs text-gray-600">全部任务</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
            <div className="text-3xl font-bold text-pink-500 mb-1">{activeCount}</div>
            <div className="text-xs text-gray-600">进行中</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-1">{completedCount}</div>
            <div className="text-xs text-gray-600">已完成</div>
          </div>
        </div>

        {/* Add Todo Input */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm p-4 mb-6 flex items-center gap-3">
          <input
            type="text"
            placeholder="添加新任务..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={addTodo}
            className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'all'
                ? 'bg-white/90 text-purple-600 shadow-sm'
                : 'bg-white/40 text-gray-600 hover:bg-white/60'
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'active'
                ? 'bg-white/90 text-purple-600 shadow-sm'
                : 'bg-white/40 text-gray-600 hover:bg-white/60'
            }`}
          >
            进行中
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'completed'
                ? 'bg-white/90 text-purple-600 shadow-sm'
                : 'bg-white/40 text-gray-600 hover:bg-white/60'
            }`}
          >
            已完成
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm p-4 flex items-start gap-3 hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`mt-1 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                  todo.completed
                    ? 'bg-purple-500 border-purple-500'
                    : 'border-gray-300 hover:border-purple-400'
                }`}
              >
                {todo.completed && (
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M2 6l3 3 5-6" />
                  </svg>
                )}
              </button>
              <div className="flex-1">
                <h3
                  className={`text-sm mb-1 ${
                    todo.completed
                      ? 'line-through text-gray-400'
                      : 'text-gray-800'
                  }`}
                >
                  {todo.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`${todo.categoryColor} text-white text-xs px-2 py-0.5 rounded-full`}
                  >
                    {todo.category}
                  </span>
                  <span className="text-xs text-gray-500">{todo.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500 flex items-center justify-center gap-1">
          <span>用</span>
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <span>打造，让生活更美好</span>
        </div>
      </div>
    </div>
  );
}
