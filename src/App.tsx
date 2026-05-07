import { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import FilterBar, { type FilterType, type PriorityFilter } from './components/FilterBar';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/todoService';
import type { Todo, Priority } from './models/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');

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

  const addTodo = async (text: string, priority: Priority, dueDate: string | null) => {
    const newTodo = await createTodo(text, priority, dueDate);
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

  const reorderTodos = (draggedId: number, targetId: number) => {
    setTodos((prev) => {
      const result = [...prev];
      const from = result.findIndex((t) => t.id === draggedId);
      const to = result.findIndex((t) => t.id === targetId);
      const [removed] = result.splice(from, 1);
      result.splice(to, 0, removed);
      return result;
    });
  };

  // Derived state: computed from todos, not stored in a separate state variable
  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;
  const lowCount = todos.filter((t) => t.priority === 'low').length;
  const mediumCount = todos.filter((t) => t.priority === 'medium').length;
  const highCount = todos.filter((t) => t.priority === 'high').length;

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active' && t.completed) return false;
    if (filter === 'completed' && !t.completed) return false;
    if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
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
          activePriorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          low={lowCount}
          medium={mediumCount}
          high={highCount}
        />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onRemove={removeTodo}
          onReorder={reorderTodos}
        />
      </div>
    </div>
  );
}

export default App;
