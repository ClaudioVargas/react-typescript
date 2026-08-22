import api from '../../../services/api';
import type { UsuarioResponse } from '../types';

export const get = async (id: number) => {
  const res = await api.get<UsuarioResponse>( `/usuarios/${id}` );
  return res.data;
};
