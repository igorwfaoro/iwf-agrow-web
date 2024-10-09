'use client'

import { useFieldsContext } from "@/app/app/(index)/contexts/FieldsContext";
import Card from "@/components/Card/Card";

interface FieldsListProps { }

export default function FieldsList({}: FieldsListProps) {

    const {fields} = useFieldsContext()

    return (
        <div>
            {fields.map((field, i) => (
                <Card key={i} className="py-2 px-4">
                    <div className="flex justify-between">
                        <span className="font-bold">{field.name}</span>
                        <span style={{color: field.color}}>{field.culture}</span>
                    </div>

                    <div className="flex flex-col text-sm">
                        <span>Pressão Atmosférica: {field.weather.airPressureAtSeaLevel.formatted}</span>
                        <span>Temperatura: {field.weather.airTemperature.formatted}</span>
                        <span>Nuvens: {field.weather.cloudAreaFraction.formatted}</span>
                        <span>Humidade: {field.weather.relativeHumidity.formatted}</span>
                        <span>Vento: {field.weather.windFromDirection.formatted} - {field.weather.windSpeed.formatted}</span>
                        <span>Neblina: {field.weather.fogAreaFraction.formatted}</span>
                        <span>Chuva (1h): {field.weather.precipitationAmount1h.formatted}</span>
                    </div>
                </Card>
            ))}
        </div>
    );
}