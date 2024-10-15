'use client';

import { useFieldsContext } from '@/app/app/(index)/contexts/FieldsContext';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import { Weather } from '@/models/api/weather';

interface FieldsListProps {}

export default function FieldsList({}: FieldsListProps) {
  const { fields, openFieldForm } = useFieldsContext();

  return (
    <div className='px-2'>
      <Button type="button" onClick={() => openFieldForm()}>
        Novo Campo
      </Button>

      {fields.map((field, fieldIndex) => (
        <Card
          key={fieldIndex}
          className="py-2 px-4"
          onClick={() => openFieldForm(field)}
        >
          <div className="flex justify-between">
            <span className="font-bold text-lg">{field.name}</span>
            <span className="font-bold" style={{ color: field.color }}>
              {field.culture}
            </span>
          </div>

          <div className="text-sm">
            {Object.keys(field.weather).map((key, weatherIndex) => (
              <div key={weatherIndex}>
                <span>{field.weather[key as keyof Weather].name}: </span>
                <span className="font-bold">
                  {field.weather[key as keyof Weather].formatted}
                </span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
