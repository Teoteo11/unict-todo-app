import type { Priority, Todo } from '../models/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  onDragEnd: () => void;
  isDragging: boolean;
  isDragOver: boolean;
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  low:    { label: 'Bassa',  className: 'bg-slate-700 text-slate-300' },
  medium: { label: 'Media',  className: 'bg-indigo-900/60 text-indigo-300' },
  high:   { label: 'Alta',   className: 'bg-rose-900/60 text-rose-300' },
};

function formatDueDate(dueDate: string): string {
  const date = new Date(dueDate + 'T00:00:00');
  return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
}

function isOverdue(dueDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate + 'T00:00:00') < today;
}

function TodoItem({ todo, onToggle, onRemove, onDragStart, onDragOver, onDrop, onDragEnd, isDragging, isDragOver }: TodoItemProps) {
  const priority = priorityConfig[todo.priority];
  const overdue = !todo.completed && todo.dueDate !== null && isOverdue(todo.dueDate);

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={`flex items-center gap-3 p-4 rounded-xl border group transition-all cursor-grab active:cursor-grabbing ${
        isDragging
          ? 'opacity-40'
          : isDragOver
          ? 'border-indigo-500 bg-slate-700'
          : todo.completed
          ? 'bg-slate-800/50 border-slate-700/50'
          : 'bg-slate-800 border-slate-700'
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 accent-indigo-500 cursor-pointer shrink-0"
      />
      <span className={`flex-1 text-sm font-medium ${
        todo.completed ? 'line-through text-slate-500' : 'text-slate-100'
      }`}>
        {todo.text}
      </span>
      <div className="flex items-center gap-2 shrink-0">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priority.className}`}>
          {priority.label}
        </span>
        {todo.dueDate !== null && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            overdue
              ? 'bg-rose-900/60 text-rose-300'
              : 'bg-slate-700 text-slate-400'
          }`}>
            {overdue ? '⚠ ' : ''}{formatDueDate(todo.dueDate)}
          </span>
        )}
        {todo.completed && (
          <span className="text-xs bg-emerald-900/50 text-emerald-400 px-2 py-0.5 rounded-full font-medium">
            ✓ Done
          </span>
        )}
      </div>
      <button
        onClick={() => onRemove(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all text-lg leading-none shrink-0"
        aria-label="Remove todo"
      >
        ×
      </button>
    </div>
  );
}

export default TodoItem;
