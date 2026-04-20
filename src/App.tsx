import { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import FilterBar, { type FilterType } from './components/FilterBar';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/todoService';
import type { Todo } from './models/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<FilterType>('all');

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

  // Derived state: computed from todos, not stored in a separate state variable
  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

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
        <FilterBar
          activeFilter={filter}
          onFilterChange={setFilter}
          total={todos.length}
          active={activeCount}
          completed={completedCount}
        />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onRemove={removeTodo}
        />
      </div>
    </div>
  );
}

export default App;
