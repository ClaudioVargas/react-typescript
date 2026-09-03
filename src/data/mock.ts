import {
  BarChart3,
  Boxes,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
  UserPlus,
  TrendingUp,
  CircleDollarSign,
  ClipboardList,
} from 'lucide-react';
import type { NavItem, StatItem, TabItem, UserRow } from '../components/types';

/** Navegación de ejemplo para el Sidebar */
export const navItems: NavItem[] = [
  { id: 'inicio', label: 'Inicio', icon: BarChart3, path: '/inicio' },
  { id: 'tema', label: 'Temas', icon: Users, path: '/temas' },
  { id: 'graficos', label: 'Graficos', icon: FolderKanban, path: '/graficos' },
  { id: 'demo', label: 'demo', icon: LayoutDashboard, path: '/demo' },
  { id: 'perfil', label: 'Perfil', icon: UserPlus, path: '/perfil' },
];


export const navSecondary: NavItem[] = [
  { id: 'config', label: 'Ajustes', icon: Settings, path: '/config' },
];

/** Tarjetas de estadística del dashboard */
export const stats: StatItem[] = [
  { id: 'users', label: 'Usuarios activos', value: '8,429', change: '+12.5%', trend: 'up', icon: UserPlus },
  { id: 'revenue', label: 'Ingresos', value: '$42.900', change: '+8.2%', trend: 'up', icon: CircleDollarSign },
  { id: 'conversion', label: 'Conversión', value: '3.18%', change: '-1.4%', trend: 'down', icon: TrendingUp },
  { id: 'tasks', label: 'Tareas pendientes', value: '124', change: '+4', trend: 'up', icon: ClipboardList },
];

/** Filas de la tabla de usuarios */
export const users: UserRow[] = [
  { id: 1, name: 'Laura Sánchez', email: 'laura.sanchez@demo.com', role: 'Administradora', status: 'Activo', joinedAt: '12 May 2024' },
  { id: 2, name: 'Carlos García', email: 'carlos.garcia@demo.com', role: 'Editor', status: 'Activo', joinedAt: '03 Jun 2024' },
  { id: 3, name: 'María López', email: 'maria.lopez@demo.com', role: 'Invitada', status: 'Pendiente', joinedAt: '21 Jul 2024' },
  { id: 4, name: 'Jorge Vidal', email: 'jorge.vidal@demo.com', role: 'Editor', status: 'Activo', joinedAt: '09 Ago 2024' },
  { id: 5, name: 'Ana Torres', email: 'ana.torres@demo.com', role: 'Administradora', status: 'Inactivo', joinedAt: '30 Sep 2024' },
  { id: 6, name: 'Pedro Ruiz', email: 'pedro.ruiz@demo.com', role: 'Invitado', status: 'Pendiente', joinedAt: '14 Oct 2024' },
  { id: 7, name: 'Elena Castro', email: 'elena.castro@demo.com', role: 'Editor', status: 'Activo', joinedAt: '02 Nov 2024' },
  { id: 8, name: 'Luis Mendoza', email: 'luis.mendoza@demo.com', role: 'Invitado', status: 'Inactivo', joinedAt: '27 Nov 2024' },
  { id: 9, name: 'Sofía Reyes', email: 'sofia.reyes@demo.com', role: 'Administradora', status: 'Activo', joinedAt: '15 Dic 2024' },
  { id: 10, name: 'Diego Herrera', email: 'diego.herrera@demo.com', role: 'Editor', status: 'Pendiente', joinedAt: '08 Ene 2025' },
];

/** Pestañas del componente Tabs */
export const tabs: TabItem[] = [
  { id: 'resumen', label: 'Resumen' },
  { id: 'actividad', label: 'Actividad' },
  { id: 'configuracion', label: 'Configuración', icon: Boxes },
];

/** Opciones para los selects de ejemplo */
export const roleOptions = [
  { value: '', label: 'Selecciona un rol' },
  { value: 'admin', label: 'Administrador' },
  { value: 'editor', label: 'Editor' },
  { value: 'invitado', label: 'Invitado' },
];