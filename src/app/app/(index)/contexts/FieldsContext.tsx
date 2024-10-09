'use client';

import { useLoader } from '@/contexts/LoaderContext';
import { useToast } from '@/contexts/ToastContext';
import { Field } from '@/models/api/field';
import { useFieldService } from '@/services/field.service';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export interface IFieldsProvider {
  fields: Field[];
}

interface FieldsProviderProps {
  children: JSX.Element;
}

const FieldsContext = createContext<IFieldsProvider | undefined>(undefined);

const FieldsProvider = ({ children }: FieldsProviderProps) => {
  const loader = useLoader();
  const toast = useToast();

  const fieldService = useFieldService();

  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = () => {
    loader.show();

    fieldService
      .list()
      .then((response) => {
        setFields(response);
      })
      .catch(toast.openHttpError)
      .finally(loader.hide);
  };

  const returnValue = useMemo(() => ({ fields }), [fields]);

  return (
    <FieldsContext.Provider value={returnValue}>
      {children}
    </FieldsContext.Provider>
  );
};

export default FieldsProvider;

export const useFieldsContext = () => useContext(FieldsContext)!;
