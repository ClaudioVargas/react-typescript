import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { type LoginRequest } from '../types';
import { useAuth } from '../../../hooks/useAuth';
import { createUsuario } from '../../config/services/usuario.service';

type FormMode = 'login' | 'register';

/** Extrae el mensaje de error del backend o un mensaje genérico. */
const getErrorMessage = (err: unknown, fallback: string): string => {
  const payload = err as { response?: { data?: { message?: string } } };
  const serverMessage = payload.response?.data?.message;
  if (serverMessage) return serverMessage;
  if (err instanceof Error && err.message) return err.message;
  return fallback;
};

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState<FormMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submitLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await login({ email, password } as LoginRequest);
      navigate('/temas', { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, 'Error al iniciar sesión'));
    } finally {
      setLoading(false);
    }
  };

  const submitRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await createUsuario({ name, email, password });
      setSuccess('Cuenta creada correctamente. Ya puedes iniciar sesión.');
      setName('');
      setPassword('');
      setMode('login');
    } catch (err) {
      setError(getErrorMessage(err, 'Error al crear la cuenta'));
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (nextMode: FormMode): void => {
    setError(null);
    setSuccess(null);
    setMode(nextMode);
  };

  const isLogin = mode === 'login';

  const linkStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: '#2563EB',
    cursor: 'pointer',
    padding: 0,
  };

  return (
    <form onSubmit={isLogin ? submitLogin : submitRegister} style={{ maxWidth: 420, margin: '0 auto' }}>
      <h2>{isLogin ? 'Iniciar sesión' : 'Crear cuenta'}</h2>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
      {!isLogin && (
        <Input label="Nombre" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      )}
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div style={{ marginTop: 12 }}>
        <Button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : isLogin ? 'Entrar' : 'Crear cuenta'}
        </Button>
      </div>
      <div style={{ marginTop: 12 }}>
        {isLogin ? (
          <button type="button" style={linkStyle} onClick={() => switchMode('register')}>
            ¿No tienes cuenta? Crear cuenta
          </button>
        ) : (
          <button type="button" style={linkStyle} onClick={() => switchMode('login')}>
            ¿Ya tienes cuenta? Iniciar sesión
          </button>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
