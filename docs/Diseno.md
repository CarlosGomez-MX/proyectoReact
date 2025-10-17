# Proyecto Final: To‑Do App con React – Documento de Diseño (Avance 1)

> App de tareas con crear/editar/eliminar, completar/incompletar, filtros (todas/pendientes/completadas), búsqueda, persistencia en localStorage, Router, estado global con Context + Reducer, CSS Modules, pruebas con Jest + RTL.

## 1) Paleta y Tipografía
- Tipografía: Inter (fallback system-ui)
- Colores: Primario #2563EB, Hover #1E40AF, Éxito #16A34A, Peligro #DC2626, Texto #0F172A, Secundario #475569, Borde #E2E8F0, Fondo #F8FAFC, Tarjeta #FFFFFF

## 2) Árbol de componentes
```
<App>
  <Header/>
  <MainLayout>
    <TopBar>
      <TaskFilters/> <TaskSearch/> <LinkButton to="/new">Nueva tarea</LinkButton>
    </TopBar>
    <Routes>
      <Route path="/" element={<TaskListPage/>}/>
      <Route path="/new" element={<TaskFormPage mode="create"/>}/>
      <Route path="/edit/:id" element={<TaskFormPage mode="edit"/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  </MainLayout>
</App>
```

## 3) Wireframes (texto)
**Home**: Header con título y “X pendientes”; Tabs (Todas/Pendientes/Completadas), búsqueda y botón “+ Nueva tarea”; lista con checkbox, título, acciones (editar/borrar); EmptyState si no hay resultados.  
**Formulario**: Card centrada (Título requerido, Notas opcional), botones Guardar/Cancelar.  
**404**: Mensaje y botón “Volver al inicio”.

## 4) Estado Global y Tipos
```ts
export type Task = { id:string; title:string; notes?:string; completed:boolean; createdAt:number; updatedAt:number };
export type Filter = 'all'|'active'|'completed';
export type State = { tasks:Task[]; filter:Filter; search:string; loaded:boolean };
export type Action =
 | { type:'LOAD_FROM_STORAGE'; payload:Task[] }
 | { type:'ADD_TASK'; payload:{ title:string; notes?:string } }
 | { type:'UPDATE_TASK'; payload:{ id:string; title:string; notes?:string } }
 | { type:'DELETE_TASK'; payload:{ id:string } }
 | { type:'TOGGLE_TASK'; payload:{ id:string } }
 | { type:'SET_FILTER'; payload:{ filter:Filter } }
 | { type:'SET_SEARCH'; payload:{ search:string } };
```

## 5) Persistencia localStorage
- Clave: `todoapp.v1.state`
- Leer al montar provider; guardar en `useEffect` cuando cambien `tasks`.

## 6) Rutas
`/`, `/new`, `/edit/:id`, `*`.

## 7) Validaciones/UX
- Título requerido (1–100), Notas (≤500), confirmación al borrar, estados vacíos, accesibilidad básica.

## 8) Estilos (CSS Modules)
- `Componente.module.css`, variables CSS, contenedor máx 960px.

## 9) Testing (plan)
- Reducer (todas las acciones), componentes (Filters/Search/Item), integración (crear→listar→editar→filtrar→borrar), mock de localStorage. Meta ≥80%.

## 10) Animaciones y optimización
- Transitions al completar; `React.memo` y `useMemo` para evitar renders innecesarios.
