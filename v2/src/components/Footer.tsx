import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  pendingCount: number;
  hasCompleted: boolean;
  onClearCompleted: () => void;
}

export function Footer({ pendingCount, hasCompleted, onClearCompleted }: FooterProps) {
  const { t } = useLanguage();

  return (
    <div className="footer">
      <span>{t.itemsLeft.replace('{count}', pendingCount.toString())}</span>
      <button
        className="clear-completed"
        onClick={onClearCompleted}
        disabled={!hasCompleted}
        style={{ opacity: hasCompleted ? 1 : 0.5, cursor: hasCompleted ? 'pointer' : 'not-allowed' }}
      >
        {t.clearCompleted}
      </button>
    </div>
  );
}
