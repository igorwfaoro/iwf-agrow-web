'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Field from '../../components/Field/Field';
import { useAuthContext } from '../../contexts/AuthContext';

const formSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z
      .string()
      .email('Informe um e-mail válido')
      .min(1, 'E-mail é obrigatório'),
    password: z.string().min(1, 'Senha é obrigatória'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória')
  })
  .superRefine((values, ctx) => {
    if (values.password !== values.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As senhas não coincidem',
        path: ['confirmPassword']
      });
    }
  });

type FormSchema = z.infer<typeof formSchema>;

interface RegisterPageProps {}

export default function RegisterPage({}: RegisterPageProps) {
  const router = useRouter();
  const { register } = useAuthContext();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors }
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: FormSchema) => {
    register(
      {
        name: data.name,
        email: data.email,
        password: data.password
      },
      { showLoading: true }
    ).then(() => router.push('/app'));
  };

  return (
    <div className="p-2 pt-6 flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <img src="/images/logo.png" alt="Logo" className="w-24" />
        <h1 className="font-bold text-2xl">Agrow</h1>
        <h2 className="text-xl">Criar Conta</h2>
      </div>

      <Card className="w-full p-6 flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit, console.error)}
          className="w-full"
        >
          <Field>
            <Field.Label>Nome</Field.Label>
            <Field.Input {...formRegister('name')} />
            <Field.Error>{errors.name?.message}</Field.Error>
          </Field>

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

          <Field>
            <Field.Label>Confirmar Senha</Field.Label>
            <Field.Input {...formRegister('confirmPassword')} type="password" />
            <Field.Error>{errors.confirmPassword?.message}</Field.Error>
          </Field>

          <Button className="w-full">Criar</Button>
        </form>
      </Card>
    </div>
  );
}
