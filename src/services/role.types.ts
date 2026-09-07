// role.types.ts
// Modelo de datos para los roles del sistema.
export interface Role {
  id: number;
  nombre: string;
  descripcion: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleRequest {
  nombre: string;
  descripcion: string;
}

export interface UpdateRoleRequest {
  id: number;
  nombre: string;
  descripcion: string;
}