import { useState } from 'react';

interface TodoFormProps {
  onAdd: (text: string) => Promise<void>;
}

function TodoForm({ onAdd }: TodoFormProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!inputValue.trim() || isSubmitting) return;
    setIsSubmitting(true);
    await onAdd(inputValue.trim());
    setInputValue('');
    setIsSubmitting(false);
  };

  return (
    <div className="flex gap-2 mb-6">
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
  );
}

export default TodoForm;
