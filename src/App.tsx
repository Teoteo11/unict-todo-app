import Header from './components/Header';
import TodoList from './components/TodoList';
import type { Todo } from './models/todo';

const sampleTodos: Todo[] = [
  { id: 1, text: 'Study TypeScript', completed: false },
  { id: 2, text: 'Try React', completed: true },
];

function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Header />
        <TodoList todos={sampleTodos} />
      </div>
    </div>
  );
}

export default App;
