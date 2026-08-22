import React, { createContext, useCallback, useEffect, useState } from 'react';
import type { LoginRequest, LoginResponse } from '../features/auth/types';
import * as authService from '../features/auth/services/auth.service';
import * as usuarioService from '../features/usuario/services/usuario.service';
import { saveToken, clearToken, getToken } from '../features/auth/services/token.service';
import { jwtDecode } from 'jwt-decode';


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
      // set user if returned from login
      console.log("res", res)
      if (res.token) {
        try {
          const usuarioDecodificado = jwtDecode(res.token) as any;
          const profile = await usuarioService.get(usuarioDecodificado.id);
          console.log("profile", profile)
          setUser(profile);
        } catch (err) {
          console.error(err)
          // ignore profile fetch error here
        }

      } else {
        // otherwise try to fetch profile
      }
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
    // On mount, if token exists, fetch profile to populate user
    const init = async () => {
      const t = getToken();
      if (t) {
        setToken(t);
        try {
          const usuarioDecodificado = jwtDecode(t) as any;
          const profile = await usuarioService.get(usuarioDecodificado.id);
          console.log("profile", profile)
          // const profile = await authService.getProfile();
          setUser(profile);
        } catch (err: any) {
          // If token invalid/expired, clear and redirect to login
          if (err?.response?.status === 401) {
            clearToken();
            setToken(null);
            setUser(null);
            if (typeof window !== 'undefined') window.location.href = '/login';
          }
        }
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
