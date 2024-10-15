'use client';

import { useFieldsContext } from '@/app/app/(index)/contexts/FieldsContext';
import Button from '@/components/Button/Button';
import CustomGoogleMap from '@/components/CustomGoogleMap/CustomGoogleMap';
import { useGoogleApiContext } from '@/contexts/GoogleApiContext';
import { Field } from '@/models/api/field';
import { Weather } from '@/models/api/weather';
import { DEFAULT_COORDINATE_POINT } from '@/util/maps';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

interface FieldsMapProps {}

export default function FieldsMap({}: FieldsMapProps) {
  const { mapsIsLoaded } = useGoogleApiContext();
  const { fields, openFieldForm } = useFieldsContext();

  const mapRef = useRef<GoogleMap>(null);

  const mapCenter = fields.length
    ? fields[0].coordinatePoint
    : DEFAULT_COORDINATE_POINT;

  const [selectedField, setSelectedField] = useState<Field | null>(null);

  const handleMarkerClick = (field: Field) => {
    setSelectedField(field);
  };

  const onLoad = (map: google.maps.Map) => {
    const actionsDivElement = document.createElement('div');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(actionsDivElement);

    const root = createRoot(actionsDivElement);

    root.render(
      <div className="m-[10px]">
        <Button
          onClick={() => {
            const map = mapRef.current?.state.map;
            if (map) {
              const { lat, lng } = map.getCenter()!;

              openFieldForm({
                initialLocation: {
                  lat: lat(),
                  lon: lng()
                }
              });
            }
          }}
        >
          Criar Novo Campo
        </Button>
      </div>
    );
  };

  return (
    <div className="h-full">
      {mapsIsLoaded && (
        <CustomGoogleMap
          mapContainerClassName="w-full h-full"
          center={{
            lat: mapCenter.lat,
            lng: mapCenter.lon
          }}
          onLoad={onLoad}
          customRef={mapRef}
        >
          {fields?.map((field) => (
            <Marker
              position={{
                lat: field.coordinatePoint.lat,
                lng: field.coordinatePoint.lon
              }}
              onClick={() => handleMarkerClick(field)}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 6,
                fillColor: field.color,
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 1
              }}
              label={{
                text: `${field.name}\n(${field.culture})`,
                color: '#000000',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                className: `bg-white py-[1px] px-[2px] rounded mb-12`
              }}
            />
          ))}

          {selectedField && (
            <InfoWindow
              position={{
                lat: selectedField.coordinatePoint.lat,
                lng: selectedField.coordinatePoint.lon
              }}
              onCloseClick={() => setSelectedField(null)}
            >
              <div className="space-y-2">
                <h3 className="font-bold">
                  {`${selectedField.name} (${selectedField.culture})`}
                </h3>

                <div className="space-y-1">
                  {Object.keys(selectedField.weather).map(
                    (key, weatherIndex) => (
                      <div key={weatherIndex}>
                        <span>
                          {selectedField.weather[key as keyof Weather].name}:{' '}
                        </span>
                        <span className="font-bold">
                          {
                            selectedField.weather[key as keyof Weather]
                              .formatted
                          }
                        </span>
                      </div>
                    )
                  )}
                </div>

                <Button
                  type="button"
                  size="small"
                  theme="primary-outline"
                  onClick={() => openFieldForm({ field: selectedField })}
                >
                  Editar
                </Button>
              </div>
            </InfoWindow>
          )}
        </CustomGoogleMap>
      )}
    </div>
  );
}
