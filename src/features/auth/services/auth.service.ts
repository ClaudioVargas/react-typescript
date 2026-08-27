import api from '../../../services/api';
import type { LoginRequest, LoginResponse } from '../types';

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  
  const res = await api.post('/auth/login', payload);
  return res.data;
};

export const signup = async (payload: { name: string; email: string; password: string }) => {
  const res = await api.post('/auth/signup', payload);
  return res.data;
};

export const logout = async () => {
  const res = await api.post('/auth/logout');
  return res.data;
};

export const getProfile = async (id: string) => {
  // Assumes backend exposes GET /api/auth/me
  const res = await api.get(`/usuarios/${id}` );
  return res.data.data;
};
