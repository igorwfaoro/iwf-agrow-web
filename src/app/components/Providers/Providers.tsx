'use client';

import GoogleApiProvider from '@/contexts/GoogleApiContext';
import { ReactNode } from 'react';
import AlertProvider from '../../../contexts/AlertContext';
import AuthProvider from '../../../contexts/AuthContext';
import LoaderProvider from '../../../contexts/LoaderContext';
import ModalProvider from '../../../contexts/ModalContext';
import ToastProvider from '../../../contexts/ToastContext';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <LoaderProvider>
      <ToastProvider>
        <AlertProvider>
          <GoogleApiProvider>
            <AuthProvider>
              <ModalProvider>{children}</ModalProvider>
            </AuthProvider>
          </GoogleApiProvider>
        </AlertProvider>
      </ToastProvider>
    </LoaderProvider>
  );
}
