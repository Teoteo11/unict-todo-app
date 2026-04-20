import type { Todo } from '../models/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl border group transition-all ${
      todo.completed
        ? 'bg-slate-800/50 border-slate-700/50'
        : 'bg-slate-800 border-slate-700'
    }`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 accent-indigo-500 cursor-pointer"
      />
      <span className={`flex-1 text-sm font-medium ${
        todo.completed ? 'line-through text-slate-500' : 'text-slate-100'
      }`}>
        {todo.text}
      </span>
      {todo.completed && (
        <span className="text-xs bg-emerald-900/50 text-emerald-400 px-2 py-1 rounded-full font-medium">
          ✓ Done
        </span>
      )}
      <button
        onClick={() => onRemove(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all text-lg leading-none"
        aria-label="Remove todo"
      >
        ×
      </button>
    </div>
  );
}

export default TodoItem;
