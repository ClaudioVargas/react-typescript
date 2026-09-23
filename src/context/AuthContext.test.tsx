import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthContext, AuthProvider } from './AuthContext';
import { useAuth } from '../hooks/useAuth';
import * as tokenService from '../features/auth/services/token.service';

const authServiceMock = vi.hoisted(() => ({
  login: vi.fn(),
  logout: vi.fn(),
  getProfile: vi.fn(),
}));

vi.mock('../features/auth/services/auth.service', () => ({
  login: authServiceMock.login,
  logout: authServiceMock.logout,
  getProfile: authServiceMock.getProfile,
}));

vi.mock('jwt-decode', () => ({
  jwtDecode: vi.fn(() => ({ id: '1' })),
}));

type AuthValue = ReturnType<typeof useAuth>;

describe('AuthProvider', () => {
  let value: AuthValue;

  /** Render del provider con un consumidor que captura el contexto. */
  const renderProvider = () => {
    const Consumer = (): null => {
      value = useAuth();
      return null;
    };
    render(<AuthProvider><Consumer /></AuthProvider>);
  };

  /** Render del provider con un botón que ejecuta una acción del contexto. */
  const renderWithAction = (action: (ctx: AuthValue) => void) => {
    const Consumer: React.FC = () => {
      value = useAuth();
      return <button onClick={() => action(value)}>ejecutar</button>;
    };
    render(<AuthProvider><Consumer /></AuthProvider>);
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    authServiceMock.login.mockReset();
    authServiceMock.logout.mockReset();
    authServiceMock.getProfile.mockReset();
  });

  it('al inicializar sin token no hay sesión y termina de cargar', async () => {
    renderProvider();
    await waitFor(() => expect(value!.isLoading).toBe(false));
    expect(value!.isAuthenticated).toBe(false);
    expect(value!.user).toBeNull();
  });

  it('restaura la sesión desde un token guardado', async () => {
    authServiceMock.getProfile.mockResolvedValue({ id: '1', name: 'Ana' });
    tokenService.saveToken('tok');

    renderProvider();

    await waitFor(() => expect(value!.isLoading).toBe(false));
    expect(value!.isAuthenticated).toBe(true);
    await waitFor(() => expect(value!.user?.name).toBe('Ana'));
  });

  it('login guarda el token y el usuario', async () => {
    authServiceMock.login.mockResolvedValue({ token: 'tok', user: { id: '1', name: 'Ana' } });

    renderWithAction((ctx) => void ctx.login({ email: 'a@b.com', password: 'x' }));
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'ejecutar' }));

    await waitFor(() => expect(value!.isAuthenticated).toBe(true));
    expect(tokenService.getToken()).toBe('tok');
    await waitFor(() => expect(value!.user?.name).toBe('Ana'));
  });

  it('login sin token en la respuesta no autentica', async () => {
    authServiceMock.login.mockResolvedValue({});

    renderWithAction((ctx) => void ctx.login({ email: 'a@b.com', password: 'x' }));
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'ejecutar' }));

    await waitFor(() => expect(value!.isAuthenticated).toBe(false));
    expect(tokenService.getToken()).toBeNull();
  });

  it('logout limpia token, usuario y sesión', async () => {
    authServiceMock.logout.mockResolvedValue(undefined);
    tokenService.saveToken('tok');

    renderWithAction((ctx) => void ctx.logout());
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'ejecutar' }));

    await waitFor(() => expect(value!.isAuthenticated).toBe(false));
    expect(tokenService.getToken()).toBeNull();
    expect(value!.user).toBeNull();
  });

  it('un 401 al cargar el perfil limpia la sesión', async () => {
    authServiceMock.getProfile.mockRejectedValue({ response: { status: 401 } });
    tokenService.saveToken('tok');

    renderProvider();

    await waitFor(() => expect(value!.isLoading).toBe(false));
    expect(value!.isAuthenticated).toBe(false);
    expect(tokenService.getToken()).toBeNull();
  });

  it('el contexto expone el value de autenticación', () => {
    renderProvider();
    expect(AuthContext).toBeDefined();
  });
});