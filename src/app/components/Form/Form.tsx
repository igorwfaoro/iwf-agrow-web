'use client';

import Button from '../../../components/Button/Button';
import Divider from '../../../components/Divider/Divider';
import Field from '../../../components/Field/Field';
import { Plan } from '../../../models/enums/plan';
import { useCardContext } from '../../contexts/CardContext';
import Preview from './components/Preview/Preview';

interface FormProps {}

export default function Form({}: FormProps) {
  const {
    form: { register, handleSubmit, setValue, watch },
    formState: { errors },
    themesOptions,
    plansOptions,
    submit
  } = useCardContext();

  const planValue = watch('plan');
  const messageValue = watch('message');
  const themeValue = watch('theme');
  const fontColorValue = watch('fontColor');

  return (
    <form
      onSubmit={handleSubmit(submit, (error) => console.error(error))}
      className="space-y-6"
    >
      <div>
        <Field>
          <Field.Label>Plano</Field.Label>
          <Field.ButtonSelector
            options={plansOptions}
            onChange={(value) => setValue('plan', value.value)}
            value={planValue}
          />
          <Field.Error>{errors.plan?.message}</Field.Error>
        </Field>

        <Field>
          <Field.Label>Seu Nome</Field.Label>
          <Field.Input {...register('creatorName')} />
          <Field.Error>{errors.creatorName?.message}</Field.Error>
        </Field>

        <Field>
          <Field.Label>Nome do Aniversariante</Field.Label>
          <Field.Input {...register('birthdayPersonName')} />
          <Field.Error>{errors.birthdayPersonName?.message}</Field.Error>
        </Field>

        <Field>
          <Field.Label>Data de nascimento do aniversariante</Field.Label>
          <Field.Input {...register('birthDate')} type="date" />
          <Field.Error>{errors.birthDate?.message}</Field.Error>
        </Field>

        <Field>
          <Field.Label>Título</Field.Label>
          <Field.Input {...register('title')} />
          <Field.Error>{errors.title?.message}</Field.Error>
        </Field>

        <Field>
          <Field.Label>Mensagem ({messageValue?.length || 0}/200)</Field.Label>
          <Field.HelpText className="font-bold">
            ⚠️ ATENÇÃO: A mensagem só aparecerá no dia do aniversário
          </Field.HelpText>
          <Field.TextArea {...register('message')} />
          <Field.Error>{errors.message?.message}</Field.Error>
        </Field>

        {planValue === Plan.PRO && (
          <Field>
            <Field.Label>Link da Música (YouTube)</Field.Label>
            <Field.HelpText>
              Link de um vídeo do YouTube para reproduzir no cartão
            </Field.HelpText>
            <Field.HelpText className="font-bold">
              ⚠️ ATENÇÃO: O vídeo só aparecerá no dia do aniversário
            </Field.HelpText>
            <Field.Input
              {...register('songLink')}
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <Field.Error>{errors.songLink?.message}</Field.Error>
          </Field>
        )}

        <Field>
          <Field.Label>Tema</Field.Label>
          <Field.ImageSelector
            options={themesOptions}
            onChange={(value) => setValue('theme', value.value!)}
            value={themeValue}
          />
          <Field.Error>{errors.theme?.message}</Field.Error>
        </Field>

        <Field>
          <Field.Label>Desfoque de fundo</Field.Label>
          <Field.Input
            {...register('bgBlur', { valueAsNumber: true })}
            type="range"
            step={1}
            min={0}
            max={30}
          />
          <Field.Error>{errors.bgBlur?.message}</Field.Error>
        </Field>

        <Field>
          <Field.Label>Cor da fonte</Field.Label>
          <Field.Color
            onChange={(value) => setValue('fontColor', value)}
            value={fontColorValue}
          />
          <Field.Error>{errors.fontColor?.message}</Field.Error>
        </Field>
      </div>

      <Divider />

      <Preview />

      <Button className="w-full">Criar!</Button>
    </form>
  );
}
