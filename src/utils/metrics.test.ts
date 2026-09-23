import { describe, expect, it } from 'vitest';
import { calculateWinRate, getTrend } from './metrics';

interface DayInput {
  metrics: Record<string, number | null>;
}

/** Construye un Dataset válido a partir de días de ejemplo. */
const makeDataset = (days: DayInput[]): Dataset => ({
  metadata: {
    start_date: '2026-01-01',
    end_date: `2026-01-${Math.max(days.length, 1).toString().padStart(2, '0')}`,
    days: days.length,
    metrics: [],
  },
  days: days.map((day, index) => ({
    date: `2026-01-${(index + 1).toString().padStart(2, '0')}`,
    metrics: day.metrics,
  })),
});

describe('getTrend', () => {
  it('devuelve "up" cuando la última métrica es mayor que la anterior', () => {
    const ds = makeDataset([{ metrics: { visits: 100 } }, { metrics: { visits: 120 } }]);
    expect(getTrend(ds, 'visits')).toBe('up');
  });

  it('devuelve "down" cuando la última métrica es menor', () => {
    const ds = makeDataset([{ metrics: { visits: 120 } }, { metrics: { visits: 100 } }]);
    expect(getTrend(ds, 'visits')).toBe('down');
  });

  it('devuelve "stable" cuando son iguales', () => {
    const ds = makeDataset([{ metrics: { visits: 120 } }, { metrics: { visits: 120 } }]);
    expect(getTrend(ds, 'visits')).toBe('stable');
  });

  it('devuelve "stable" con métricas nulas o faltantes', () => {
    expect(getTrend(makeDataset([{ metrics: { visits: 100 } }, { metrics: { visits: null } }]), 'visits')).toBe('stable');
    expect(getTrend(makeDataset([{ metrics: { visits: 100 } }]), 'visits')).toBe('stable');
    expect(getTrend(makeDataset([{ metrics: { visits: 100 } }, { metrics: { other: 50 } }]), 'visits')).toBe('stable');
  });
});

describe('calculateWinRate', () => {
  it('calcula el ratio ganadas / total', () => {
    const ds = makeDataset([
      { metrics: { deals_won: 3, deals_lost: 1 } },
      { metrics: { deals_won: 2, deals_lost: 2 } },
    ]);
    expect(calculateWinRate(ds)).toBe(5 / 8);
  });

  it('devuelve null cuando no hay deals ganados ni perdidos', () => {
    expect(calculateWinRate(makeDataset([{ metrics: { visits: 10 } }]))).toBeNull();
  });

  it('devuelve null con dataset vacío', () => {
    expect(calculateWinRate(makeDataset([]))).toBeNull();
  });
});