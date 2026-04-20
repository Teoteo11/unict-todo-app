import type { Todo } from '../models/todo';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-slate-800 rounded-xl border border-slate-700 group">
      <input
        type="checkbox"
        checked={todo.completed}
        readOnly
        className="w-5 h-5 accent-indigo-500 cursor-pointer rounded"
      />
      <span
        className={`flex-1 text-sm font-medium transition-all ${
          todo.completed
            ? 'line-through text-slate-500'
            : 'text-slate-100'
        }`}
      >
        {todo.text}
      </span>
    </div>
  );
}

export default TodoItem;
