import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/AppContext';

export default function Header() {
  const { tasks } = useAppState();
  const pending = tasks.filter(t => !t.completed).length;

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.row}>
          <Link to="/" className={styles.brand}>tareas_seminario</Link>
          <span className="badge" aria-label={`Tareas pendientes: ${pending}`}>{pending} pendientes</span>
        </div>
      </div>
    </header>
  );
}
