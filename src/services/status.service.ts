/**
 * Control de estado global de operaciones / peticiones HTTP.
 *
 * Es un store singleton (framework-agnostic) con patrón pub/sub:
 * se importa y se usa directamente dentro de los archivos *.service.ts
 * para registrar inicio, éxito y error de cada llamada al backend.
 * Los componentes/hooks lo consumen a través de StatusContext / useStatus.
 */

export type StatusType = 'idle' | 'loading' | 'success' | 'error';

export interface StatusSnapshot {
  /** Estado actual de la operación en curso. */
  type: StatusType;
  /** Nombre de la operación (ej. 'login', 'getUsuarios'). */
  operation: string | null;
  /** Mensaje legible para el usuario (ej. 'Usuarios cargados'). */
  message: string | null;
  /** Error original en caso de fallo. */
  error: unknown;
  /** Código HTTP recibido (si aplica). */
  httpStatus: number | null;
  /** Timestamp del último cambio de estado. */
  timestamp: number;
  /** Cantidad de peticiones en curso (soporta operaciones concurrentes). */
  pendingRequests: number;
}

type StatusListener = (status: StatusSnapshot) => void;

/** Estado ocioso inicial. */
const createIdleStatus = (): StatusSnapshot => ({
  type: 'idle',
  operation: null,
  message: null,
  error: null,
  httpStatus: null,
  timestamp: 0,
  pendingRequests: 0,
});

let state: StatusSnapshot = createIdleStatus();
const listeners = new Set<StatusListener>();

/* ------------------------------- helpers ---------------------------------- */

const emit = (): void => {
  listeners.forEach((listener) => listener(state));
};

const update = (patch: Partial<StatusSnapshot>): StatusSnapshot => {
  state = { ...state, ...patch, timestamp: Date.now() };
  emit();
  return state;
};

/** Extrae el HTTP status de un error de axios/fetch si está disponible. */
const extractHttpStatus = (error: unknown): number | null => {
  if (error && typeof error === 'object' && 'response' in error) {
    const status = (error as { response?: { status?: unknown } }).response?.status;
    if (typeof status === 'number') return status;
  }
  return null;
};

/** Genera un mensaje de error por defecto a partir de la operación y el HTTP status. */
const defaultErrorMessage = (operation: string, httpStatus: number | null): string => {
  const messagesByStatus: Record<number, string> = {
    400: 'La solicitud es inválida',
    401: 'No autorizado. Vuelve a iniciar sesión',
    403: 'No tienes permisos para esta acción',
    404: 'Recurso no encontrado',
    409: 'Conflicto con el estado actual del recurso',
    422: 'Los datos enviados no son válidos',
    500: 'Error interno del servidor',
  };
  const reason = httpStatus !== null ? messagesByStatus[httpStatus] ?? null : null;
  return reason ?? `No se pudo completar la operación "${operation}"`;
};

/* ------------------------------ API pública ------------------------------- */

/** Devuelve el estado global actual. */
export const getStatus = (): StatusSnapshot => state;

/** Suscribe un listener; retorna la función para desuscribirse. */
export const subscribe = (listener: StatusListener): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** Marca el inicio de una operación (estado 'loading'). */
export const begin = (operation: string): void => {
  update({
    type: 'loading',
    operation,
    message: null,
    error: null,
    httpStatus: null,
    pendingRequests: state.pendingRequests + 1,
  });
};

/** Marca el éxito de una operación. */
export const succeed = (operation: string, message?: string): void => {
  update({
    type: 'success',
    operation,
    message: message ?? null,
    error: null,
    httpStatus: null,
    pendingRequests: Math.max(0, state.pendingRequests - 1),
  });
};

/** Marca una operación como fallida, extrayendo el HTTP status cuando es posible. */
export const fail = (operation: string, error: unknown, message?: string): void => {
  const httpStatus = extractHttpStatus(error);
  update({
    type: 'error',
    operation,
    message: message ?? defaultErrorMessage(operation, httpStatus),
    error,
    httpStatus,
    pendingRequests: Math.max(0, state.pendingRequests - 1),
  });
};

export interface RunOptions {
  /** Mensaje de éxito que se mostrará al usuario (si no se envía, no se muestra toast). */
  message?: string;
  /** Mensaje de error personalizado. */
  errorMessage?: string;
}

/**
 * Ejecuta una tarea asíncrona registrando automáticamente su estado global
 * (loading -> success | error). En caso de error, el error original se vuelve
 * a lanzar para que el llamador pueda manejarlo.
 */
export const run = async <T>(operation: string, task: () => Promise<T>, options?: RunOptions): Promise<T> => {
  begin(operation);
  try {
    const result = await task();
    succeed(operation, options?.message);
    return result;
  } catch (error) {
    fail(operation, error, options?.errorMessage);
    throw error;
  }
};

/** Actualiza manualmente partes del estado global (uso avanzado). */
export const setStatus = (patch: Partial<StatusSnapshot>): void => {
  update(patch);
};

/** Restablece el estado global al estado ocioso inicial. */
export const clear = (): void => {
  state = createIdleStatus();
  emit();
};