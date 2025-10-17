import styles from './TaskFilters.module.css';
import { Filter } from '../../types';
import { useAppDispatch, useAppState } from '../../context/AppContext';

const options: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'active', label: 'Pendientes' },
  { key: 'completed', label: 'Completadas' },
];

export default function TaskFilters() {
  const { filter } = useAppState();
  const dispatch = useAppDispatch();

  return (
    <div className={styles.group} role="tablist" aria-label="Filtros de tareas">
      {options.map(o => (
        <button
          key={o.key}
          role="tab"
          aria-selected={filter === o.key}
          className={filter === o.key ? styles.btnActive : styles.btn}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: o.key } })}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
