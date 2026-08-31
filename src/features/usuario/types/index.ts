export interface UsuarioResponse {
  "id": number,
  "name": string,
  "email": string,
  "isActive": boolean,
  "roleId": number,
  "createdAt": string,
  "updatedAt": string
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  temas?: string[];
}

export interface CreateUsuarioRequest {
  nombre: string;
  email: string;
  password: string;
}

export interface UpdateUsuarioRequest {
  id: number;
  nombre: string;
  email: string;
  temas?: string[];
}

export interface AddTemaRequest {
  usuarioId: number;
  tema: string;
}
