import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';

const authMock = vi.hoisted(() => ({
  logout: vi.fn(),
}));

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => authMock,
}));

import { Header } from './Header';

/** Sonda para verificar a qué ruta redirige el menú. */
const LocationProbe = () => {
  const location = useLocation();
  return <p>path:{location.pathname}</p>;
};

const renderHeader = () =>
  render(
    <MemoryRouter initialEntries={['/temas']}>
      <Header title="Panel de componentes" subtitle="Maqueta demo" onMenuClick={() => {}} />
      <LocationProbe />
    </MemoryRouter>
  );

describe('Header · menú de usuario', () => {
  beforeEach(() => {
    authMock.logout.mockReset();
    authMock.logout.mockResolvedValue(undefined);
  });

  it('muestra las opciones al poner el puntero sobre el icono y las oculta al salir', () => {
    renderHeader();

    const trigger = screen.getByRole('button', { name: 'Menú de usuario' });
    expect(screen.queryByRole('menuitem', { name: 'Mi perfil' })).not.toBeInTheDocument();

    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole('menuitem', { name: 'Mi perfil' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Cerrar sesión' })).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);
    expect(screen.queryByRole('menuitem', { name: 'Mi perfil' })).not.toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { name: 'Cerrar sesión' })).not.toBeInTheDocument();
  });

  it('“Mi perfil” redirige a la vista de perfil', () => {
    renderHeader();

    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Menú de usuario' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Mi perfil' }));

    expect(screen.getByText('path:/perfil')).toBeInTheDocument();
  });

  it('“Cerrar sesión” llama a logout y redirige al login', async () => {
    renderHeader();

    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Menú de usuario' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Cerrar sesión' }));

    await waitFor(() => expect(authMock.logout).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByText('path:/login')).toBeInTheDocument());
  });
});