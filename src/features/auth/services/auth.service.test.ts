import { beforeEach, describe, expect, it, vi } from 'vitest';

const api = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
}));

vi.mock('../../../services/api', () => ({ default: api }));

import { getProfile, getRoles, login, logout, signup } from './auth.service';
import * as status from '../../../services/status.service';

describe('auth.service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    status.clear();
  });

  it('login hace POST /auth/login con el payload y devuelve los datos', async () => {
    const payload = { email: 'a@b.com', password: '1234' };
    api.post.mockResolvedValue({ data: { token: 'tok' } });

    const result = await login(payload);

    expect(api.post).toHaveBeenCalledWith('/auth/login', payload);
    expect(result).toEqual({ token: 'tok' });
    expect(status.getStatus().type).toBe('success');
  });

  it('signup hace POST /auth/signup', async () => {
    const payload = { name: 'Ana', email: 'a@b.com', password: 'x' };
    api.post.mockResolvedValue({ data: { id: 1 } });

    const result = await signup(payload);

    expect(api.post).toHaveBeenCalledWith('/auth/signup', expect.objectContaining({ email: 'a@b.com' }));
    expect(result).toEqual({ id: 1 });
  });

  it('logout hace POST /auth/logout', async () => {
    api.post.mockResolvedValue({ data: { ok: true } });
    await logout();
    expect(api.post).toHaveBeenCalledWith('/auth/logout');
  });

  it('getProfile hace GET /usuarios/{id}', async () => {
    api.get.mockResolvedValue({ data: { id: '5' } });
    const result = await getProfile('5');
    expect(api.get).toHaveBeenCalledWith('/usuarios/5');
    expect(result).toEqual({ id: '5' });
  });

  it('getRoles hace GET /role', async () => {
    api.get.mockResolvedValue({ data: [] });
    await getRoles();
    expect(api.get).toHaveBeenCalledWith('/role');
  });

  it('propaga el error y registra estado error con httpStatus', async () => {
    api.post.mockRejectedValue({ response: { status: 401 } });

    await expect(login({ email: 'a', password: 'b' })).rejects.toBeTruthy();

    expect(status.getStatus().type).toBe('error');
    expect(status.getStatus().httpStatus).toBe(401);
  });
});