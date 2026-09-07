// role.service.ts
import api from './api';
import { run } from './status.service';
import type { CreateRoleRequest, Role, UpdateRoleRequest } from './role.types';

// GET /role
export const getRoles = async (): Promise<Role[]> =>
  run('getRoles', async () => {
    const res = await api.get<Role[]>('/role');
    return res.data;
  }, { message: 'Roles cargados correctamente' });

// POST /role
export const createRole = async (payload: CreateRoleRequest): Promise<Role> =>
  run('createRole', async () => {
    const res = await api.post<Role>('/role', payload);
    return res.data;
  }, { message: 'Rol creado correctamente' });

// PUT /role
export const updateRole = async (payload: UpdateRoleRequest): Promise<Role> =>
  run('updateRole', async () => {
    const res = await api.put<Role>(`/role/${payload.id}`, payload);
    return res.data;
  }, { message: 'Rol actualizado correctamente' });

// GET /role/{id}
export const getRoleById = async (id: number): Promise<Role> =>
  run('getRoleById', async () => {
    const res = await api.get<Role>(`/role/${id}`);
    return res.data;
  });

// DELETE /role/{id}
export const deleteRole = async (id: number): Promise<void> =>
  run('deleteRole', async () => {
    await api.delete(`/role/${id}`);
  }, { message: 'Rol eliminado correctamente' });