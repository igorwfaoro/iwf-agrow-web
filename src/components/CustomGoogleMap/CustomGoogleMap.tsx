import { CoordinatePoint } from '@/models/common/coordinate-point';
import { GoogleMap, GoogleMapProps } from '@react-google-maps/api';
import { LegacyRef } from 'react';

interface CustomGoogleMapProps extends GoogleMapProps {
  customRef?: LegacyRef<GoogleMap>;
  coordinatesToDefineBounds?: CoordinatePoint[];
}

export default function CustomGoogleMap({
  options,
  zoom,
  customRef,
  coordinatesToDefineBounds,
  onLoad,
  ...others
}: CustomGoogleMapProps) {
  const handleOnLoad = (map: google.maps.Map) => {
    if (coordinatesToDefineBounds) {
      const bounds = new google.maps.LatLngBounds();

      coordinatesToDefineBounds.forEach((coordinate) =>
        bounds.extend({
          lat: coordinate.lat,
          lng: coordinate.lon
        })
      );

      map.fitBounds(bounds);
    }

    if (onLoad) onLoad(map);
  };

  return (
    <GoogleMap
      options={{
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        ...options
      }}
      onLoad={handleOnLoad}
      ref={customRef}
      zoom={zoom || 16}
      {...others}
    />
  );
}
