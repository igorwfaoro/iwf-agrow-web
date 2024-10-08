'use client';

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
          <ModalProvider>
            <AuthProvider>{children}</AuthProvider>
          </ModalProvider>
        </AlertProvider>
      </ToastProvider>
    </LoaderProvider>
  );
}
