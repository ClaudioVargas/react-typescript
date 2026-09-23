import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';

// Capturas de los callbacks de interceptor para poder invocarlos en las pruebas.
const hooks = {
  requestUse: null as null | ((config: Record<string, unknown>) => Record<string, unknown>),
  responseOk: null as null | ((response: unknown) => unknown),
  responseErr: null as null | ((error: unknown) => Promise<never>),
};

// Argumentos con los que se invoca axios.create durante la carga de ./api.
const createArgs: unknown[] = [];

// La instancia "falsa" sobre la que api.ts registrará sus interceptores.
const requestUseSpy = vi.fn((fn: (config: Record<string, unknown>) => Record<string, unknown>) => {
  hooks.requestUse = fn;
});
const responseUseSpy = vi.fn(
  (ok: (response: unknown) => unknown, err: (error: unknown) => Promise<never>) => {
    hooks.responseOk = ok;
    hooks.responseErr = err;
  }
);

const fakeInstance = {
  interceptors: {
    request: { use: requestUseSpy },
    response: { use: responseUseSpy },
  },
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
};

import { clearToken, getToken, saveToken } from '../features/auth/services/token.service';

/** Invoca el manejador de error de respuesta sin que un hipotético throw falle el test. */
const emitResponseError = (error: unknown) =>
  Promise.resolve()
    .then(() => hooks.responseErr!(error))
    .catch(() => {
      // El interceptor usa internamente Promise.reject (no estándar); solo nos interesa
      // verificar los efectos secundarios (limpieza de token).
    });

describe('api (axios e interceptores)', () => {
  beforeAll(async () => {
    // Reemplazamos axios.create ANTES de cargar ./api para que éste registre sus
    // interceptores sobre fakeInstance (que captura los callbacks).
    (axios as unknown as { create: unknown }).create = vi.fn((options: unknown) => {
      createArgs.push(options);
      return fakeInstance;
    });
    await import('./api');
  });

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('se crea con una baseURL (VITE_API_BASE configurada o vacío)', () => {
    expect(createArgs).toHaveLength(1);
    expect(createArgs[0]).toHaveProperty('baseURL', expect.any(String));
  });

  it('registra los interceptores de request y response al crearse', () => {
    expect(hooks.requestUse).toBeTypeOf('function');
    expect(hooks.responseOk).toBeTypeOf('function');
    expect(hooks.responseErr).toBeTypeOf('function');
  });

  it('agrega Authorization Bearer cuando existe token', () => {
    saveToken('tok-123');
    const config = { headers: {} };
    hooks.requestUse!(config);
    expect(config.headers.Authorization).toBe('Bearer tok-123');
  });

  it('no agrega Authorization cuando no hay token', () => {
    clearToken();
    const config = { headers: {} };
    hooks.requestUse!(config);
    expect(config.headers).not.toHaveProperty('Authorization');
  });

  it('el interceptor de response exitoso pasa la respuesta tal cual', () => {
    const response = { data: 'ok' };
    expect(hooks.responseOk!(response)).toBe(response);
  });

  it('limpia el token ante un error 401', async () => {
    saveToken('tok-123');
    await emitResponseError({ response: { status: 401 } });
    expect(getToken()).toBeNull();
  });

  it('no limpia el token ante un error distinto de 401', async () => {
    saveToken('tok-123');
    await emitResponseError({ response: { status: 500 } });
    expect(getToken()).toBe('tok-123');
  });

  it('mantiene el token si el error no trae response', async () => {
    saveToken('tok-123');
    await emitResponseError({ message: 'network' });
    expect(getToken()).toBe('tok-123');
  });
});