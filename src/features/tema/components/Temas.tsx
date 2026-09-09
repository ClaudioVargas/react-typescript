// Temas.tsx
// Página de gestión de temas: listado con búsqueda, paginación y detalle.
// Solo los administradores pueden crear, editar o eliminar temas.
import { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import Badge from '../../../components/layout/Badge';
import Button from '../../../components/layout/Button';
import Card from '../../../components/layout/Card';
import Section from '../../../components/layout/Section';
import Text from '../../../components/layout/Text';
import useAuth from '../../../hooks/useAuth';
import { create, get, remove, update } from '../services/tema.service';
import type { CreateTemaRequest, TemaResponse, UpdateTemaRequest } from '../types';
import { isAdmin } from '../utils/isAdmin';
import TemaFormModal from './TemaFormModal';
import EmptyState from './ui/EmptyState';
import Modal from './ui/Modal';
import Pagination from './ui/Pagination';
import Table, { type Column } from './ui/Table';

const TEMAS_PER_PAGE = 5;

const formatDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
};

const Temas: FC = () => {
  const { user } = useAuth();
  const admin = isAdmin(user);

  const [temas, setTemas] = useState<TemaResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  // Modal crear/editar: null = crear, objeto = editar, formOpen controla visibilidad.
  const [formOpen, setFormOpen] = useState(false);
  const [editingTema, setEditingTema] = useState<TemaResponse | null>(null);
  const [viewingTema, setViewingTema] = useState<TemaResponse | null>(null);
  const [deletingTema, setDeletingTema] = useState<TemaResponse | null>(null);
  const [busy, setBusy] = useState(false);

  const fetchTemas = async (): Promise<void> => {
    try {
      const data = await get();
      setTemas(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los temas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchTemas();
  }, []);

  const filteredTemas = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (query === '') return temas;
    return temas.filter(
      (tema) =>
        tema.name.toLowerCase().includes(query) ||
        tema.descripcion.toLowerCase().includes(query),
    );
  }, [temas, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredTemas.length / TEMAS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filteredTemas.slice(
    (safePage - 1) * TEMAS_PER_PAGE,
    safePage * TEMAS_PER_PAGE,
  );

  const openCreate = (): void => {
    setEditingTema(null);
    setFormOpen(true);
  };

  const openEdit = (tema: TemaResponse): void => {
    setEditingTema(tema);
    setFormOpen(true);
  };

  const handleSave = async (payload: CreateTemaRequest): Promise<void> => {
    if (editingTema) {
      const updatePayload: UpdateTemaRequest = { id: editingTema.id, ...payload };
      await update(updatePayload);
    } else {
      await create(payload);
    }
    await fetchTemas();
  };

  const handleDelete = async (): Promise<void> => {
    if (!deletingTema) return;
    setBusy(true);
    try {
      await remove(deletingTema.id);
      setDeletingTema(null);
      await fetchTemas();
    } finally {
      setBusy(false);
    }
  };

  const columns: Column<TemaResponse>[] = [
    {
      key: 'name',
      header: 'Tema',
      render: (tema) => (
        <div className="min-w-0">
          <p className="font-medium text-slate-900">{tema.name}</p>
          {tema.descripcion && (
            <p className="truncate text-xs text-slate-500">{tema.descripcion}</p>
          )}
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Creado',
      render: (tema) => <span className="text-xs text-slate-500">{formatDate(tema.createdAt)}</span>,
    },
    {
      key: 'actions',
      header: 'Acciones',
      className: 'text-right',
      render: (tema) => (
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Eye className="h-3.5 w-3.5" />}
            onClick={() => setViewingTema(tema)}
          >
            Ver
          </Button>
          {admin && (
            <>
              <Button
                size="sm"
                variant="outline"
                leftIcon={<Pencil className="h-3.5 w-3.5" />}
                onClick={() => openEdit(tema)}
              >
                Editar
              </Button>
              <Button
                size="sm"
                variant="danger"
                leftIcon={<Trash2 className="h-3.5 w-3.5" />}
                onClick={() => setDeletingTema(tema)}
              >
                Eliminar
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <Section
        title="Temas"
        description="Administra los temas disponibles para los usuarios."
      >
        <Card
          title="Temas"
          description={`${filteredTemas.length} resultados`}
          action={
            admin && (
              <Button size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={openCreate}>
                Nuevo tema
              </Button>
            )
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
                placeholder="Buscar por nombre o descripción..."
                aria-label="Buscar temas"
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition-colors duration-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            {!admin && <Badge variant="secondary">Solo lectura</Badge>}
          </div>

          {loading ? (
            <p className="px-4 py-8 text-center text-sm text-slate-500">Cargando temas...</p>
          ) : error ? (
            <p className="px-4 py-8 text-center text-sm text-rose-600">{error}</p>
          ) : filteredTemas.length === 0 ? (
            <div className="p-6">
              <EmptyState
                title={searchTerm ? 'Sin resultados' : 'Sin temas'}
                description={
                  searchTerm
                    ? 'No se encontraron temas con los filtros aplicados.'
                    : 'Todavía no hay temas registrados.'
                }
                action={
                  searchTerm && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('');
                        setPage(1);
                      }}
                    >
                      Limpiar búsqueda
                    </Button>
                  )
                }
              />
            </div>
          ) : (
            <>
              <Table
                columns={columns}
                rows={pageRows}
                rowKey={(tema) => tema.id}
                emptyMessage=""
              />
              <div className="border-t border-slate-100 px-6 py-4">
                <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
              </div>
            </>
          )}
        </Card>
      </Section>

      {/* Ver detalle */}
      <Modal
        open={Boolean(viewingTema)}
        title="Información del tema"
        description="Detalles del tema seleccionado."
        onClose={() => setViewingTema(null)}
        footer={
          <Button variant="outline" onClick={() => setViewingTema(null)}>
            Cerrar
          </Button>
        }
      >
        {viewingTema && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <Text variant="label">Nombre</Text>
              <p className="mt-1 text-sm font-semibold text-slate-900">{viewingTema.name}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <Text variant="label">Descripción</Text>
              {viewingTema.descripcion ? (
                <p className="mt-1 text-sm text-slate-700">{viewingTema.descripcion}</p>
              ) : (
                <p className="mt-1 text-xs text-slate-400">Sin descripción</p>
              )}
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <Text variant="label">Fecha de creación</Text>
              <p className="mt-1 text-sm text-slate-700">{formatDate(viewingTema.createdAt)}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Crear / editar */}
      <TemaFormModal
        open={formOpen}
        tema={editingTema}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
      />

      {/* Eliminar */}
      <Modal
        open={Boolean(deletingTema)}
        title="Eliminar tema"
        description="Esta acción no se puede deshacer."
        onClose={() => setDeletingTema(null)}
        footer={
          <>
            <Button variant="outline" onClick={() => setDeletingTema(null)}>
              Cancelar
            </Button>
            <Button variant="danger" disabled={busy} onClick={() => void handleDelete()}>
              {busy ? 'Eliminando...' : 'Eliminar tema'}
            </Button>
          </>
        }
      >
        {deletingTema && (
          <Text>
            ¿Seguro que deseas eliminar el tema{' '}
            <span className="font-medium text-slate-900">
              &quot;{deletingTema.name}&quot;
            </span>
            ?
          </Text>
        )}
      </Modal>
    </div>
  );
};

export default Temas;
