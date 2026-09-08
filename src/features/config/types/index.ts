import type { LucideIcon } from "lucide-react";

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
  name: string;
  email: string;
  temas?: string[];
}

export interface CreateUsuarioRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUsuarioRequest {
  id: number;
  name: string;
  roleId: number
  // email: string;
  // temas?: string[];
}

export interface AddTemaRequest {
  usuarioId: number;
  tema: string;
}

export interface Role {
  id: number;
  nombre: string;
  descripcion: string;
  createdAt: string;
  updatedAt: string;
}

// Definición del tipo
export type ConfigTabType = "usuarioManager" | "roleManager" | "test";

export interface TabItem {
  id: ConfigTabType;
  label: string;
  icon?: LucideIcon;
}