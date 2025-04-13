export interface EventItem {
  _id?: string;
  title: string;
  category: 'exercise' | 'eating' | 'work' | 'relax' | 'family' | 'social';
  start: string;
  end: string;
  color?: string;
}

export interface Goal {
  _id?: string;
  name: string;
  color: string;
  tasks: string[];
}
