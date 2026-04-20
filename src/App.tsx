import { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/todoService';
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

  const addTodo = async (text: string) => {
    // The UI calls the service (like with fetch/axios to a real API)
    const newTodo = await createTodo(text);
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = async (id: number) => {
    // Pattern: read current state -> compute next value -> call service
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updated = await updateTodo(id, { completed: !todo.completed });
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const removeTodo = async (id: number) => {
    await deleteTodo(id);
    // Update the UI only after the service confirms deletion
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const activeCount = todos.filter((t) => !t.completed).length;

  // Early return: show a loading state while the data is loading
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
