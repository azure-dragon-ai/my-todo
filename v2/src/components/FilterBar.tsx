import type { FilterType } from '../types/todo';

interface FilterBarProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: '全部' },
    { value: 'pending', label: '待完成' },
    { value: 'completed', label: '已完成' },
  ];

  return (
    <div className="filters">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          className={`filter-btn ${filter === value ? 'active' : ''}`}
          onClick={() => onFilterChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
