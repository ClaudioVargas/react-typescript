import { useEffect, useMemo, useState } from 'react';
import {
  Bell,
  Check,
  Download,
  Eye,
  FileText,
  Mail,
  Plus,
  Search,
  UserPlus,
} from 'lucide-react';
import {
  navItems,
  navSecondary,
  roleOptions,
  stats,
  tabs as tabItems,
  users,
} from '../data/mock';
import type { BadgeVariant, SelectOption, UserRow } from '../types';
import { Alert, type AlertVariant } from './Alert';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Button } from './Button';
import { Card } from './Card';
import { Checkbox } from './Checkbox';
import { EmptyState } from './EmptyState';
import { Header } from './Header';
import { Heading } from './Heading';
import { Modal } from './Modal';
import { Pagination } from './Pagination';
import { ProgressBar } from './ProgressBar';
import { Section } from './Section';
import { Select } from './Select';
import { Sidebar } from './Sidebar';
import { StatCard } from './StatCard';
import { Table, type Column } from './Table';
import { Tabs } from './Tabs';
import { Text } from './Text';
import { Textarea } from './Textarea';
import { TextInput } from './TextInput';
import { Toggle } from './Toggle';

const USERS_PER_PAGE = 5;

const STATUS_VARIANT: Record<UserRow['status'], BadgeVariant> = {
  Activo: 'success',
  Inactivo: 'secondary',
  Pendiente: 'warning',
};

const statusFilterOptions: SelectOption[] = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'Activo', label: 'Activo' },
  { value: 'Inactivo', label: 'Inactivo' },
  { value: 'Pendiente', label: 'Pendiente' },
];

const featureCards = [
  {
    id: 'reportes',
    title: 'Reportes automáticos',
    description: 'Genera informes periódicos a partir de las métricas del dashboard.',
    icon: FileText,
    tag: 'Nuevo',
    variant: 'primary' as const,
  },
  {
    id: 'alertas',
    title: 'Alertas por correo',
    description: 'Notificaciones por email ante eventos relevantes del sistema.',
    icon: Mail,
    tag: 'Beta',
    variant: 'info' as const,
  },
  {
    id: 'centro',
    title: 'Centro de notificaciones',
    description: 'Centraliza avisos y recordatorios para todo el equipo.',
    icon: Bell,
    tag: 'Activo',
    variant: 'success' as const,
  },
];

const columns: Column<UserRow>[] = [
  {
    key: 'name',
    header: 'Usuario',
    render: (row) => (
      <div className="flex items-center gap-3">
        <Avatar name={row.name} size="sm" />
        <div className="min-w-0">
          <p className="font-medium text-slate-900">{row.name}</p>
          <p className="truncate text-xs text-slate-500">{row.email}</p>
        </div>
      </div>
    ),
  },
  { key: 'role', header: 'Rol' },
  {
    key: 'status',
    header: 'Estado',
    render: (row) => (
      <Badge variant={STATUS_VARIANT[row.status]} dot>
        {row.status}
      </Badge>
    ),
  },
  { key: 'joinedAt', header: 'Alta' },
  {
    key: 'actions',
    header: 'Acciones',
    className: 'text-right',
    render: () => (
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="outline" leftIcon={<Eye className="h-3.5 w-3.5" />}>
          Ver
        </Button>
      </div>
    ),
  },
];

