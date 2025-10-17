# Proyecto Tareas

> Aplicación web de tareas con funcionalidades completas: crear, editar, eliminar, marcar como completadas o pendientes, filtros (todas / pendientes / completadas), secciones personalizadas, fecha de vencimiento, búsqueda, persistencia en localStorage, navegación con React Router, estado global con Context + Reducer, estilos modulares con CSS Modules y pruebas con Jest + RTL.

---

## 1) Paleta y Tipografía
- Tipografía: Inter (fallback system-ui)
- Colores principales:
  - Primario: #2563EB
  - Hover: #1E40AF
  - Éxito: #16A34A
  - Peligro: #DC2626
  - Texto: #0F172A
  - Secundario: #475569
  - Borde: #E2E8F0
  - Fondo: #F8FAFC
  - Tarjeta: #FFFFFF

---

## 2) Árbol de componentes
    <App>
      <Header/>
      <MainLayout>
        <TopBar>
          <TaskFilters/>
          <TaskSearch/>
          <SectionFilter/>       {/* filtro por sección */}
          <LinkButton to="/new">Nueva tarea</LinkButton>
        </TopBar>
        <Routes>
          <Route path="/" element={<TaskListPage/>}/>
          <Route path="/new" element={<TaskFormPage mode="create"/>}/>
          <Route path="/edit/:id" element={<TaskFormPage mode="edit"/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </MainLayout>
    </App>

---

## 3) Wireframes (texto)

### Home
- Header con título y contador de tareas pendientes.
- Tabs de filtro: Todas, Pendientes, Completadas.
- Barra superior con buscador, filtro por sección y botón “+ Nueva tarea”.
- Lista de tareas:
  - Checkbox de completado, título, badge de sección, fecha de vencimiento.
  - Acciones: editar / borrar.
- Orden:
  1. Con fecha de vencimiento más próxima primero.
  2. Sin fecha, por creación (más recientes arriba).

### Formulario
- Card centrada con campos:
  - Título (requerido)
  - Notas (opcional)
  - Fecha de vencimiento (date)
  - Sección (input libre o selección existente)
- Botones: Guardar / Cancelar.

### 404
- Mensaje “Página no encontrada” y enlace a inicio.

---

## 4) Estado Global y Tipos (conceptual)
    // Representación lógica (sin TypeScript)
    Task = {
      id: string,
      title: string,
      notes?: string,
      completed: boolean,
      createdAt: number,
      updatedAt: number,
      dueDate?: string,
      section: string
    }

    State = {
      tasks: Task[],
      filter: 'all' | 'active' | 'completed',
      search: string,
      loaded: boolean,
      sections: string[],    // lista de secciones únicas
      sectionFilter: string  // 'all' o nombre de sección
    }

    Acciones:
    - LOAD_FROM_STORAGE
    - ADD_TASK
    - UPDATE_TASK
    - DELETE_TASK
    - TOGGLE_TASK
    - SET_FILTER
    - SET_SEARCH
    - ADD_SECTION
    - SET_SECTION_FILTER

---

## 5) Persistencia localStorage
- Clave: `todoapp.v1.state`
- Carga inicial al montar el Provider.
- Guardado automático al cambiar `tasks`.
- Se persisten también sección y fecha de vencimiento.

---

## 6) Rutas
- `/` → Lista de tareas
- `/new` → Crear nueva tarea
- `/edit/:id` → Editar tarea existente
- `*` → Página de error 404

---

## 7) Validaciones / UX
- Título requerido (1–100).
- Notas opcional (≤500).
- Fecha de vencimiento opcional (YYYY-MM-DD).
- Sección opcional (por defecto “General”).
- Confirmación al borrar.
- Estado vacío descriptivo.
- Accesibilidad básica (labels y aria-labels).

---

## 8) Estilos (CSS Modules)
- Un `.module.css` por componente.
- Variables de color/tipografía en `index.css`.
- Layout centrado (máx 960px).
- Badges para mostrar sección.
- Paleta neutra con acento azul.

---

## 9) Testing (plan)
- Reducer: todas las acciones (incluye dueDate y secciones).
- Componentes: Filters, Search, SectionFilter, TaskItem.
- Integración: crear → listar → editar → filtrar → borrar.
- Mock de localStorage.
- Cobertura objetivo ≥ 80 %.

---

## 10) Animaciones y Optimización
- Transiciones al completar/eliminar.
- `React.memo` y `useMemo` en listas/filtros.
- Orden por fecha memoizado.
- Mejora futura: destacar tareas vencidas.

---

## 11) Resumen
Aplicación con gestión de tareas que incluye fechas de vencimiento, secciones personalizadas, búsqueda y filtros, con persistencia local. Arquitectura modular, mantenible y lista para despliegue (Netlify u otro).
