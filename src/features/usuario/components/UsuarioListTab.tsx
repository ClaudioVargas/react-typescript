// Pestaña "Lista de usuarios": tabla de usuarios con acciones de ver (modal) y eliminar.
import React, { useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import Section from "../../../components/layout/Section";
import Card from "../../../components/layout/Card";
import Button from "../../../components/layout/Button";
import Badge from "../../../components/layout/Badge";
import { Avatar } from "../../demo/components/Avatar";
import { Modal } from "../../demo/components/Modal";
import { Table, type Column } from "../../demo/components/Table";
import { deleteUsuario, getUsuarios } from "../services/usuario.service";
import type { Usuario } from "../types";

const UsuarioListTab: React.FC = () => {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    void fetchUsers().finally(() => setLoading(false));
  }, []);

  const fetchUsers = async (): Promise<void> => {
    try {
      const data = await getUsuarios();
      setUsers(data);
    } catch {
      setError(true);
    }
  };

  const handleDelete = async (id: number, name: string): Promise<void> => {
    const confirmed = window.confirm(`¿Eliminar al usuario "${name}"? Esta acción no se puede deshacer.`);
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteUsuario(id);
      await fetchUsers();
      alert("Usuario eliminado correctamente");
    } catch {
      alert("Error al eliminar el usuario");
    } finally {
      setDeletingId(null);
    }
  };

  const columns: Column<Usuario>[] = [
    {
      key: "usuario",
      header: "Usuario",
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
    {
      key: "temas",
      header: "Temas",
      render: (row) =>
        row.temas && row.temas.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {row.temas.map((tema) => (
              <Badge key={tema} variant="info">
                {tema}
              </Badge>
            ))}
          </div>
        ) : (
          <span className="text-xs text-slate-400">Sin temas</span>
        ),
    },
    {
      key: "acciones",
      header: "Acciones",
      className: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Eye className="h-3.5 w-3.5" />}
            onClick={() => setSelectedUser(row)}
          >
            Ver
          </Button>
          <Button
            size="sm"
            variant="danger"
            leftIcon={<Trash2 className="h-3.5 w-3.5" />}
            disabled={deletingId === row.id}
            onClick={() => void handleDelete(row.id, row.name)}
          >
            {deletingId === row.id ? "Eliminando..." : "Eliminar"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <Section
        title="Lista de usuarios"
        description="Consulta y administra los usuarios del sistema."
      >
        <Card title="Usuarios" description={`${users.length} resultados`} bodyClassName="p-0">
          {loading ? (
            <p className="px-4 py-8 text-center text-sm text-slate-500">Cargando usuarios...</p>
          ) : error ? (
            <p className="px-4 py-8 text-center text-sm text-rose-600">
              No se pudieron cargar los usuarios.
            </p>
          ) : (
            <Table
              columns={columns}
              rows={users}
              rowKey={(row) => row.id}
              emptyMessage="No hay usuarios registrados."
            />
          )}
        </Card>
      </Section>

      <Modal
        open={Boolean(selectedUser)}
        title="Información del usuario"
        description="Detalles de la cuenta seleccionada."
        onClose={() => setSelectedUser(null)}
        footer={
          <Button variant="outline" onClick={() => setSelectedUser(null)}>
            Cerrar
          </Button>
        }
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <Avatar name={selectedUser.name} size="md" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900">{selectedUser.name}</p>
                <p className="truncate text-xs text-slate-500">{selectedUser.email}</p>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-xl border border-slate-100 bg-white p-3">
                <dt className="text-xs font-medium text-slate-500">ID</dt>
                <dd className="mt-0.5 text-slate-900">#{selectedUser.id}</dd>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-3">
                <dt className="text-xs font-medium text-slate-500">Email</dt>
                <dd className="mt-0.5 truncate text-slate-900">{selectedUser.email}</dd>
              </div>
            </dl>
            <div className="rounded-xl border border-slate-100 bg-white p-3">
              <span className="text-xs font-medium text-slate-500">Temas</span>
              {selectedUser.temas && selectedUser.temas.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {selectedUser.temas.map((tema) => (
                    <Badge key={tema} variant="info">
                      {tema}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="mt-1 text-xs text-slate-400">Sin temas asignados</span>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UsuarioListTab;