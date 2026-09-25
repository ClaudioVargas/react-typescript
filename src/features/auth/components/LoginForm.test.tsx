import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';

const authMock = vi.hoisted(() => ({
  login: vi.fn(),
}));

const usuarioServiceMock = vi.hoisted(() => ({
  createUsuario: vi.fn(),
}));

vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => authMock,
}));

vi.mock('../../config/services/usuario.service', () => ({
  createUsuario: usuarioServiceMock.createUsuario,
}));

import { LoginForm } from './LoginForm';

/** Sonda para verificar la navegación tras el submit. */
const LocationProbe = () => {
  const location = useLocation();
  return <p>path:{location.pathname}</p>;
};

describe('LoginForm', () => {
  beforeEach(() => {
    authMock.login.mockReset();
    usuarioServiceMock.createUsuario.mockReset();
  });

  const renderForm = () => render(
    <MemoryRouter>
      <LoginForm />
      <LocationProbe />
    </MemoryRouter>
  );

  const fillAndSubmit = async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText('Email'), 'a@b.com');
    await user.type(screen.getByLabelText('Contraseña'), '1234');
    await user.click(screen.getByRole('button', { name: 'Entrar' }));
  };

  it('envía las credenciales y navega a /temas', async () => {
    authMock.login.mockResolvedValue(undefined);
    await fillAndSubmit();

    await waitFor(() =>
      expect(authMock.login).toHaveBeenCalledWith({ email: 'a@b.com', password: '1234' })
    );
    await waitFor(() => expect(screen.getByText('path:/temas')).toBeInTheDocument());
  });

  it('muestra el mensaje de error del backend y no navega', async () => {
    authMock.login.mockRejectedValue({ response: { data: { message: 'Credenciales inválidas' } } });
    await fillAndSubmit();

    await screen.findByText('Credenciales inválidas');
    expect(screen.getByText('path:/')).toBeInTheDocument();
  });

  it('muestra un error genérico cuando no hay mensaje del backend', async () => {
    authMock.login.mockRejectedValue(new Error('No se pudo conectar'));
    await fillAndSubmit();

    await screen.findByText('No se pudo conectar');
    expect(screen.getByText('path:/')).toBeInTheDocument();
  });

  it('deshabilita el botón y muestra "Cargando..." mientras el login está en curso', async () => {
    authMock.login.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(undefined), 500))
    );
    await fillAndSubmit();

    expect(screen.getByRole('button', { name: 'Cargando...' })).toBeDisabled();
    expect(screen.queryByRole('button', { name: 'Entrar' })).not.toBeInTheDocument();
  });

  const switchToRegister = async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole('button', { name: /crear cuenta/i }));
    return user;
  };

  const fillAndSubmitRegister = async () => {
    const user = await switchToRegister();
    await user.type(screen.getByLabelText('Nombre'), 'Nuevo Usuario');
    await user.type(screen.getByLabelText('Email'), 'nuevo@test.com');
    await user.type(screen.getByLabelText('Contraseña'), '1234');
    await user.click(screen.getByRole('button', { name: 'Crear cuenta' }));
  };

  it('crea una cuenta con createUsuario y vuelve al login con mensaje de éxito', async () => {
    usuarioServiceMock.createUsuario.mockResolvedValue({ id: 1, name: 'Nuevo Usuario', email: 'nuevo@test.com' });
    await fillAndSubmitRegister();

    await waitFor(() =>
      expect(usuarioServiceMock.createUsuario).toHaveBeenCalledWith({ name: 'Nuevo Usuario', email: 'nuevo@test.com', password: '1234' })
    );
    await screen.findByText('Cuenta creada correctamente. Ya puedes iniciar sesión.');
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
  });

  it('muestra el mensaje de error del backend si falla la creación de la cuenta', async () => {
    usuarioServiceMock.createUsuario.mockRejectedValue({ response: { data: { message: 'El email ya existe' } } });
    await fillAndSubmitRegister();

    await screen.findByText('El email ya existe');
    expect(screen.getByRole('heading', { name: 'Crear cuenta' })).toBeInTheDocument();
  });
});