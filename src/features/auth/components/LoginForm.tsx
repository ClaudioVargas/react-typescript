import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { type LoginRequest } from '../types';
import { useAuth } from '../../../hooks/useAuth';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ email, password } as LoginRequest);
      navigate('/temas', { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 420, margin: '0 auto' }}>
      <h2>Iniciar sesión</h2>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div style={{ marginTop: 12 }}>
        <Button type="submit" disabled={loading}>{loading ? 'Cargando...' : 'Entrar'}</Button>
      </div>
    </form>
  );
};

export default LoginForm;
