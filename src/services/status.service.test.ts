import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as status from './status.service';

describe('status.service', () => {
  beforeEach(() => {
    status.clear();
  });

  it('comienza en estado idle', () => {
    const s = status.getStatus();
    expect(s.type).toBe('idle');
    expect(s.operation).toBeNull();
    expect(s.message).toBeNull();
    expect(s.error).toBeNull();
    expect(s.httpStatus).toBeNull();
    expect(s.timestamp).toBe(0);
    expect(s.pendingRequests).toBe(0);
  });

  it('begin marca loading e incrementa pendingRequests', () => {
    status.begin('login');
    const s = status.getStatus();
    expect(s.type).toBe('loading');
    expect(s.operation).toBe('login');
    expect(s.pendingRequests).toBe(1);
  });

  it('succeed marca success y decrementa pendingRequests', () => {
    status.begin('login');
    status.succeed('login', 'Inicio de sesión exitoso');
    const s = status.getStatus();
    expect(s.type).toBe('success');
    expect(s.operation).toBe('login');
    expect(s.message).toBe('Inicio de sesión exitoso');
    expect(s.pendingRequests).toBe(0);
  });

  it('succeed nunca deja pendingRequests en negativo', () => {
    status.succeed('op');
    expect(status.getStatus().pendingRequests).toBe(0);
  });

  it('soportar operaciones concurrentes (pendingRequests acumula)', () => {
    status.begin('a');
    status.begin('b');
    status.begin('c');
    expect(status.getStatus().pendingRequests).toBe(3);
    status.succeed('a');
    status.succeed('b');
    expect(status.getStatus().pendingRequests).toBe(1);
  });

  it('fail con error axios extrae el http status y mapea el mensaje', () => {
    status.begin('getUsuarios');
    const error = { response: { status: 404 } };
    status.fail('getUsuarios', error);
    const s = status.getStatus();
    expect(s.type).toBe('error');
    expect(s.httpStatus).toBe(404);
    expect(s.message).toBe('Recurso no encontrado');
    expect(s.error).toBe(error);
    expect(s.pendingRequests).toBe(0);
  });

  it.each([400, 401, 403, 409, 422, 500])('mapea el HTTP %s a un mensaje legible', (code) => {
    status.fail('op', { response: { status: code } });
    expect(status.getStatus().message).toBeTruthy();
  });

  it('fail sin http status usa mensaje por defecto con el nombre de la operación', () => {
    status.begin('getDesconocido');
    status.fail('getDesconocido', new Error('boom'));
    const s = status.getStatus();
    expect(s.type).toBe('error');
    expect(s.httpStatus).toBeNull();
    expect(s.message).toContain('getDesconocido');
  });

  it('subscribe notifica a los listeners y unsubscribe deja de notificar', () => {
    const listener = vi.fn();
    const unsubscribe = status.subscribe(listener);
    status.begin('a');
    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
    status.begin('b');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('run resuelve la tarea y marca success', async () => {
    const result = await status.run('op', async () => 42, { message: 'OK' });
    expect(result).toBe(42);
    const s = status.getStatus();
    expect(s.type).toBe('success');
    expect(s.message).toBe('OK');
  });

  it('run propaga el error y marca error', async () => {
    const boom = new Error('boom');
    await expect(
      status.run('op', async () => {
        throw boom;
      })
    ).rejects.toThrow('boom');
    const s = status.getStatus();
    expect(s.type).toBe('error');
    expect(s.error).toBe(boom);
  });

  it('setStatus aplica un patch parcial', () => {
    status.setStatus({ message: 'manual' });
    expect(status.getStatus().message).toBe('manual');
  });

  it('clear restablece el estado idle completo', () => {
    status.begin('x');
    status.setStatus({ message: 'y' });
    status.clear();
    const s = status.getStatus();
    expect(s.type).toBe('idle');
    expect(s.pendingRequests).toBe(0);
    expect(s.timestamp).toBe(0);
    expect(s.message).toBeNull();
  });
});