import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

const authMock = vi.hoisted(() => ({
  isAuthenticated: false,
  isLoading: false,
}));

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({ ...authMock }),
}));

// El <Navigate> real de react-router provoca un bucle de navegación al renderizarse
// dentro de un MemoryRouter en el entorno de pruebas (state con objeto nuevo en cada
// render); lo sustituimos por un marcador que además registra el destino. Así solo
// verificamos la intención de redirigir, no el mecanismo de navegación.
vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...original,
    Navigate: (props: { to?: string }) => <div data-testid="navigate" data-to={props.to} />,
  };
});

const renderRoute = () =>
  render(
    <MemoryRouter>
      <PrivateRoute>
        <h1>Contenido privado</h1>
      </PrivateRoute>
    </MemoryRouter>
  );

describe('PrivateRoute', () => {
  it('muestra el contenido cuando hay sesión', () => {
    authMock.isAuthenticated = true;
    authMock.isLoading = false;

    renderRoute();

    expect(screen.getByText('Contenido privado')).toBeInTheDocument();
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
  });

  it('muestra "Cargando..." mientras isLoading', () => {
    authMock.isAuthenticated = false;
    authMock.isLoading = true;

    renderRoute();

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
    expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument();
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
  });

  it('sin sesión intenta redirigir a /login', () => {
    authMock.isAuthenticated = false;
    authMock.isLoading = false;

    renderRoute();

    const navigate = screen.getByTestId('navigate');
    expect(navigate).toHaveAttribute('data-to', '/login');
    expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument();
  });
});