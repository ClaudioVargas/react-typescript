import api from '../../../services/api';
import { run } from '../../../services/status.service';
import type { TemaResponse } from '../types';

export const get = async (): Promise<TemaResponse[]> =>
  run('getTemas', async () => {
    const res = await api.get<TemaResponse[]>('/tema');
    return res.data;
  }, { message: 'Temas cargados correctamente' });