import { twMerge } from 'tailwind-merge';

interface Option {
  imagePath: string;
  value?: string;
}

export type FieldImageSelectorOption = Option;

export interface FieldImageSelectorProps {
  options: Option[];
  className?: string;
  onChange: (value: Option) => void;
  value?: string;
  gridCols?: number;
}

export default function FieldImageSelector({
  options,
  className,
  onChange,
  value
}: FieldImageSelectorProps) {
  return (
    <div
      className={twMerge(
        'grid grid-cols-4 gap-1 border border-primary rounded-xl p-1',
        className
      )}
    >
      {options.map((option) => (
        <div
          key={`img-${option.imagePath}`}
          onClick={() => onChange(option)}
          style={{ backgroundImage: `url(${option.imagePath})` }}
          className={twMerge(
            'rounded-lg bg-cover w-full h-16 cursor-pointer border border-neutral-200',
            value === (option.value ?? option.imagePath) &&
              'border-4 border-primary'
          )}
        />
      ))}
    </div>
  );
}
