# react-typescript — Panel de métricas y gestión

Aplicación SPA construida con **React 19 + TypeScript** (Vite). Incluye autenticación con JWT, navegación con layout público/privado, gestión de usuarios y roles, vista de temas, galería demo de componentes y control global de estado de peticiones HTTP.

## Stack
- **Framework y lenguaje**: React 19 + TypeScript ~6.0 (tipado fuerte y escalabilidad).
- **Build**: Vite 8.
- **UI / Estilos**: Tailwind CSS 4 (`@import 'tailwindcss'` en `src/index.css`) y Material UI (`@mui/material`).
- **Navegación**: react-router-dom 7.
- **HTTP**: axios con interceptores (adjunta JWT y maneja 401 globalmente redirigiendo a `/login`).
- **Gráficos**: chart.js + react-chartjs-2.
- **Iconos**: lucide-react.
- **Estado y datos**: hooks personalizados (`useAuth`, `useStatus`, `useMetrics`) y contextos (`AuthContext`, `StatusContext`, `DatasetContext`).

## Estructura de carpetas
```
src/
├── assets/        # imágenes y metrics.json
├── components/    # genéricos (layout: Header, Sidebar, Tabs, Card, Button, TextInput, ...)
├── context/       # AuthContext, DatasetContext, StatusContext (+ StatusContextValue)
├── data/          # mock.ts: navegación, tabs, stats, usuarios de ejemplo
├── features/      # por dominio: auth, config, demo, tema, usuario
├── hooks/         # useAuth, useMetrics, useStatus
├── pages/         # LoginPage, Home, DashboardCharts
├── router/        # PrivateRoute
├── services/      # api.ts, role.service.ts, role.types.ts, status.service.ts, ...
├── theme/         # muiTheme.ts
├── types/         # metrics.d.ts
└── utils/         # metrics.ts
```

## Rutas
| Ruta            | Acceso                                  | Descripción |
|-----------------|-----------------------------------------|-------------|
| `/login`        | Público (si hay sesión → redirige a `/temas`) | Login con JWT |
| `/demo`         | Público                                 | Galería de componentes de ejemplo |
| `/`             | Privado (PrivateRoute)                  | Home |
| `/temas`        | Privado                                 | Vista de temas desde el backend |
| `/perfil`       | Privado                                 | Mi perfil (roles via `role.service`) |
| `/config`       | Privado                                 | Gestión de usuarios, roles y test |
| `/graficos`     | Privado                                 | Dashboard de métricas |
| `*`             | —                                       | Redirige a `/login` |

---
---

# Cambios de las últimas 2 semanas (26/08/2026 → 08/09/2026)

> Nota: estos cambios NO estaban documentados en el README y se agregan en esta actualización.

## 08/09 — Edición de usuario separada de la configuración (+ script de líneas)
- Commit `1bc8202`.
- Se crea la feature **`config`** con su propia arquitectura:
  - `ConfigPage.tsx` con pestañas (`usuarioManager`, `roleManager`, `test`).
  - `UsuarioListTab.tsx`, `RoleTab.tsx`, `TestTab.tsx`, `UserList.tsx`, `Tabs.tsx`.
  - `services/usuario.service.ts` y `types/index.ts` propios.
- La ruta `/config` reemplaza el manejo de edición de usuarios que antes vivía en `/perfil`.
- En `/perfil` (`UsuarioPage.tsx`) se simplifica a solo **Mi perfil** (`PerfilTab`).
- Se agrega el script **`contar-lineas.ps1`** que lista los archivos de `src` con más de 200 líneas.

## 07/09 — Tabs dinámicos en la ruta perfil
- Commit `5004e73`.
- En `/perfil` se integran tabs dinámicos: Mi perfil, Lista de usuarios, Gestión de roles y Test.
- Se separan en componentes independientes: `PerfilTab`, `UsuarioListTab`, `RoleTab`, `TestTab`.
- Nuevos componentes de layout reutilizables: `Button`, `Card`, `Tabs`, `Text`, `TextInput`.
- Nuevos servicios de **roles**: `src/services/role.service.ts` y `role.types.ts`.
## 03/09 — Vista principal, estilos y navegación
- Commit `54163b0`.
- Se rediseña `App.tsx` con layout `grid-cols-1 lg:grid-cols-4` (Sidebar + contenido).
- Nuevos componentes: `Sidebar` (colapsable), `Header`, `Avatar`, `Badge`, `Section`, `StatCard`.
- Se reestructura `src/components/types/index.ts` y se amplía `data/mock.ts` (navegación, stats, usuarios de ejemplo).

