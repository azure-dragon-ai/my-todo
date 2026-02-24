import type { FilterType } from '../types';
import './FilterBar.css';

interface FilterBarProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'active', label: '进行中' },
  { value: 'completed', label: '已完成' }
];

export function FilterBar({ filter, onFilterChange }: FilterBarProps) {
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