export const DemoPage: React.FC = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('resumen');
  const [modalOpen, setModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [newsChecked, setNewsChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [compactEnabled, setCompactEnabled] = useState(false);

  const [alerts, setAlerts] = useState<Record<AlertVariant, boolean>>({
    info: true,
    success: true,
    warning: true,
    danger: true,
  });

  useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter]);

  const filteredUsers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return users.filter((user) => {
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesQuery =
        query === '' || `${user.name} ${user.email}`.toLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });
  }, [searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filteredUsers.slice(
    (safePage - 1) * USERS_PER_PAGE,
    safePage * USERS_PER_PAGE,
  );

  const dismissAlert = (variant: AlertVariant) =>
    setAlerts((current) => ({ ...current, [variant]: false }));

  const resetAlerts = () => setAlerts({ info: true, success: true, warning: true, danger: true });

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-slate-50 lg:grid-cols-4">
      <Sidebar
        items={navItems}
        secondaryItems={navSecondary}
        activeId={activeNav}
        onChange={setActiveNav}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <main className="min-w-0 lg:col-span-3">
        <Header
          title="Panel de componentes"
          subtitle="Maqueta demo: tipografía, formularios, tablas, modales y más"
          onMenuClick={() => setMobileOpen(true)}
        />

        <div className="space-y-10 p-6 md:p-8">
          {/* Estadísticas */}
          <Section title="Indicadores clave" description="Tarjetas de estadística para dashboards.">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.id} stat={stat} />
              ))}
            </div>
          </Section>

          {/* Tipografía */}
          <Section title="Tipografía" description="Jerarquía de encabezados y estilos de texto.">
            <Card bodyClassName="space-y-6">
              <div className="space-y-3">
                <Heading as="h1">Heading 1 — Título principal</Heading>
                <Heading as="h2">Heading 2 — Título de sección</Heading>
                <Heading as="h3">Heading 3 — Subtítulo</Heading>
                <Heading as="h4">Heading 4 — Título pequeño</Heading>
              </div>
              <div className="h-px bg-slate-100" />
              <div className="space-y-2">
                <Text variant="label">Etiqueta / label principal</Text>
                <Text variant="lead">
                  Texto destacado (lead): una breve introducción a la sección con un tamaño de
                  letra mayor.
                </Text>
                <Text>
                  Texto de cuerpo: usado como contenido principal en párrafos, descripciones y
                  ayudas.
                </Text>
                <Text variant="muted">
                  Texto secundario (muted): ideal para notas, avisos y contenido de menor énfasis.
                </Text>
                <Text variant="small">
                  Texto pequeño: para metadatos, fechas y detalles complementarios.
                </Text>
              </div>
            </Card>
          </Section>

          {/* Botones */}
          <Section title="Botones" description="Variantes, tamaños, estados e iconos.">
            <Card bodyClassName="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primario</Button>
                <Button variant="secondary">Secundario</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Peligro</Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>
                  Nuevo
                </Button>
                <Button size="md" leftIcon={<Mail className="h-4 w-4" />}>
                  Enviar
                </Button>
                <Button size="lg" rightIcon={<Download className="h-4 w-4" />}>
                  Descargar
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button disabled>Deshabilitado</Button>
                <Button variant="outline" disabled>
                  Outline deshabilitado
                </Button>
              </div>
              <Button variant="primary" fullWidth>
                Botón de ancho completo
              </Button>
            </Card>
          </Section>

          {/* Formularios */}
          <Section
            title="Formularios"
            description="Inputs, select, textarea, checkboxes y switch con estado local."
          >
            <Card bodyClassName="space-y-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <TextInput
                  label="Nombre"
                  placeholder="Ej: Laura Sánchez"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  hint="Nombre visible para otros usuarios."
                />
                <TextInput
                  label="Correo electrónico"
                  type="email"
                  placeholder="usuario@demo.com"
                  leftIcon={<Mail className="h-4 w-4" />}
                  hint="Usa tu correo corporativo."
                />
                <TextInput
                  label="Contraseña"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  error="La contraseña debe tener al menos 8 caracteres."
                />
                <Select
                  label="Rol"
                  options={roleOptions}
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  hint="Define los permisos del usuario."
                />
              </div>
              <Textarea
                label="Comentarios"
                placeholder="Escribe un mensaje..."
                hint="Máximo 250 caracteres."
              />
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                  <Checkbox
                    label="Recibir novedades"
                    description="Boletín mensual con actualizaciones."
                    checked={newsChecked}
                    onChange={setNewsChecked}
                  />
                  <Checkbox
                    label="Aceptar los términos"
                    description="Requerido para continuar."
                    checked={termsChecked}
                    onChange={setTermsChecked}
                  />
                  <Checkbox
                    label="Opción deshabilitada"
                    description="No disponible en esta versión."
                    checked={false}
                    onChange={() => undefined}
                    disabled
                  />
                </div>
                <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                  <Toggle
                    label="Notificaciones push"
                    description="Recibe avisos en tiempo real."
                    checked={pushEnabled}
                    onChange={setPushEnabled}
                  />
                  <Toggle
                    label="Modo compacto"
                    description="Reduce el espaciado de la interfaz."
                    checked={compactEnabled}
                    onChange={setCompactEnabled}
                  />
                </div>
              </div>
            </Card>
          </Section>

          {/* Labels y badges */}
          <Section title="Labels y badges" description="Etiquetas de estado para resaltar información.">
            <Card bodyClassName="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="primary">Label principal</Badge>
                <Badge variant="secondary">Label secundario</Badge>
                <Badge variant="success">Completado</Badge>
                <Badge variant="warning">Pendiente</Badge>
                <Badge variant="danger">Error</Badge>
                <Badge variant="info">Información</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="success" dot>
                  En línea
                </Badge>
                <Badge variant="warning" dot>
                  En revisión
                </Badge>
                <Badge variant="danger" dot>
                  Falló
                </Badge>
                <Badge variant="secondary" dot>
                  Sin cambios
                </Badge>
              </div>
            </Card>
          </Section>

          {/* Grilla de tarjetas */}
          <Section
            title="Grilla de tarjetas"
            description="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6."
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featureCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.id}
                    className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-colors duration-200 hover:border-slate-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <Badge variant={card.variant}>{card.tag}</Badge>
                    </div>
                    <h3 className="mt-5 text-sm font-semibold text-slate-900">{card.title}</h3>
                    <p className="mt-1.5 text-sm text-slate-500">{card.description}</p>
                    <div className="mt-5">
                      <Button size="sm" variant="outline">
                        Ver más
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          </Section>

          {/* Pestañas */}
          <Section title="Pestañas" description="Cambia el panel de contenido con estado local.">
            <Card title="Contenido dinámico" bodyClassName="space-y-5">
              <Tabs tabs={tabItems} activeId={activeTab} onChange={setActiveTab} />
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                {activeTab === 'resumen' && (
                  <div className="space-y-4">
                    <Text variant="muted">
                      Este panel resume los indicadores más relevantes del día.
                    </Text>
                    <ProgressBar label="Carga de datos" value={42} />
                    <ProgressBar label="Completado" value={100} />
                    <ProgressBar label="En proceso" value={76} />
                  </div>
                )}
                {activeTab === 'actividad' && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Nuevo usuario registrado
                        </p>
                        <p className="text-xs text-slate-500">Hace 12 minutos</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Reporte semanal generado
                        </p>
                        <p className="text-xs text-slate-500">Hace 1 hora</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Actualización pendiente
                        </p>
                        <p className="text-xs text-slate-500">Hace 3 horas</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'configuracion' && (
                  <div className="space-y-4">
                    <Text variant="muted">
                      Panel de configuración con opciones avanzadas para administradores.
                    </Text>
                    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900">Permisos de equipo</p>
                        <p className="text-xs text-slate-500">4 miembros con acceso</p>
                      </div>
                      <Badge variant="info">Beta</Badge>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </Section>

          {/* Tabla de datos */}
          <Section
            title="Tabla de datos"
            description="Filtra por nombre, correo o estado y navega entre páginas."
          >
            <Card
              title="Usuarios"
              description={`${filteredUsers.length} resultados`}
              action={
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>
                    Exportar
                  </Button>
                  <Button size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>
                    Nuevo usuario
                  </Button>
                </div>
              }
              bodyClassName="p-0"
            >
              <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:max-w-xs">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Buscar por nombre o correo..."
                    aria-label="Buscar usuarios"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition-colors duration-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <Select
                  aria-label="Filtrar por estado"
                  options={statusFilterOptions}
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="w-full md:w-48"
                />
              </div>

              {filteredUsers.length === 0 ? (
                <div className="p-6">
                  <EmptyState
                    title="Sin resultados"
                    description="No se encontraron usuarios con los filtros aplicados."
                    action={
                      <Button size="sm" variant="outline" onClick={clearFilters}>
                        Limpiar filtros
                      </Button>
                    }
                  />
                </div>
              ) : (
                <>
                  <Table
                    columns={columns}
                    rows={pageRows}
                    rowKey={(row) => row.id}
                    emptyMessage=""
                  />
                  <div className="border-t border-slate-100 px-6 py-4">
                    <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
                  </div>
                </>
              )}
            </Card>
          </Section>

          {/* Feedback */}
          <Section
            title="Feedback y progreso"
            description="Alertas descartables, barras de progreso y avatares."
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card title="Alertas" bodyClassName="space-y-4">
                {alerts.info && (
                  <Alert variant="info" title="Información" onClose={() => dismissAlert('info')}>
                    Los datos se actualizaron hace 5 minutos.
                  </Alert>
                )}
                {alerts.success && (
                  <Alert
                    variant="success"
                    title="Operación exitosa"
                    onClose={() => dismissAlert('success')}
                  >
                    El usuario fue guardado correctamente.
                  </Alert>
                )}
                {alerts.warning && (
                  <Alert
                    variant="warning"
                    title="Atención"
                    onClose={() => dismissAlert('warning')}
                  >
                    Quedan 3 días para renovar la licencia.
                  </Alert>
                )}
                {alerts.danger && (
                  <Alert variant="danger" title="Error" onClose={() => dismissAlert('danger')}>
                    No se pudo conectar con el servidor.
                  </Alert>
                )}
                <Button size="sm" variant="secondary" onClick={resetAlerts}>
                  Restaurar alertas
                </Button>
              </Card>

              <Card title="Progreso y avatares" bodyClassName="space-y-6">
                <ProgressBar label="Carga de datos" value={42} />
                <ProgressBar label="Completado" value={100} />
                <ProgressBar label="En proceso" value={76} />
                <div className="h-px bg-slate-100" />
                <div className="flex items-center gap-4">
                  <Avatar name="Laura Sánchez" status="online" size="lg" />
                  <Avatar name="Carlos García" status="away" size="md" />
                  <Avatar name="María López" status="offline" size="md" />
                  <Avatar name="Ana Torres" size="sm" />
                </div>
              </Card>
            </div>
          </Section>

          {/* Modal */}
          <Section
            title="Modal"
            description="Diálogo controlado con estado local; se cierra con la X, el fondo o Escape."
          >
            <Card bodyClassName="flex flex-col items-start gap-4">
              <Text variant="muted">
                Haz clic en el botón para abrir el modal de confirmación de invitación a un
                usuario.
              </Text>
              <Button leftIcon={<UserPlus className="h-4 w-4" />} onClick={() => setModalOpen(true)}>
                Abrir modal
              </Button>
            </Card>
          </Section>
        </div>
      </main>

      <Modal
        open={modalOpen}
        title="¿Confirmas la invitación?"
        description="Revisa los datos antes de continuar."
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              leftIcon={<Check className="h-4 w-4" />}
              onClick={() => setModalOpen(false)}
            >
              Confirmar invitación
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
            <Avatar name="Jorge Vidal" size="sm" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-900">Jorge Vidal</p>
              <p className="truncate text-xs text-slate-500">jorge.vidal@demo.com</p>
            </div>
            <Badge variant="info" className="ml-auto">
              Editor
            </Badge>
          </div>
          <Text variant="muted">
            El usuario recibirá un correo con el enlace de acceso. Podrás cambiar sus permisos en
            cualquier momento.
          </Text>
        </div>
      </Modal>
    </div>
  );
};

export default DemoPage;