'use client';

import { useEffect } from 'react';
import { useAuthContext } from '../../../../contexts/AuthContext';

interface AppAuthRefreshProps {}

export default function AppAuthRefresh({}: AppAuthRefreshProps) {
  const { refresh } = useAuthContext();

  useEffect(() => {
    refresh();
  }, []);

  return <></>;
}
