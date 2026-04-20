import type { Todo } from '../models/todo';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
      // Operatore ternario: apply different styles based on completed
      todo.completed
        ? 'bg-slate-800/50 border-slate-700/50'
        : 'bg-slate-800 border-slate-700'
    }`}>
      <input
        type="checkbox"
        checked={todo.completed}
        readOnly
        className="w-5 h-5 accent-indigo-500 cursor-pointer"
      />
      <span className={`flex-1 text-sm font-medium ${
        todo.completed ? 'line-through text-slate-500' : 'text-slate-100'
      }`}>
        {todo.text}
      </span>

      {/* Short-circuit &&: show the badge only if completed is true */}
      {todo.completed && (
        <span className="text-xs bg-emerald-900/50 text-emerald-400 px-2 py-1 rounded-full font-medium">
          ✓ Done
        </span>
      )}
    </div>
  );
}

export default TodoItem;
