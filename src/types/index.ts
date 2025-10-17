export type Task = {
  id: string;
  title: string;
  notes?: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
  dueDate?: string;
  section: string;
};

export type Filter = 'all' | 'active' | 'completed';

export type State = {
  tasks: Task[];
  filter: Filter;
  search: string;
  loaded: boolean;
  sections: string[];
  sectionFilter: 'all' | string;
};

export type Action =
  | { type: 'LOAD_FROM_STORAGE'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: { title: string; notes?: string; dueDate?: string; section?: string } }
  | { type: 'UPDATE_TASK'; payload: { id: string; title: string; notes?: string; dueDate?: string; section?: string } }
  | { type: 'DELETE_TASK'; payload: { id: string } }
  | { type: 'TOGGLE_TASK'; payload: { id: string } }
  | { type: 'SET_FILTER'; payload: { filter: Filter } }
  | { type: 'SET_SEARCH'; payload: { search: string } }
  | { type: 'ADD_SECTION'; payload: { name: string } }
  | { type: 'SET_SECTION_FILTER'; payload: { section: 'all' | string } };
