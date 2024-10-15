'use client';

import { useFieldsContext } from '@/app/app/(index)/contexts/FieldsContext';
import { useGoogleApiContext } from '@/contexts/GoogleApiContext';
import { DEFAULT_COORDINATE_POINT } from '@/util/maps';
import { GoogleMap, Marker } from '@react-google-maps/api';

interface FieldsMapProps {}

export default function FieldsMap({}: FieldsMapProps) {
  const { mapsIsLoaded } = useGoogleApiContext();

  const { fields } = useFieldsContext();

  const mapCenter = fields.length
    ? fields[0].coordinatePoint
    : DEFAULT_COORDINATE_POINT;

  return (
    <div>
      {mapsIsLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
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
            />
          ))}
        </GoogleMap>
      )}
    </div>
  );
}
