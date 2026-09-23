import { describe, expect, it } from 'vitest';
import isAdmin from './isAdmin';

describe('isAdmin', () => {
  it('rechaza null, undefined y primitivos', () => {
    expect(isAdmin(null)).toBe(false);
    expect(isAdmin(undefined)).toBe(false);
    expect(isAdmin('admin')).toBe(false);
    expect(isAdmin(1)).toBe(false);
    expect(isAdmin([])).toBe(false);
  });

  it('acepta rol como string (case/space insensitive)', () => {
    expect(isAdmin({ rol: 'Admin' })).toBe(true);
    expect(isAdmin({ role: 'administrador' })).toBe(true);
    expect(isAdmin({ nombreRol: '  ADMINISTRADORA  ' })).toBe(true);
  });

  it('rechaza rol string que no es admin', () => {
    expect(isAdmin({ rol: 'editor' })).toBe(false);
    expect(isAdmin({ role: 'viewer' })).toBe(false);
    expect(isAdmin({ nombreRol: 'guest' })).toBe(false);
  });

  it('acepta roleId numérico 1 y rechaza otros', () => {
    expect(isAdmin({ roleId: 1 })).toBe(true);
    expect(isAdmin({ roleId: 2 })).toBe(false);
  });

  it('acepta roleId string "1" y rechaza otros strings', () => {
    expect(isAdmin({ roleId: '1' })).toBe(true);
    expect(isAdmin({ roleId: '2' })).toBe(false);
  });

  it('valida arreglo de roles con strings', () => {
    expect(isAdmin({ roles: ['editor', 'admin'] })).toBe(true);
    expect(isAdmin({ roles: ['editor', 'viewer'] })).toBe(false);
  });

  it('valida arreglo de roles con objetos (nombre/name)', () => {
    expect(isAdmin({ roles: [{ nombre: 'admin' }] })).toBe(true);
    expect(isAdmin({ roles: [{ name: 'Administrador' }] })).toBe(true);
    expect(isAdmin({ roles: [{ name: 'editor' }] })).toBe(false);
  });

  it('rechaza roles cuando no es un arreglo', () => {
    expect(isAdmin({ roles: 'admin' })).toBe(false);
    expect(isAdmin({ roles: { nombre: 'admin' } })).toBe(false);
  });

  it('ignora objetos sin información de rol', () => {
    expect(isAdmin({ id: 1, email: 'a@b.com' })).toBe(false);
  });
});