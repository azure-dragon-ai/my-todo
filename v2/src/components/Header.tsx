import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitch } from './LanguageSwitch';

interface HeaderProps {
  date: string;
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
}

export function Header({ date, stats }: HeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="header">
      <div className="header-top">
        <h1>{t.title}</h1>
        <LanguageSwitch />
      </div>
      <p>{date}</p>
      <div className="stats">
        <div className="stat">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">{t.total}</div>
        </div>
        <div className="stat">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">{t.pending}</div>
        </div>
        <div className="stat">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">{t.completed}</div>
        </div>
      </div>
    </div>
  );
}
