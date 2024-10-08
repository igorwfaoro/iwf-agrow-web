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
    <div>
      <Card>
        <form onSubmit={handleSubmit(onSubmit, console.error)}>
          <Field>
            <Field.Label>E-mail</Field.Label>
            <Field.Input {...formRegister('email')} />
            <Field.Error>{errors.email?.message}</Field.Error>
          </Field>

          <Field>
            <Field.Label>E-mail</Field.Label>
            <Field.Input {...formRegister('password')} type="password" />
            <Field.Error>{errors.password?.message}</Field.Error>
          </Field>

          <Button>Login</Button>
        </form>
      </Card>
    </div>
  );
}
