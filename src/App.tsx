import { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { getTodos } from './services/todoService';
import type { Todo } from './models/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // GET: load todos from the service at mount
  useEffect(() => {
    const loadTodos = async () => {
      const data = await getTodos();
      setTodos(data);
      setLoading(false);
    };
    loadTodos();
  }, []);

  useEffect(() => {
    const activeCount = todos.filter((t) => !t.completed).length;
    document.title = activeCount > 0 ? `(${activeCount}) Todo App` : 'Todo App';
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const activeCount = todos.filter((t) => !t.completed).length;

  // Early return: mostra uno stato di caricamento mentre i dati arrivano
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-slate-400 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Header activeCount={activeCount} />
        <TodoForm onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onRemove={removeTodo} />
      </div>
    </div>
  );
}

export default App;
