import { beforeEach, describe, expect, it, vi } from 'vitest';

const api = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));

vi.mock('../../../services/api', () => ({ default: api }));

import * as usuarioService from './usuario.service';
import * as configUsuarioService from '../../config/services/usuario.service';
import * as status from '../../../services/status.service';

describe('usuario.service (features/usuario)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    status.clear();
  });

  it('getUsuarios hace GET /usuarios', async () => {
    api.get.mockResolvedValue({ data: [{ id: 1, name: 'Ana' }] });
    const result = await usuarioService.getUsuarios();
    expect(api.get).toHaveBeenCalledWith('/usuarios');
    expect(result).toHaveLength(1);
  });

  it('createUsuario hace POST /usuarios con el payload', async () => {
    const payload = { name: 'Ana', email: 'a@b.com', password: 'x' };
    api.post.mockResolvedValue({ data: { id: 1 } });

    await usuarioService.createUsuario(payload);

    expect(api.post).toHaveBeenCalledWith('/usuarios', payload);
  });

  it('updateUsuario hace PUT /usuarios con el payload', async () => {
    const payload = { id: 2, name: 'Ana', roleId: 1 };
    api.put.mockResolvedValue({ data: { ...payload } });

    await usuarioService.updateUsuario(payload);

    expect(api.put).toHaveBeenCalledWith('/usuarios', payload);
  });

  it('getUsuarioById hace GET /usuario/{id}', async () => {
    api.get.mockResolvedValue({ data: { id: 2 } });
    await usuarioService.getUsuarioById(2);
    expect(api.get).toHaveBeenCalledWith('/usuario/2');
  });

  it('deleteUsuario devuelve true cuando el status es 200', async () => {
    api.delete.mockResolvedValue({ status: 200 });
    const result = await usuarioService.deleteUsuario(1);
    expect(api.delete).toHaveBeenCalledWith('/usuarios/1');
    expect(result).toBe(true);
  });

  it('deleteUsuario devuelve false cuando el status no es 200', async () => {
    api.delete.mockResolvedValue({ status: 500 });
    const result = await usuarioService.deleteUsuario(1);
    expect(result).toBe(false);
  });

  it('addTemaToUsuario hace POST /usuario/addTema', async () => {
    const payload = { usuarioId: 1, tema: 'React' };
    api.post.mockResolvedValue({ data: { id: 1 } });

    await usuarioService.addTemaToUsuario(payload);

    expect(api.post).toHaveBeenCalledWith('/usuario/addTema', payload);
  });
});

describe('usuario.service (features/config) — mismo contrato', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    status.clear();
  });

  it('usa los mismos endpoints que el servicio de features/usuario', async () => {
    api.get.mockResolvedValue({ data: [] });
    await configUsuarioService.getUsuarios();
    expect(api.get).toHaveBeenCalledWith('/usuarios');

    api.delete.mockResolvedValue({ status: 200 });
    expect(await configUsuarioService.deleteUsuario(7)).toBe(true);
    expect(api.delete).toHaveBeenCalledWith('/usuarios/7');

    const payload = { id: 9, name: 'Luis', roleId: 2 };
    api.put.mockResolvedValue({ data: payload });
    await configUsuarioService.updateUsuario(payload);
    expect(api.put).toHaveBeenCalledWith('/usuarios', payload);
  });
});