import api from '../../../services/api';
import { run } from '../../../services/status.service';
import type { LoginRequest, LoginResponse } from '../types';

export const login = async (payload: LoginRequest): Promise<LoginResponse> =>
  run('login', async () => {
    const res = await api.post<LoginResponse>('/auth/login', payload);
    return res.data;
  }, { message: 'Inicio de sesión exitoso' });

export const signup = async (payload: { name: string; email: string; password: string }) =>
  run('signup', async () => {
    const res = await api.post('/auth/signup', payload);
    return res.data;
  }, { message: 'Cuenta creada correctamente' });

export const logout = async () =>
  run('logout', async () => {
    const res = await api.post('/auth/logout');
    return res.data;
  });

export const getProfile = async (id: string) =>
  run('getProfile', async () => {
    // Assumes backend exposes GET /api/auth/me
    const res = await api.get(`/usuarios/${id}`);
    return res.data;
  });
