import api from '../../../services/api';
import { run } from '../../../services/status.service';
import type { CreateTemaRequest, TemaResponse, UpdateTemaRequest } from '../types';

// GET /tema
export const get = async (): Promise<TemaResponse[]> =>
  run('getTemas', async () => {
    const res = await api.get<TemaResponse[]>('/tema');
    return res.data;
  }, { message: 'Temas cargados correctamente' });

// POST /tema
export const create = async (payload: CreateTemaRequest): Promise<TemaResponse> =>
  run('createTema', async () => {
    const res = await api.post<TemaResponse>('/tema', payload);
    return res.data;
  }, { message: 'Tema creado correctamente' });

// PUT /tema/{id}
export const update = async (payload: UpdateTemaRequest): Promise<TemaResponse> =>
  run('updateTema', async () => {
    const res = await api.put<TemaResponse>(`/tema/${payload.id}`, payload);
    return res.data;
  }, { message: 'Tema actualizado correctamente' });

// DELETE /tema/{id}
export const remove = async (id: number): Promise<void> =>
  run('deleteTema', async () => {
    await api.delete(`/tema/${id}`);
  }, { message: 'Tema eliminado correctamente' });