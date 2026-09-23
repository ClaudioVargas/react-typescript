import { beforeEach, describe, expect, it, vi } from 'vitest';

const api = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));

vi.mock('./api', () => ({ default: api }));

import { createRole, deleteRole, getRoleById, getRoles, updateRole } from './role.service';
import * as status from './status.service';

describe('role.service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    status.clear();
  });

  it('getRoles hace GET /role', async () => {
    api.get.mockResolvedValue({ data: [] });
    await getRoles();
    expect(api.get).toHaveBeenCalledWith('/role');
  });

  it('createRole hace POST /role con el payload', async () => {
    const payload = { nombre: 'Editor', descripcion: 'Puede editar' };
    api.post.mockResolvedValue({ data: { id: 1, ...payload, createdAt: 'x', updatedAt: 'x' } });

    const result = await createRole(payload);

    expect(api.post).toHaveBeenCalledWith('/role', payload);
    expect(result.id).toBe(1);
  });

  it('updateRole hace PUT /role/{id} con el payload', async () => {
    const payload = { id: 2, nombre: 'Editor', descripcion: 'Actualizado' };
    api.put.mockResolvedValue({ data: payload });

    await updateRole(payload);

    expect(api.put).toHaveBeenCalledWith('/role/2', payload);
  });

  it('getRoleById hace GET /role/{id}', async () => {
    api.get.mockResolvedValue({ data: { id: 3 } });
    await getRoleById(3);
    expect(api.get).toHaveBeenCalledWith('/role/3');
  });

  it('deleteRole hace DELETE /role/{id}', async () => {
    api.delete.mockResolvedValue({});
    await deleteRole(4);
    expect(api.delete).toHaveBeenCalledWith('/role/4');
  });

  it('registra status success al crear un rol', async () => {
    api.post.mockResolvedValue({ data: { id: 5, nombre: 'A', descripcion: 'B', createdAt: 'x', updatedAt: 'x' } });
    await createRole({ nombre: 'A', descripcion: 'B' });
    expect(status.getStatus().type).toBe('success');
  });
});