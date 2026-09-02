import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { LoginRequest, LoginResponse } from '../features/auth/types';
import * as authService from '../features/auth/services/auth.service';
import { saveToken, clearToken, getToken } from '../features/auth/services/token.service';
import { jwtDecode } from 'jwt-decode';


interface AuthContextValue {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(() => getToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const clearAuth = useCallback(() => {
    clearToken();
    setToken(null);
    setUser(null);
  }, []);

  const loadProfile = useCallback(async (id: string) => {
    try {
      
      const profile = await authService.getProfile(id);
      setUser(profile);
      return profile;
    } catch (err: any) {
      if (err?.response?.status === 401) {
        clearAuth();
      }
      throw err;
    }
  }, [clearAuth]);

  const login = useCallback(async (payload: LoginRequest) => {
    const res: LoginResponse = await authService.login(payload);
    if (!res?.token) {
      return;
    }
    saveToken(res.token);
    setToken(res.token);
    const decoded = jwtDecode(res.token) as any;
    try {
      if(decoded.id) {
        const profile = res.user ?? (await loadProfile(decoded.id as any));
        setUser(profile ?? null);
      }
    } catch (err) {
      setUser(res.user ?? null);
    }
  }, [loadProfile]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      // Ignore logout request errors and continue clearing local auth state.
    } finally {
      clearAuth();
    }
  }, [clearAuth]);

  useEffect(() => {
    let isMounted = true;
    
    const init = async () => {
      const savedToken = getToken();
      if (!savedToken) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }
      const decoded = jwtDecode(savedToken) as any;
      setToken(savedToken);

      try {
        await loadProfile(decoded.id);
      } catch (err) {
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [loadProfile]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    isAuthenticated: Boolean(token),
    isLoading,
    login,
    logout,
  }), [user, token, isLoading, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
