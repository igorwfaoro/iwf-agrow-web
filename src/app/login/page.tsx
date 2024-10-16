'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Field from '../../components/Field/Field';
import { useAuthContext } from '../../contexts/AuthContext';

const formSchema = z.object({
  email: z
    .string()
    .email('Informe um e-mail válido')
    .min(1, 'E-mail é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória')
});

type FormSchema = z.infer<typeof formSchema>;

interface LoginPageProps {}

export default function LoginPage({}: LoginPageProps) {
  const router = useRouter();
  const { login } = useAuthContext();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors }
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: FormSchema) => {
    login(data, { showLoading: true }).then(() => router.push('/app'));
  };

  return (
    <div className="p-2 pt-6 flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-1">
        <img src="/images/logo.png" alt="Logo" className="w-24" />
        <h1 className="font-bold text-2xl">Agrow</h1>
        <h2 className="text-xl">Login</h2>
      </div>

      <Card className="w-full p-6 flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit, console.error)}
          className="w-full"
        >
          <Field>
            <Field.Label>E-mail</Field.Label>
            <Field.Input {...formRegister('email')} />
            <Field.Error>{errors.email?.message}</Field.Error>
          </Field>

          <Field>
            <Field.Label>Senha</Field.Label>
            <Field.Input {...formRegister('password')} type="password" />
            <Field.Error>{errors.password?.message}</Field.Error>
          </Field>

          <div className="space-y-4">
            <Button className="w-full">Login</Button>
            <Button theme="primary-outline" className="w-full" href="/register">
              Criar conta
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
