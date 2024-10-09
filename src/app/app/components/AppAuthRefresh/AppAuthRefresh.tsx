'use client';

import { useAuthContext } from '@/contexts/AuthContext';
import { useEffect } from 'react';

interface AppAuthRefreshProps {}

export default function AppAuthRefresh({}: AppAuthRefreshProps) {
  const { refresh } = useAuthContext();

  useEffect(() => {
    refresh();
  }, []);

  return <></>;
}
