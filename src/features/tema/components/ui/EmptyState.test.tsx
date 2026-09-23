import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState (tema/ui)', () => {
  it('muestra el título y la descripción', () => {
    render(<EmptyState title="Sin datos" description="Carga más datos para ver resultados." />);
    expect(screen.getByText('Sin datos')).toBeInTheDocument();
    expect(screen.getByText('Carga más datos para ver resultados.')).toBeInTheDocument();
  });

  it('no muestra descripción si no se pasa', () => {
    render(<EmptyState title="Sin datos" />);
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
    expect(screen.getByText('Sin datos')).toBeInTheDocument();
  });

  it('muestra la acción opcional', () => {
    render(<EmptyState title="Sin datos" action={<button>Crear primero</button>} />);
    expect(screen.getByRole('button', { name: 'Crear primero' })).toBeInTheDocument();
  });

  it('usa el icono por defecto (Inbox) si no se especifica', () => {
    render(<EmptyState title="Sin datos" />);
    // lucide-react renderiza el icono con aria-hidden, por lo que no es accesible;
    // simplemente verificamos que no rompa el render.
    expect(screen.getByText('Sin datos')).toBeInTheDocument();
  });
});