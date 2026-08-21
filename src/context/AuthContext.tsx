import React, { createContext, useCallback, useEffect, useState } from 'react';
import { LoginRequest, LoginResponse } from '../features/auth/types';
import * as authService from '../features/auth/services/auth.service';
import { saveToken, clearToken, getToken } from '../features/auth/services/token.service';

interface AuthContextValue {
  user: any | null;
  token: string | null;
  login: (payload: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(() => getToken());

  const login = useCallback(async (payload: LoginRequest) => {
    const res: LoginResponse = await authService.login(payload);
    if (res?.token) {
      saveToken(res.token);
      setToken(res.token);
      // set user if returned
      if (res.user) setUser(res.user);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      // ignore errors on logout request
    }
    clearToken();
    setToken(null);
    setUser(null);
    if (typeof window !== 'undefined') window.location.href = '/login';
  }, []);

  useEffect(() => {
    // On mount, if token exists consider user authenticated (optional: validate token or fetch user)
    const t = getToken();
    if (t) setToken(t);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
