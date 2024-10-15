import { GoogleMap, GoogleMapProps } from '@react-google-maps/api';
import { LegacyRef } from 'react';

interface CustomGoogleMapProps extends GoogleMapProps {
  customRef?: LegacyRef<GoogleMap>;
}

export default function CustomGoogleMap({
  options,
  zoom,
  customRef,
  ...others
}: CustomGoogleMapProps) {
  return (
    <GoogleMap
      options={{
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        ...options
      }}
      ref={customRef}
      zoom={zoom || 13}
      {...others}
    />
  );
}
