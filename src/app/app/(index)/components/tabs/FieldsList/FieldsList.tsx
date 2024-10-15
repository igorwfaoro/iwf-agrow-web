'use client';

import { useFieldsContext } from '@/app/app/(index)/contexts/FieldsContext';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import { Weather } from '@/models/api/weather';
import { appDayjs } from '@/util/date';
import { locale } from '@/util/locale';

interface FieldsListProps {}

export default function FieldsList({}: FieldsListProps) {
  const { fields, openFieldForm } = useFieldsContext();

  return (
    <div className="px-2 py-2 space-y-2">
      <div className="flex justify-end">
        <Button
          type="button"
          size="small"
          theme="primary-outline"
          onClick={() => openFieldForm()}
        >
          Novo Campo
        </Button>
      </div>

      {fields.map((field, fieldIndex) => (
        <Card
          key={fieldIndex}
          className="py-2 px-4 cursor-pointer"
          onClick={() => openFieldForm({ field })}
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

          <div className="italic text-sm">
            Última atualização:{' '}
            {appDayjs(field.lastWeatherUpdate).format(locale.dateTimeFormat)}
          </div>
        </Card>
      ))}
    </div>
  );
}
