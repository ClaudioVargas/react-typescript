import { createContext } from 'react';
import type { StatusSnapshot } from '../services/status.service';

/** Tipo del valor expuesto por el control de status global. */
export interface StatusContextValue {
  /** Estado global actual de las operaciones (loading/success/error/...). */
  status: StatusSnapshot;
  /** true si hay al menos una petición en curso. */
  isPending: boolean;
  /** Actualiza manualmente partes del estado global. */
  setStatus: (patch: Partial<StatusSnapshot>) => void;
  /** Restablece el estado global. */
  clear: () => void;
}

/** Contexto de React que expone el control de status global. */
export const StatusContext = createContext<StatusContextValue | undefined>(undefined);