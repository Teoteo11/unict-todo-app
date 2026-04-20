export type FilterType = 'all' | 'active' | 'completed';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  total: number;
  active: number;
  completed: number;
}

function FilterBar({ activeFilter, onFilterChange, total, active, completed }: FilterBarProps) {
  const filters: { label: string; value: FilterType; count: number }[] = [
    { label: 'All', value: 'all', count: total },
    { label: 'Active', value: 'active', count: active },
    { label: 'Completed', value: 'completed', count: completed },
  ];

  return (
    <div className="flex gap-1 mb-4 bg-slate-800/50 p-1 rounded-xl border border-slate-700">
      {filters.map(({ label, value, count }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            activeFilter === value
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {label}
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            activeFilter === value
              ? 'bg-indigo-500 text-white'
              : 'bg-slate-700 text-slate-400'
          }`}>
            {count}
          </span>
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
