import React from 'react';
import type { TemaResponse } from '../types';

const temasDemo: TemaResponse[] = [
  { id: 1, nombre: 'Matemáticas', descripcion: 'Álgebra y cálculo', color: '#7c3aed' },
  { id: 2, nombre: 'Historia', descripcion: 'Cronología y cultura', color: '#ec4899' },
  { id: 3, nombre: 'Ciencias', descripcion: 'Física y química', color: '#06b6d4' },
  { id: 4, nombre: 'Tecnología', descripcion: 'Software y hardware', color: '#f59e0b' },
  { id: 5, nombre: 'Arte', descripcion: 'Diseño y creatividad', color: '#10b981' },
  { id: 6, nombre: 'Literatura', descripcion: 'Lectura y análisis', color: '#ef4444' },
  { id: 7, nombre: 'Geografía', descripcion: 'Mapas y lugares', color: '#3b82f6' },
  { id: 8, nombre: 'Música', descripcion: 'Ritmo y melodía', color: '#8b5cf6' },
  { id: 9, nombre: 'Programación', descripcion: 'Lógica y código', color: '#14b8a6' },
  { id: 10, nombre: 'Biología', descripcion: 'Vida y ecosistemas', color: '#84cc16' },
];

export const Temas: React.FC = () => {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
      <h2 style={{ margin: '0 0 24px', color: '#1f2937', fontSize: 28 }}>Temas</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          gap: 16,
        }}
      >
        {temasDemo.map((tema) => (
          <div key={tema.id} style={{ width: '100%' }}>
            <div
              style={{
                aspectRatio: '1 / 1',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: `linear-gradient(135deg, ${tema.color ?? '#7c3aed'}, rgba(15, 23, 42, 0.82))`,
                borderRadius: 16,
                boxShadow: '0 12px 24px rgba(15, 23, 42, 0.15)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: 18,
                padding: 16,
                boxSizing: 'border-box',
              }}
            >
              {tema.nombre}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Temas;
