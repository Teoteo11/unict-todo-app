import type { Priority } from '../models/todo';

export type FilterType = 'all' | 'active' | 'completed';
export type PriorityFilter = 'all' | Priority;

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  total: number;
  active: number;
  completed: number;
  activePriorityFilter: PriorityFilter;
  onPriorityFilterChange: (filter: PriorityFilter) => void;
  low: number;
  medium: number;
  high: number;
}

function FilterBar({
  activeFilter,
  onFilterChange,
  total,
  active,
  completed,
  activePriorityFilter,
  onPriorityFilterChange,
  low,
  medium,
  high,
}: FilterBarProps) {
  const statusFilters: { label: string; value: FilterType; count: number }[] = [
    { label: 'All', value: 'all', count: total },
    { label: 'Active', value: 'active', count: active },
    { label: 'Completed', value: 'completed', count: completed },
  ];

  const priorityFilters: { label: string; value: PriorityFilter; count: number }[] = [
    { label: 'Tutte', value: 'all', count: total },
    { label: 'Bassa', value: 'low', count: low },
    { label: 'Media', value: 'medium', count: medium },
    { label: 'Alta', value: 'high', count: high },
  ];

  const priorityActiveClass: Record<PriorityFilter, string> = {
    all:    'bg-indigo-600 text-white shadow',
    low:    'bg-slate-600 text-white shadow',
    medium: 'bg-indigo-600 text-white shadow',
    high:   'bg-rose-700 text-white shadow',
  };

  const priorityBadgeClass: Record<PriorityFilter, string> = {
    all:    'bg-indigo-500 text-white',
    low:    'bg-slate-500 text-white',
    medium: 'bg-indigo-500 text-white',
    high:   'bg-rose-600 text-white',
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex gap-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700">
        {statusFilters.map(({ label, value, count }) => (
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
      <div className="flex gap-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700">
        {priorityFilters.map(({ label, value, count }) => (
          <button
            key={value}
            onClick={() => onPriorityFilterChange(value)}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
              activePriorityFilter === value
                ? priorityActiveClass[value]
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              activePriorityFilter === value
                ? priorityBadgeClass[value]
                : 'bg-slate-700 text-slate-400'
            }`}>
              {count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
