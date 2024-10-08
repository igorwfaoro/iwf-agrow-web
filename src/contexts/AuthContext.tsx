'use client';

import { createContext, useContext, useMemo } from 'react';
import { User } from '../models/api/user';
import { UserAuth } from '../models/api/user-auth';
import { LoginDto } from '../models/dto/login.dto';
import { useAuthService } from '../services/auth.service';
import { useLoader } from './LoaderContext';
import { useToast } from './ToastContext';

export const AUTH_STORAGE_KEY = 'auth-storage-key';

export const authStorage = {
  get: (): UserAuth | null =>
    JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || 'null'),
  set: (userAuth: UserAuth) =>
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userAuth)),
  clear: () => localStorage.removeItem(AUTH_STORAGE_KEY)
};

export interface AuthIProvider {}

interface AuthProviderProps {
  children: any;
}

const AuthContext = createContext<AuthIProvider | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const loader = useLoader();
  const toast = useToast();

  const authService = useAuthService();

  const login = async (
    dto: LoginDto,
    options: { showLoading?: boolean } = {}
  ): Promise<User> => {
    if (options.showLoading) loader.show();

    try {
      const userAuth = await authService.authenticate(dto);
      authStorage.set(userAuth);
      return userAuth.user;
    } catch (error) {
      toast.openHttpError(error);
      throw error;
    } finally {
      if (options.showLoading) loader.hide();
    }
  };

  const returnValue = useMemo(() => ({ login }), []);

  return (
    <AuthContext.Provider value={returnValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext)!;
