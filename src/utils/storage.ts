import { Task } from '../types';
const KEY = 'todoapp.v1.state';

export function saveTasks(tasks: Task[]) {
  try { localStorage.setItem(KEY, JSON.stringify({ tasks })); } catch {}
}
export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed?.tasks) ? (parsed.tasks as Task[]) : [];
  } catch { return []; }
}
