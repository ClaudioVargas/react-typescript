import { beforeEach, describe, expect, it, vi } from 'vitest';

const api = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));

vi.mock('../../../services/api', () => ({ default: api }));

import { create, get, remove, update } from './tema.service';
import * as status from '../../../services/status.service';

describe('tema.service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    status.clear();
  });

  it('get hace GET /tema y devuelve los temas', async () => {
    const temas = [{ id: 1, name: 'React', descripcion: 'd', createdAt: '2026-01-01' }];
    api.get.mockResolvedValue({ data: temas });

    const result = await get();

    expect(api.get).toHaveBeenCalledWith('/tema');
    expect(result).toEqual(temas);
  });

  it('create hace POST /tema con el payload', async () => {
    const payload = { name: 'Vue', descripcion: 'Framework' };
    api.post.mockResolvedValue({ data: { id: 2, ...payload, createdAt: '2026-01-01' } });

    const result = await create(payload);

    expect(api.post).toHaveBeenCalledWith('/tema', payload);
    expect(result.id).toBe(2);
  });

  it('update hace PUT /tema/{id} con el payload', async () => {
    const payload = { id: 3, name: 'Svelte', descripcion: 'Nuevo' };
    api.put.mockResolvedValue({ data: { ...payload, createdAt: 'x' } });

    await update(payload);

    expect(api.put).toHaveBeenCalledWith('/tema/3', payload);
  });

  it('remove hace DELETE /tema/{id}', async () => {
    api.delete.mockResolvedValue({});
    await remove(4);
    expect(api.delete).toHaveBeenCalledWith('/tema/4');
  });

  it('marca status error y propaga cuando la API falla', async () => {
    api.get.mockRejectedValue(new Error('red'));

    await expect(get()).rejects.toThrow('red');

    expect(status.getStatus().type).toBe('error');
  });
});