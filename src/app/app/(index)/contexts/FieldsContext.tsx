'use client';

import FieldForm, {
  FieldFormProps,
  FieldFormResult
} from '@/app/app/(index)/components/FieldForm/FieldForm';
import { useLoader } from '@/contexts/LoaderContext';
import { useModal } from '@/contexts/ModalContext';
import { useToast } from '@/contexts/ToastContext';
import { Field } from '@/models/api/field';
import { useFieldService } from '@/services/field.service';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export interface IFieldsProvider {
  fields: Field[];
  openFieldForm: (field?: Field) => void;
}

interface FieldsProviderProps {
  children: JSX.Element;
}

const FieldsContext = createContext<IFieldsProvider | undefined>(undefined);

const FieldsProvider = ({ children }: FieldsProviderProps) => {
  const loader = useLoader();
  const toast = useToast();
  const modal = useModal();

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

  const openFieldForm = (field?: Field) => {
    modal.open<FieldFormProps, FieldFormResult>({
      component: FieldForm,
      title: field ? 'Editar Campo' : 'Novo Campo',
      width: '95%',
      props: { field },
      onClose: (result) => {
        if (result?.field) {
          fetchFields();
        }
      }
    });
  };

  const returnValue = useMemo(() => ({ fields, openFieldForm }), [fields]);

  return (
    <FieldsContext.Provider value={returnValue}>
      {children}
    </FieldsContext.Provider>
  );
};

export default FieldsProvider;

export const useFieldsContext = () => useContext(FieldsContext)!;
