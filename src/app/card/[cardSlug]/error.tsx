'use client';

import { useEffect } from 'react';
import Button from '../../../components/Button/Button';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const message = 'Cartão não encontrado 😥';

  return (
    <div className="flex flex-col items-center justify-center gap-8 h-screen">
      <h2 className="text-2xl font-bold">{message}</h2>

      <Button theme="primary-outline" size="small" onClick={() => reset()}>
        Tentar novamente
      </Button>
    </div>
  );
}
