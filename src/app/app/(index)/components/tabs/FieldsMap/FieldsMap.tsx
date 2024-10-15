'use client';

import { useFieldsContext } from '@/app/app/(index)/contexts/FieldsContext';
import { useGoogleApiContext } from '@/contexts/GoogleApiContext';
import { Field } from '@/models/api/field';
import { Weather } from '@/models/api/weather';
import { DEFAULT_COORDINATE_POINT } from '@/util/maps';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { useState } from 'react';

interface FieldsMapProps {}

export default function FieldsMap({}: FieldsMapProps) {
  const { mapsIsLoaded } = useGoogleApiContext();

  const { fields } = useFieldsContext();

  const [selectedField, setSelectedField] = useState<Field | null>(null);

  const handleMarkerClick = (field: Field) => {
    setSelectedField(field);
  };

  const mapCenter = fields.length
    ? fields[0].coordinatePoint
    : DEFAULT_COORDINATE_POINT;

  return (
    <div className='h-full'>
      {mapsIsLoaded && (
        <GoogleMap
          mapContainerClassName='w-full h-full'
          center={{
            lat: mapCenter.lat,
            lng: mapCenter.lon
          }}
          zoom={13}
          mapTypeId={google.maps.MapTypeId.SATELLITE}
          //   onClick={handleMapClick}
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
                <div className='space-y-1'>
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
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
}
