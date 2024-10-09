'use client';

import Button from '@/components/Button/Button';
import Field from '@/components/Field/Field';
import { useAuthContext } from '@/contexts/AuthContext';
import { useLoader } from '@/contexts/LoaderContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z
    .string()
    .email('Informe um e-mail válido')
    .min(1, 'E-mail é obrigatório')
});

type FormSchema = z.infer<typeof formSchema>;

interface AccountPageProps {}

export default function AccountPage({}: AccountPageProps) {
  const loader = useLoader();

  const { loggedUser, logout } = useAuthContext();

  const {
    register: register,
    formState: { errors },
    watch,
    setValue
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    if (loggedUser) {
      setValue('name', loggedUser.name);
      setValue('email', loggedUser.email);
    }
  }, [loggedUser]);

  const handleLogout = () => {
    loader.show();
    setTimeout(() => {
      loader.hide();
      logout();
    }, 1000);
  };

  const nameValue = watch('name');
  const emailValue = watch('email');

  const enableButtonSave =
    loggedUser &&
    (loggedUser.name !== nameValue || loggedUser.email !== emailValue);

  return (
    <div className="space-y-4">
      <form>
        <Field>
          <Field.Input {...register('name')} disabled />
          <Field.Error>{errors.name?.message}</Field.Error>
        </Field>

        <Field>
          <Field.Input {...register('email')} disabled />
          <Field.Error>{errors.email?.message}</Field.Error>
        </Field>

        <Button disabled={!enableButtonSave} className="w-full">
          Salvar
        </Button>
      </form>

      <Button
        theme="danger-outline"
        className="w-full"
        onClick={handleLogout}
        type="button"
      >
        Sair
      </Button>
    </div>
  );
}
