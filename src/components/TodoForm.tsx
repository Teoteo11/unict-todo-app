import { useState } from 'react';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

function TodoForm({ onAdd }: TodoFormProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    onAdd(inputValue.trim());
    setInputValue('');
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Add a new todo..."
        className="flex-1 bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
      />
      <button
        onClick={handleSubmit}
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors"
      >
        Add
      </button>
    </div>
  );
}

export default TodoForm;
