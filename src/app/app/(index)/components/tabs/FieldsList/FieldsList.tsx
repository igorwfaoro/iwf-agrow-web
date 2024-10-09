'use client'

import { useFieldsContext } from "@/app/app/(index)/contexts/FieldsContext";
import Card from "@/components/Card/Card";
import { Weather } from "@/models/api/weather";

interface FieldsListProps { }

export default function FieldsList({}: FieldsListProps) {

    const {fields} = useFieldsContext()

    return (
        <div>
            {fields.map((field, fieldIndex) => (
                <Card key={fieldIndex} className="py-2 px-4">
                    <div className="flex justify-between">
                        <span className="font-bold text-lg">{field.name}</span>
                        <span className="font-bold" style={{color: field.color}}>{field.culture}</span>
                    </div>

                    <div className="text-sm">
                        {Object.keys(field.weather).map((key, weatherIndex) => <div key={weatherIndex}>
                            <span>{field.weather[key as keyof Weather].name}: </span>
                            <span className="font-bold">{field.weather[key as keyof Weather].formatted}</span>
                        </div>)}
                    </div>
                </Card>
            ))}
        </div>
    );
}