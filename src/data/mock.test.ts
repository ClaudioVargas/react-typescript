import { describe, expect, it } from 'vitest';
import * as data from './mock';
import * as demo from '../features/demo/data/mock';

describe('src/data/mock (datos del dashboard)', () => {
  it('navItems y navSecondary tienen ids únicos y path definido', () => {
    const items = [...data.navItems, ...data.navSecondary];
    expect(items.length).toBeGreaterThan(0);
    const ids = items.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    items.forEach((item) => {
      expect(typeof item.id).toBe('string');
      expect(typeof item.label).toBe('string');
      expect(typeof item.path).toBe('string');
    });
  });

  it('stats tienen los campos requeridos y trend válido', () => {
    expect(data.stats.length).toBe(4);
    data.stats.forEach((stat) => {
      expect(stat.label).toBeTruthy();
      expect(stat.value).toBeTruthy();
      expect(stat.change).toBeTruthy();
      expect(['up', 'down']).toContain(stat.trend);
    });
  });

  it('users tienen ids únicos y emails válidos', () => {
    const ids = data.users.map((user) => user.id);
    expect(new Set(ids).size).toBe(ids.length);
    data.users.forEach((user) => {
      expect(user.email).toContain('@');
      expect(user.name).toBeTruthy();
    });
  });

  it('roleOptions incluyen primero la opción placeholder', () => {
    expect(data.roleOptions[0].value).toBe('');
    expect(data.roleOptions[0].label).toBe('Selecciona un rol');
  });
});

describe('src/features/demo/data/mock (galería demo)', () => {
  it('expone tabs con ids únicos', () => {
    expect(demo.tabs.length).toBe(3);
    const ids = demo.tabs.map((tab) => tab.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('navItems y stats tienen las mismas garantías que los datos del dashboard', () => {
    const ids = [...demo.navItems, ...demo.navSecondary].map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(demo.stats.length).toBe(4);
    expect(demo.users.length).toBe(10);
  });
});