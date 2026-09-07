export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: {
    id?: string;
    name?: string;
    email?: string;
  };
}

export interface Role {
  id: number;
  nombre: string;
  descripcion: string;
  createdAt: string;
  updatedAt: string;
}
