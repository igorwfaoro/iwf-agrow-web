import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import Skeleton from '../Skeleton/Skeleton';
import FieldButtonSelector from './components/FieldButtonSelector/FieldButtonSelector';
import FieldColor from './components/FieldColor/FieldColor';
import FieldError from './components/FieldError/FieldError';
import FieldHelpText from './components/FieldHelpText/FieldHelpText';
import FieldImageSelector from './components/FieldImageSelector/FieldImageSelector';
import FieldInput from './components/FieldInput/FieldInput';
import FieldLabel from './components/FieldLabel/FieldLabel';
import FieldSelect from './components/FieldSelect/FieldSelect';
import FieldSelectOption from './components/FieldSelect/components/FieldSelectOption/FieldSelectOption';
import FieldTextArea from './components/FieldTextarea/FieldTextarea';

interface FieldProps {
  className?: string;
  isLoading?: boolean;
  children: ReactNode;
}

export default function Field({ className, isLoading, children }: FieldProps) {
  if (isLoading)
    return (
      <div className="space-y-2 mb-4">
        <Skeleton className="rounded-md h-6 w-24" />
        <Skeleton className="rounded-lg h-14 w-full" />
      </div>
    );

  return (
    <div className={twMerge('mb-4 flex flex-col gap-1', className)}>
      {children}
    </div>
  );
}

Field.Label = FieldLabel;
Field.Input = FieldInput;
Field.Select = FieldSelect;
Field.TextArea = FieldTextArea;
Field.SelectOption = FieldSelectOption;
Field.ButtonSelector = FieldButtonSelector;
Field.ImageSelector = FieldImageSelector;
Field.Color = FieldColor;
Field.HelpText = FieldHelpText;
Field.Error = FieldError;
