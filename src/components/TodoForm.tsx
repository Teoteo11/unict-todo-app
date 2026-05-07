import { useState } from 'react';
import type { Priority } from '../models/todo';

interface TodoFormProps {
  onAdd: (text: string, priority: Priority, dueDate: string | null) => Promise<void>;
}

function TodoForm({ onAdd }: TodoFormProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!inputValue.trim() || isSubmitting) return;
    setIsSubmitting(true);
    await onAdd(inputValue.trim(), priority, dueDate || null);
    setInputValue('');
    setPriority('medium');
    setDueDate('');
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-2 mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Add a new todo..."
          disabled={isSubmitting}
          className="flex-1 bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition disabled:opacity-50"
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '...' : 'Add'}
        </button>
      </div>
      <div className="flex gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          disabled={isSubmitting}
          className="bg-slate-800 border border-slate-700 text-slate-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition disabled:opacity-50 cursor-pointer"
        >
          <option value="low">🟢 Bassa</option>
          <option value="medium">🟡 Media</option>
          <option value="high">🔴 Alta</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={isSubmitting}
          className="flex-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition disabled:opacity-50"
        />
      </div>
    </div>
  );
}

export default TodoForm;
