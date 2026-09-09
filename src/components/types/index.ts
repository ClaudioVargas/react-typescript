import type { LucideIcon } from 'lucide-react';

/** Variantes de color para Badges y estados visuales */
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

/** Variantes de estilo para el componente Button */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/** Tamaños disponibles en los controles */
export type ComponentSize = 'sm' | 'md' | 'lg';

/** Elemento de navegación del Sidebar */
export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

/** Tarjeta de estadística (StatCard) */
export interface StatItem {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
}

/** Fila de la tabla de ejemplo */
export interface UserRow {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Activo' | 'Inactivo' | 'Pendiente';
  joinedAt: string;
}

/** Pestaña del componente Tabs */
export interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
}

/** Opción de un Select */
export interface SelectOption {
  value: string;
  label: string;
}