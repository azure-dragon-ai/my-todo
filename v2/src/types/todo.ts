export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  priority: PriorityType;
}

export type PriorityType = 'high' | 'medium' | 'low';
export type FilterType = 'all' | 'pending' | 'completed';
