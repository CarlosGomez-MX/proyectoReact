import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { Action, State, Task } from '../types';
import { loadTasks, saveTasks } from '../utils/storage';

const initialState: State = {
  tasks: [], filter: 'all', search: '', loaded: false,
  sections: ['General'], sectionFilter: 'all',
};

function uuid() {
  if ('crypto' in globalThis && 'randomUUID' in crypto) return crypto.randomUUID();
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
function ensureSectionList(sections: string[], name: string) {
  const clean = (name || 'General').trim() || 'General';
  return sections.includes(clean) ? sections : [...sections, clean];
}
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOAD_FROM_STORAGE': {
      const tasks = action.payload
        .map(t => ({ ...t, section: t.section ?? 'General' }))
        .sort((a, b) => b.createdAt - a.createdAt);
      const sectionsFromTasks = Array.from(new Set(tasks.map(t => t.section))).filter(Boolean);
      const sections = Array.from(new Set(['General', ...state.sections, ...sectionsFromTasks]));
      return { ...state, tasks, sections, loaded: true };
    }
    case 'ADD_TASK': {
      const now = Date.now();
      const section = (action.payload.section || 'General').trim() || 'General';
      const newTask: Task = {
        id: uuid(), title: action.payload.title.trim(),
        notes: action.payload.notes?.trim() || '', completed: false,
        createdAt: now, updatedAt: now, dueDate: action.payload.dueDate || undefined, section,
      };
      const sections = ensureSectionList(state.sections, section);
      return { ...state, sections, tasks: [newTask, ...state.tasks] };
    }
    case 'UPDATE_TASK': {
      const { id, title, notes, dueDate, section } = action.payload;
      const cleanSection = (section ?? '').trim();
      const sections = cleanSection ? ensureSectionList(state.sections, cleanSection) : state.sections;
      return {
        ...state, sections,
        tasks: state.tasks.map(t =>
          t.id === id
            ? { ...t, title: title.trim(), notes: (notes || '').trim(), dueDate: dueDate || undefined, section: cleanSection || t.section || 'General', updatedAt: Date.now() }
            : t
        ),
      };
    }
    case 'DELETE_TASK': return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload.id) };
    case 'TOGGLE_TASK': return { ...state, tasks: state.tasks.map(t => t.id === action.payload.id ? { ...t, completed: !t.completed, updatedAt: Date.now() } : t) };
    case 'SET_FILTER': return { ...state, filter: action.payload.filter };
    case 'SET_SEARCH': return { ...state, search: action.payload.search };
    case 'ADD_SECTION': {
      const name = (action.payload.name || '').trim(); if (!name || state.sections.includes(name)) return state;
      return { ...state, sections: [...state.sections, name] };
    }
    case 'SET_SECTION_FILTER': return { ...state, sectionFilter: action.payload.section };
    default: return state;
  }
}
const AppStateContext = createContext<State | undefined>(undefined);
const AppDispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => { dispatch({ type: 'LOAD_FROM_STORAGE', payload: loadTasks() }); }, []);
  useEffect(() => { if (state.loaded) saveTasks(state.tasks); }, [state.tasks, state.loaded]);
  const value = useMemo(() => state, [state]);
  return (<AppStateContext.Provider value={value}><AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider></AppStateContext.Provider>);
}
export function useAppState(){ const ctx = useContext(AppStateContext); if(!ctx) throw new Error('useAppState must be used within AppProvider'); return ctx; }
export function useAppDispatch(){ const ctx = useContext(AppDispatchContext); if(!ctx) throw new Error('useAppDispatch must be used within AppProvider'); return ctx; }
export function useVisibleTasks() {
  const { tasks, filter, search, sectionFilter } = useAppState();
  const term = search.toLowerCase().trim();
  return React.useMemo(() => {
    let filtered = tasks;
    if (filter === 'active') filtered = filtered.filter(t => !t.completed);
    if (filter === 'completed') filtered = filtered.filter(t => t.completed);
    if (sectionFilter !== 'all') filtered = filtered.filter(t => t.section === sectionFilter);
    if (term) filtered = filtered.filter(t => t.title.toLowerCase().includes(term) || (t.notes || '').toLowerCase().includes(term));
    const withDue = filtered.filter(t => t.dueDate).sort((a,b)=> new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime());
    const withoutDue = filtered.filter(t => !t.dueDate).sort((a,b)=> b.createdAt - a.createdAt);
    return [...withDue, ...withoutDue];
  }, [tasks, filter, term, sectionFilter]);
}
export { reducer, initialState };
