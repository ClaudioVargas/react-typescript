import api from '../../../services/api';
import { LoginRequest, LoginResponse } from '../types';

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post('/api/auth/login', payload);
  return res.data;
};

export const signup = async (payload: { name: string; email: string; password: string }) => {
  const res = await api.post('/api/auth/signup', payload);
  return res.data;
};

export const logout = async () => {
  const res = await api.post('/api/auth/logout');
  return res.data;
};
