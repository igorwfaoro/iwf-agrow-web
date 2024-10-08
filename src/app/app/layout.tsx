import { Metadata } from 'next';
import { ReactNode } from 'react';
import AppAuthRefresh from './components/AppAuthRefresh/AppAuthRefresh';

export const metadata: Metadata = {
  title: 'App | Agrow'
};

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <AppAuthRefresh />
      {children}
    </>
  );
}
