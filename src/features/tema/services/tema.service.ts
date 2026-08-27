import api from "../../../services/api";
import type { TemaResponse } from "../types";


export const get = async (): Promise<TemaResponse[]> => {
  const res = (await api.get('/tema')).data;
  return res.data;
};