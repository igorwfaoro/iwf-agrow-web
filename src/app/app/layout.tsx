import AppAuthRefresh from '@/app/app/components/AppAuthRefresh/AppAuthRefresh';
import Navbar from '@/app/app/components/Navbar/Navbar';
import { Metadata } from 'next';
import { ReactNode } from 'react';

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
      <Navbar />
      <div className="pt-14 flex flex-col h-[calc(100vh-64px)]">{children}</div>
    </>
  );
}
