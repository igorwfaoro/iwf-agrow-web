'use client';

import Field from '@/components/Field/Field';
import { CoordinatePoint } from '@/models/common/coordinate-point';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  culture: z.string().min(1, 'A Cultura é obrigatória'),
  color: z.string().min(1, 'A Cor é obrigatória'),
  coordinatePoint: z.object({
    lat: z.number().min(1, 'Latitude é obrigatória'),
    lon: z.number().min(1, 'Longitude é obrigatória')
  })
});

type FormSchema = z.infer<typeof formSchema>;

interface FieldFormProps {
  isModal?: boolean;
  coordinatePoint?: CoordinatePoint;
}

export default function FieldForm({
  isModal,
  coordinatePoint
}: FieldFormProps) {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  const [locationSearchValue, setLocationSearchValue] =
    useState<CoordinatePoint>();

  useEffect(() => {
    if (coordinatePoint) {
      setValue('coordinatePoint', coordinatePoint);
    }
  }, []);

  return (
    <div>
      <form>
        <Field>
          <Field.Label>Endereço</Field.Label>
          <Field.AddressAutocomplete
            onAddressSelected={(value) =>
              setLocationSearchValue({
                lat: value.latitude,
                lon: value.longitude
              })
            }
          />
        </Field>
      </form>
    </div>
  );
}
