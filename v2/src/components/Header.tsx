interface HeaderProps {
  date: string;
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
}

export function Header({ date, stats }: HeaderProps) {
  return (
    <div className="header">
      <h1>📝 待办事项</h1>
      <p>{date}</p>
      <div className="stats">
        <div className="stat">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">总计</div>
        </div>
        <div className="stat">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">待完成</div>
        </div>
        <div className="stat">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">已完成</div>
        </div>
      </div>
    </div>
  );
}
