interface FooterProps {
  pendingCount: number;
  hasCompleted: boolean;
  onClearCompleted: () => void;
}

export function Footer({ pendingCount, hasCompleted, onClearCompleted }: FooterProps) {
  return (
    <div className="footer">
      <span>{pendingCount} 个项目待完成</span>
      <button
        className="clear-completed"
        onClick={onClearCompleted}
        disabled={!hasCompleted}
        style={{ opacity: hasCompleted ? 1 : 0.5, cursor: hasCompleted ? 'pointer' : 'not-allowed' }}
      >
        清除已完成
      </button>
    </div>
  );
}
