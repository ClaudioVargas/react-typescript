import React, { useEffect, useState } from 'react';
import type { TemaResponse } from '../types';
import { get } from '../services/tema.service';





export const Temas: React.FC = () => {

  const [temas, setTemas] = useState<TemaResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemas = async () => {
      try {
        const response = await get();
        console.log( response)
        setTemas(response);
      } catch (err: any) {
        setError(err?.message || "Error al cargar los temas");
      } finally {
        setLoading(false);
      }
    };

    fetchTemas();
  }, []);

  if (loading) return <div>Cargando temas...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

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
        {temas.map((tema) => (
          <div key={tema.id} style={{ width: '100%' }}>
            <div
              style={{
                aspectRatio: '1 / 1',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: `linear-gradient(135deg, '#7c3aed', rgba(15, 23, 42, 0.82))`,
                borderRadius: 16,
                boxShadow: '0 12px 24px rgba(15, 23, 42, 0.15)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: '#200f0f',
                fontWeight: 700,
                fontSize: 18,
                padding: 16,
                boxSizing: 'border-box',
              }}
            >
              {tema.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Temas;
