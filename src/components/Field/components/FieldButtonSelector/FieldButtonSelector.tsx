import { twMerge } from 'tailwind-merge';
import Button from '../../../Button/Button';

interface Option<T> {
  label: string;
  subText?: string;
  value: T;
}

export type FieldButtonSelectorOption<T> = Option<T>;

export interface FieldButtonSelectorProps<T> {
  options: Option<T>[];
  buttonClassName?: string;

  onChange: (value: Option<T>) => void;
  value?: T;
}

export default function FieldButtonSelector<T>({
  options,
  buttonClassName,
  onChange,
  value
}: FieldButtonSelectorProps<T>) {
  return (
    <div className="flex gap-2 border border-primary rounded-xl p-1">
      {options.map((option) => (
        <Button
          key={`${option.label}-${option.value}`}
          onClick={() => onChange(option)}
          theme={value === option.value ? 'primary' : 'primary-outline'}
          type="button"
          size="small"
          className={twMerge('w-full', buttonClassName)}
          subText={option.subText}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
