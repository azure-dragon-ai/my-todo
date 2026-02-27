import type { FilterType } from '../types/todo';
import { useLanguage } from '../contexts/LanguageContext';

interface FilterBarProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  const { t } = useLanguage();

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: t.filterAll },
    { value: 'pending', label: t.filterPending },
    { value: 'completed', label: t.filterCompleted },
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
