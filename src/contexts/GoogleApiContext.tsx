import { locale } from '@/util/locale';
import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { createContext, useContext, useMemo } from 'react';

export interface IGoogleApiProvider {
  mapsIsLoaded: boolean;
}

interface GoogleApiProviderProps {
  children: JSX.Element;
}

const libraries: Libraries = ['places'];

const GoogleApiContext = createContext<IGoogleApiProvider | undefined>(
  undefined
);

const GoogleApiProvider = (props: GoogleApiProviderProps) => {
  const { isLoaded: mapsIsLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries,
    language: locale.id
  });

  // const [mapsIsLoaded, setMapsIsLoaded] = useState(false);

  // const mapsIsLoaded = true;

  const returnValue = useMemo(() => ({ mapsIsLoaded }), [mapsIsLoaded]);

  return (
    <GoogleApiContext.Provider value={returnValue}>
      {/* {mapsIsLoaded ? (
         <LoadScriptNext
           googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
           libraries={['places']}
           onLoad={() => console.log('eeeee')}
           language={locale.id}
         >
           {props.children}
         </LoadScriptNext>
       ) : (
         props.children
       )} */}
      {mapsIsLoaded && props.children}
    </GoogleApiContext.Provider>
  );
};

export default GoogleApiProvider;

export const useGoogleApiContext = () => useContext(GoogleApiContext)!;
