'use client';

import Button from '@/components/Button/Button';
import CustomGoogleMap from '@/components/CustomGoogleMap/CustomGoogleMap';
import { default as FormField } from '@/components/Field/Field';
import { useGoogleApiContext } from '@/contexts/GoogleApiContext';
import { useLoader } from '@/contexts/LoaderContext';
import { ModalRefPropType } from '@/contexts/ModalContext';
import { useToast } from '@/contexts/ToastContext';
import { Field } from '@/models/api/field';
import { CoordinatePoint } from '@/models/common/coordinate-point';
import { useFieldService } from '@/services/field.service';
import { DEFAULT_COORDINATE_POINT } from '@/util/maps';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  culture: z.string().min(1, 'A Cultura é obrigatória'),
  color: z.string().min(1, 'A Cor é obrigatória'),
  coordinatePoint: z.object({
    lat: z.number(),
    lon: z.number()
  })
});

type FormSchema = z.infer<typeof formSchema>;

export interface FieldFormProps
  extends ModalRefPropType<FieldFormProps, FieldFormResult> {
  field?: Field;
  initialLocation?: CoordinatePoint;
}

export interface FieldFormResult {
  field?: Field;
}

export default function FieldForm({
  field,
  initialLocation,
  modalRef
}: FieldFormProps) {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  const loader = useLoader();
  const toast = useToast();

  const { mapsIsLoaded } = useGoogleApiContext();
  const fieldService = useFieldService();

  const coordinatePointValue = watch('coordinatePoint');
  const colorValue = watch('color');

  const [locationSearchValue, setLocationSearchValue] =
    useState<CoordinatePoint>(initialLocation || DEFAULT_COORDINATE_POINT);

  useEffect(() => {
    if (field) {
      setValue('name', field.name);
      setValue('culture', field.culture);
      setValue('color', field.color);
      setValue('coordinatePoint', field.coordinatePoint);
      setLocationSearchValue(field.coordinatePoint);
    }
  }, [field]);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lon = e.latLng.lng();

      setLocationSearchValue({ lat, lon });
      setValue('coordinatePoint', { lat, lon });
    }
  };

  const save = (data: FormSchema) => {
    const promise = field
      ? fieldService.update(field.id, data)
      : fieldService.create(data);

    loader.show();

    promise
      .then((response) => {
        modalRef.close({ field: response });
      })
      .catch(toast.openHttpError)
      .finally(loader.hide);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(save, console.error)}>
        <FormField>
          <FormField.Label>Endereço</FormField.Label>
          <FormField.AddressAutocomplete
            onAddressSelected={(value) =>
              setLocationSearchValue({
                lat: value.latitude,
                lon: value.longitude
              })
            }
          />

          {mapsIsLoaded && (
            <CustomGoogleMap
              mapContainerStyle={{ width: '100%', height: '400px' }}
              center={{
                lat: locationSearchValue.lat,
                lng: locationSearchValue.lon
              }}
              onClick={handleMapClick}
            >
              {coordinatePointValue && (
                <Marker
                  position={{
                    lat: coordinatePointValue.lat,
                    lng: coordinatePointValue.lon
                  }}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 6,
                    fillColor: '#922626',
                    fillOpacity: 1,
                    strokeColor: '#ffffff',
                    strokeWeight: 1
                  }}
                />
              )}
            </CustomGoogleMap>
          )}
        </FormField>

        <FormField>
          <FormField.Label>Nome</FormField.Label>
          <FormField.Input {...formRegister('name')} />
          <FormField.Error>{errors.name?.message}</FormField.Error>
        </FormField>

        <FormField>
          <FormField.Label>Cultura</FormField.Label>
          <FormField.Input {...formRegister('culture')} />
          <FormField.Error>{errors.culture?.message}</FormField.Error>
        </FormField>

        <FormField>
          <FormField.Label>Cor</FormField.Label>
          <FormField.Color
            value={colorValue}
            onChange={(value) => setValue('color', value)}
          ></FormField.Color>
          <FormField.Error>{errors.culture?.message}</FormField.Error>
        </FormField>

        <Button className="sm:w-full">Salvar</Button>
      </form>
    </div>
  );
}