## 01–03/09 — Despliegue
- Commits `ad2ef96`, `5a4ba99`, `6e908b4`, `064e15c`, `da4c045`, `d5c2af3`.
- Se agrega **feature/demo** (galería de componentes: Alert, Badge, Button, Card, Checkbox, EmptyState, Header, Heading, Modal, Pagination, ProgressBar, Section, Select, Sidebar, StatCard, Table, Tabs, Text, Textarea, TextInput, Toggle).
- Se genera `Dockerfile` y `.dockerignore` (luego removidos en `6e908b4`).
- Publicación inicial en **Render** y pruebas de despliegue automático (3 intentos).

## 31/08 — Control global de respuestas HTTP
- Commit `61872da`.
- Nuevo `StatusContext` + `StatusContextValue` + `hooks/useStatus`.
- Nuevo `services/status.service.ts`: store singleton con patrón pub/sub para registrar inicio, éxito y error de cada llamada al backend, con toast automático (Snackbar de MUI) y conteo de peticiones concurrentes.
- Se corrige el consumo del servicio de temas y se limpia código.

## 26–27/08 — Rutas protegidas y autenticación
- Commits `25d4c6a`, `2da137b`, `6c2ee57`, `766a16e`, `ad94b15`, `d043072`, `0011ded`.
- Reestructura de rutas: `PublicRoute` vs `ProtectedLayout` (layout privado) y `DataLayout`.
- `PrivateRoute` redirige a `/login` (guardando `state.from`) si no hay sesión.
- `AuthContext` con persistencia del token (localStorage vía `token.service`), decodificación JWT y carga del perfil por `id`.
- Implementación de la **view Temas** (feature/tema) con consumo real del backend.
- Se eliminan `console.log`.

## Listado completo de commits (últimas 2 semanas)
| Commit     | Fecha      | Descripción |
|------------|------------|-------------|
| `1bc8202`  | 2026-09-08 | Configuración de edición de usuario separada + script de archivos >200 líneas |
| `5004e73`  | 2026-09-07 | Tabs dinámicos en perfil; gestión de roles; test |
| `54163b0`  | 2026-09-03 | Mejoras de vista principal, estilos y navegación |
| `d5c2af3`  | 2026-09-03 | Prueba de despliegue automático 3 |
| `da4c045`  | 2026-09-03 | Prueba de autodespliegue 2 |
| `064e15c`  | 2026-09-03 | Prueba para despliegue automático |
| `6e908b4`  | 2026-09-03 | Se quitan archivos docker |
| `5a4ba99`  | 2026-09-02 | Se publica en Render |
| `ad2ef96`  | 2026-09-01 | Feature/demo y Dockerfile + .dockerignore |
| `61872da`  | 2026-08-31 | StatusContext + correcciones servicio temas + limpieza |
| `0011ded`  | 2026-08-27 | Layout público/privado, obtener perfil, obtener temas |
| `d043072`  | 2026-08-27 | Resolución de conflictos |
| `ad94b15`  | 2026-08-27 | Corrige rutas de autenticación y redirección post-login |
| `766a16e`  | 2026-08-27 | Mejora la estructura de rutas |
| `6c2ee57`  | 2026-08-26 | Se guarda app |
| `2da137b`  | 2026-08-26 | Commit para merge |
| `25d4c6a`  | 2026-08-26 | Se agrega la vista Temas |

---
---

# Pruebas ejecutadas y tests

## Tests automatizados (unitarios / integración)
**No existen tests automatizados** en el proyecto a la fecha (08/09/2026):
- No hay framework configurado (sin Vitest, Jest, Testing Library, Playwright ni Cypress).
- No hay archivos `*.test.*` ni `*.spec.*` en `src/`.
- No hay script `test` en `package.json`.
- Las pestañas `TestTab` de `features/usuario` y `features/config` son *placeholders* reservados (sin bloque dinámico asociado), no suites de pruebas.

➡️ **Recomendación**: configurar Vitest + React Testing Library y cubrir por lo menos los servicios puros (`status.service`, `tema.service`, `usuario.service`) y el flujo de autenticación.

