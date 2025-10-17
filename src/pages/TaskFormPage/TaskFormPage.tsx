import styles from './TaskFormPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppState } from '../../context/AppContext';
import { useEffect, useMemo, useState } from 'react';

export default function TaskFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { tasks, sections } = useAppState();

  const current = useMemo(() => tasks.find(t => t.id === id), [tasks, id]);

  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [dueDate, setDueDate] = useState<string>('');
  const [section, setSection] = useState<string>('General');

  useEffect(() => {
    if (isEdit) {
      if (!current) { navigate('/'); return; }
      setTitle(current.title);
      setNotes(current.notes || '');
      setDueDate(current.dueDate || '');
      setSection(current.section || 'General');
    }
  }, [isEdit, current, navigate]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    const payload = { title: trimmed, notes, dueDate: dueDate || undefined, section: section.trim() || 'General' };
    if (isEdit && current) dispatch({ type: 'UPDATE_TASK', payload: { id: current.id, ...payload } });
    else dispatch({ type: 'ADD_TASK', payload });
    navigate('/');
  }

  return (
    <div className={styles.container}>
      <h1>{isEdit ? 'Editar tarea' : 'Nueva tarea'}</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <label>
          <span>Título *</span>
          <input className="input" value={title} onChange={e => setTitle(e.target.value)} maxLength={100} required />
        </label>
        <label>
          <span>Notas</span>
          <textarea className="input" value={notes} onChange={e => setNotes(e.target.value)} maxLength={500} rows={5} />
        </label>
        <div className={styles.grid2}>
          <label>
            <span>Fecha de vencimiento</span>
            <input type="date" className="input" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          </label>
          <label>
            <span>Sección</span>
            <input className="input" list="sectionsList" value={section} onChange={e => setSection(e.target.value)} placeholder="General, Trabajo, Personal..." />
            <datalist id="sectionsList">{sections.map(s => <option key={s} value={s} />)}</datalist>
          </label>
        </div>
        <div className={styles.actions}>
          <button type="submit" className="btn btnPrimary">Guardar</button>
          <button type="button" className="btn" onClick={() => navigate('/')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
