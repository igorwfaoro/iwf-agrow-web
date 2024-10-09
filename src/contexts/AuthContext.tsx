'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User } from '../models/api/user';
import { UserAuth } from '../models/api/user-auth';
import { LoginDto } from '../models/dto/login.dto';
import { UserRegisterDto } from '../models/dto/user-register.dto';
import { useAuthService } from '../services/auth.service';
import { useLoader } from './LoaderContext';
import { useToast } from './ToastContext';

export const AUTH_STORAGE_KEY = 'auth-storage-key';

export const authStorage = {
  get: (): UserAuth | null => {
    const content = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!content) {
      return null;
    }

    if (!content.startsWith('{')) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    return JSON.parse(content);
  },
  set: (userAuth: UserAuth) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userAuth));
  },
  clear: () => localStorage.removeItem(AUTH_STORAGE_KEY)
};

export interface AuthIProvider {
  login: (dto: LoginDto, options?: { showLoading?: boolean }) => Promise<User>;
  register: (
    dto: UserRegisterDto,
    options?: { showLoading?: boolean }
  ) => Promise<User>;
  logout: () => void;
  refresh: (options?: { showLoading?: boolean }) => Promise<User>;
  loggedUser: User | undefined;
}

interface AuthProviderProps {
  children: any;
}

const AuthContext = createContext<AuthIProvider | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const loader = useLoader();
  const toast = useToast();

  const router = useRouter();

  const authService = useAuthService();

  const [loggedUser, setLoggedUser] = useState<User>();

  const refreshLoggedUser = () => {
    const user = authStorage.get()?.user;
    setLoggedUser(user);
  };

  useEffect(() => {
    refreshLoggedUser();
  }, []);

  const login = async (
    dto: LoginDto,
    options: { showLoading?: boolean } = {}
  ): Promise<User> => {
    if (options.showLoading) loader.show();

    return authService
      .authenticate(dto)
      .then((response) => {
        authStorage.set(response);
        refreshLoggedUser();
        return response.user;
      })
      .catch((error) => {
        toast.openHttpError(error);
        throw error;
      })
      .finally(() => {
        if (options.showLoading) loader.hide();
      });
  };

  const register = async (
    dto: UserRegisterDto,
    options: { showLoading?: boolean } = {}
  ): Promise<User> => {
    if (options.showLoading) loader.show();

    return authService
      .register(dto)
      .then((response) => {
        authStorage.set(response);
        refreshLoggedUser();
        return response.user;
      })
      .catch((error) => {
        toast.openHttpError(error);
        throw error;
      })
      .finally(() => {
        if (options.showLoading) loader.hide();
      });
  };

  const refresh = async (
    options: { showLoading?: boolean } = {}
  ): Promise<User> => {
    if (options.showLoading) loader.show();

    return authService
      .refresh()
      .then((response) => {
        authStorage.set(response);
        refreshLoggedUser();
        return response.user;
      })
      .catch((error) => {
        toast.openHttpError(error);
        throw error;
      })
      .finally(() => {
        if (options.showLoading) loader.hide();
      });
  };

  const logout = (): void => {
    authStorage.clear();
    refreshLoggedUser();
    router.push('/login');
  };

  const returnValue = useMemo(
    () => ({ login, register, logout, refresh, loggedUser }),
    [loggedUser]
  );

  return (
    <AuthContext.Provider value={returnValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext)!;
