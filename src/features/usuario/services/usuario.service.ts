import api from '../../../services/api';
import { run } from '../../../services/status.service';
import type { AddTemaRequest, CreateUsuarioRequest, UpdateUsuarioRequest, Usuario } from '../types';

// GET /usuarios
export const getUsuarios = async (): Promise<Usuario[]> =>
  run('getUsuarios', async () => {
    const res = await api.get<Usuario[]>('/usuarios');
    return res.data;
  }, { message: 'Usuarios cargados correctamente' });

// POST /usuarios
export const createUsuario = async (payload: CreateUsuarioRequest): Promise<Usuario> =>
  run('createUsuario', async () => {
    const res = await api.post<Usuario>('/usuarios', payload);
    return res.data;
  }, { message: 'Usuario creado correctamente' });

// PUT /usuarios
export const updateUsuario = async (payload: UpdateUsuarioRequest): Promise<Usuario> =>
  run('updateUsuario', async () => {
    const res = await api.put<Usuario>('/usuarios', payload);
    return res.data;
  }, { message: 'Usuario actualizado correctamente' });

// GET /usuario/{id}
export const getUsuarioById = async (id: number): Promise<Usuario> =>
  run('getUsuarioById', async () => {
    const res = await api.get<Usuario>(`/usuario/${id}`);
    return res.data;
  });

// DELETE /usuario/{id}
export const deleteUsuario = async (id: number): Promise<void> =>
  run('deleteUsuario', async () => {
    await api.delete(`/usuario/${id}`);
  }, { message: 'Usuario eliminado correctamente' });

// POST /usuario/addTema
export const addTemaToUsuario = async (payload: AddTemaRequest): Promise<Usuario> =>
  run('addTemaToUsuario', async () => {
    const res = await api.post<Usuario>('/usuario/addTema', payload);
    return res.data;
  }, { message: 'Tema agregado al usuario' });
