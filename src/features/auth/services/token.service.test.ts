import { beforeEach, describe, expect, it } from 'vitest';
import { clearToken, getToken, saveToken } from './token.service';

const TOKEN_KEY = 'auth_token';

describe('token.service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saveToken guarda el token en localStorage', () => {
    saveToken('abc');
    expect(localStorage.getItem(TOKEN_KEY)).toBe('abc');
    expect(getToken()).toBe('abc');
  });

  it('getToken devuelve null cuando no hay token guardado', () => {
    expect(getToken()).toBeNull();
  });

  it('clearToken elimina el token guardado', () => {
    saveToken('abc');
    clearToken();
    expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    expect(getToken()).toBeNull();
  });

  it('saveToken sobrescribe un token previo', () => {
    saveToken('v1');
    saveToken('v2');
    expect(getToken()).toBe('v2');
  });

  it('usa la clave constante auth_token', () => {
    saveToken('x');
    expect(localStorage.getItem('auth_token')).toBe('x');
  });
});