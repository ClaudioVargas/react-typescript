export interface TemaResponse {
  id: number;
  name: string;
  descripcion: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTemaRequest {
  name: string;
  descripcion: string;
}

export interface UpdateTemaRequest {
  id: number;
  name: string;
  descripcion: string;
}
