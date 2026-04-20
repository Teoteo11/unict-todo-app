import { useState } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import type { Todo } from './models/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Header />
        <TodoForm onAdd={addTodo} />
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default App;