## Validaciones de compilación y calidad (prueba ejecutada)
Pruebas de consola ejecutadas el **08/09/2026** para confirmar el estado del repo:

| Comando        | Resultado | Motivo / detalle |
|----------------|-----------|------------------|
| `npm run build` | ❌ **FALLA** | `tsc -b` detecta errores de tipos (ver lista abajo) |
| `npm run lint`  | ❌ **FALLA** | `eslint .` detecta **31 errores**, 0 warnings |
| `contar-lineas.ps1` | ✅ **OK** | Lista archivos de `src` con >200 líneas y total (verificado contra `Get-Content`) |

### Errores de `npm run build` (TypeScript)
1. `src/components/types/index.ts(2,15)` — `data/mock` **no exporta** `UsuarioTabType`.
2. `src/features/config/components/ConfigPage.tsx(34,54)` — el estado `ConfigTabType` no es compatible con el tipo esperado `(id: UsuarioTabType) => void` (Tabs).
3. `src/features/usuario/components/UsuarioManager.tsx(11,7)` — la propiedad `nombre` no existe en `CreateUsuarioRequest`.
4. `src/features/usuario/components/UsuarioPage.tsx(6–16)` — imports sin uso: `Section`, `Card`, `Tabs`, `UsuarioTabType`, `tabItems`, `UsuarioListTab`, `RoleTab`, `TestTab`.

### Errores de `npm run lint` (resumen de las 31 reglas violadas)
- `@typescript-eslint/no-explicit-any` — uso de `any` en `AuthContext`, `LoginForm`, `UserList` (config), `UsuarioForm`, etc.
- `react-refresh/only-export-components` — contextos exportados junto a componentes en `AuthContext` y `DatasetContext`.
- `@typescript-eslint/no-unused-vars` — variables sin usar en `AuthContext` y `UsuarioPage`.
- `react-hooks/immutability` + variable usada antes de declararla — `fetchUsers` en `UsuarioListTab` (features/usuario y config).
- `react-hooks/set-state-in-effect` — `useMetrics.ts:9` llama `setData` dentro del efecto.
- `prefer-const` — `DashboardCharts.tsx:98` (`test`).
- `no-empty` — bloque vacío en `AuthContext.tsx:88`.

## Pruebas manuales / de despliegue realizadas
- **Flujo de login autenticado**: inicio de sesión, redirección a `/temas` y cierre de sesión — validado manualmente en entorno local con backend real.
- **Vista Temas**: carga de temas desde el servicio (se corrigió el consumo el 31/08).
- **Navegación con layout privado**: Sidebar colapsable, rutas protegidas que redirigen a `/login` sin token.
- **Gestión de usuarios (CRUD)**: borrado con `window.confirm`, edición y formulario — pruebas manuales en fase de desarrollo.
- **Control de estado HTTP**: toasts de éxito/error al operar contra el backend.
- **Despliegue**: publicación inicial en Render y 3 pruebas de despliegue automático (commits del 01–03/09).
- **Script `contar-lineas.ps1`**: ejecutado y verificado — detectó 3 archivos con >200 líneas (`assets/metrics.json`: 23714, `DemoPage.tsx`: 665, `DashboardCharts.tsx`: 236), coincidentes con el conteo independiente de `Get-Content`.

## Pendientes
- **Tests automatizados** (ver recomendación arriba) y corrección de los errores de build/lint.
- **Filtros de rango de fechas**: ver última semana, mes o trimestre.
- **Alertas automáticas** cuando una métrica crítica empeore significativamente.
- **Exportación** del reporte a PDF/Excel.
- **Visualizaciones avanzadas**: comparativos entre datasets y evolución histórica.

---
---

# Docker (referencia)
```bash
docker login

# para generar la imagen
docker build -t react-typescript:v1 .

# generar tag para vincular con repositorios en hub.docker
docker tag [IMAGEN_LOCAL] [TU_USUARIO]/[NOMBRE_REPOSITORIO]:[ETIQUETA]
docker tag react-demo:v1.0 srdarus/react-demo:v1.0

# subir
docker push TU_USUARIO/TU_IMAGEN:VERSION

# para levantar local
docker run -d -p 3000:80 --name react-app react-typescript:v1.0
```