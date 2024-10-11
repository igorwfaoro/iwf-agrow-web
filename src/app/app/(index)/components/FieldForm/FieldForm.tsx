'use client';

import Field from '@/components/Field/Field';
import { useGoogleApiContext } from '@/contexts/GoogleApiContext';
import { CoordinatePoint } from '@/models/common/coordinate-point';
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
    lat: z.number().min(1, 'Latitude é obrigatória'),
    lon: z.number().min(1, 'Longitude é obrigatória')
  })
});

type FormSchema = z.infer<typeof formSchema>;

interface FieldFormProps {
  isModal?: boolean;
  initialCoordinatePoint?: CoordinatePoint;
}

export default function FieldForm({
  isModal,
  initialCoordinatePoint
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

  const { mapsIsLoaded } = useGoogleApiContext();

  const coordinatePointValue = watch('coordinatePoint');

  const [locationSearchValue, setLocationSearchValue] =
    useState<CoordinatePoint>({
      lat: -21.9222,
      lon: -54.9846
    });

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lon = e.latLng.lng();

      setLocationSearchValue({ lat, lon });
      setValue('coordinatePoint', { lat, lon });
    }
  };

  useEffect(() => {
    if (initialCoordinatePoint) {
      setValue('coordinatePoint', initialCoordinatePoint);
    }
  }, [initialCoordinatePoint]);

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

        {mapsIsLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={{
              lat: locationSearchValue.lat,
              lng: locationSearchValue.lon
            }}
            zoom={13}
            mapTypeId={google.maps.MapTypeId.SATELLITE}
            onClick={handleMapClick}
          >
            {coordinatePointValue && (
              <Marker
                position={{
                  lat: coordinatePointValue.lat,
                  lng: coordinatePointValue.lon
                }}
              />
            )}
          </GoogleMap>
        )}
      </form>
    </div>
  );
}
