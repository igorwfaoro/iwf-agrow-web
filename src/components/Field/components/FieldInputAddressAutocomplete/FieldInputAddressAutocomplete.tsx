import { useGoogleApiContext } from '@/contexts/GoogleApiContext';
import { Autocomplete } from '@react-google-maps/api';
import { useRef, useState } from 'react';
import FieldInput, { FieldInputProps } from '../FieldInput/FieldInput';
import { Place } from './types/place';

interface FieldInputAddressAutocompleteProps extends FieldInputProps {
  onAddressSelected: (place: Place) => void;
  defaultPlaceValue?: Place;
  placesType?: string;
  clearAfterSelect?: boolean;
  focusAfterSelect?: boolean;
}

export default function FieldInputAddressAutocomplete({
  onAddressSelected,
  placeholder = 'Digite um endereço',
  defaultPlaceValue,
  placesType = 'establishment|address',
  clearAfterSelect,
  focusAfterSelect,
  ...props
}: FieldInputAddressAutocompleteProps) {
  const { mapsIsLoaded } = useGoogleApiContext();

  const [currentPlace, setCurrentPlace] = useState<Place | undefined>(
    defaultPlaceValue
  );

  const mapPlaceResult = (place: any): Place => {
    return {
      formattedAddress: place.formatted_address,
      street: place.address_components.find((x: any) =>
        x.types.includes('route')
      )?.long_name,
      number: place.address_components.find((x: any) =>
        x.types.includes('street_number')
      )?.long_name,
      zipCode: place.address_components.find((x: any) =>
        x.types.includes('postal_code')
      )?.long_name,
      neighborhood: place.address_components.find((x: any) =>
        x.types.includes('sublocality_level_1')
      )?.long_name,
      city: place.address_components.find((x: any) =>
        x.types.includes('administrative_area_level_2')
      )?.long_name,
      state: place.address_components.find((x: any) =>
        x.types.includes('administrative_area_level_1')
      )?.short_name,
      country: place.address_components.find((x: any) =>
        x.types.includes('country')
      )?.long_name,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng()
    };
  };

  const ref = useRef<any>(null);

  const onPlaceSelected = () => {
    const place = ref.current.getPlace();
    !clearAfterSelect && setCurrentPlace(place);
    onAddressSelected(mapPlaceResult(place));

    if (clearAfterSelect) ref.current!.value = '';
    if (focusAfterSelect) ref.current!.focus();
  };

  if (!mapsIsLoaded) return <></>;

  return (
    <Autocomplete
      onLoad={(autocomplete) => (ref.current = autocomplete)}
      onPlaceChanged={onPlaceSelected}
      // options={{ types: ['address', 'establishment'] }}
    >
      <FieldInput
        {...props}
        autoComplete="off"
        defaultValue={currentPlace?.formattedAddress}
        placeholder={placeholder}
      />
    </Autocomplete>
  );
}
