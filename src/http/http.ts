import axios, { AxiosError } from 'axios';
import { authStorage } from '../contexts/AuthContext';

export const http = (options: { ignoreLoginRedirect?: boolean } = {}) => {
  const instance = axios.create();

  instance.interceptors.request.use(
    (config) => {
      if (config.data) {
        config.headers['Content-Type'] =
          config.data instanceof FormData
            ? 'multipart/form-data'
            : 'application/json';
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  const token = authStorage.get()?.token;
  if (token) {
    instance.interceptors.request.use(
      (config) => {
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  if (!options.ignoreLoginRedirect) {
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          authStorage.clear();
          return (window.location.href = '/login');
        }
        return Promise.reject(error);
      }
    );
  }

  return instance;
};
