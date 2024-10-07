import * as dayjs from 'dayjs';
import { Collection, getRepository, Type } from 'fireorm';

export class CoordinatePoint {
  public lat: number;
  public lng: number;
}

@Collection('fields')
export class Field {
  public id: string;
  public userId: string;
  public name: string;
  public culture: string;
  public icon: string;
  public color: string;
  public createdAt: string;

  @Type(() => CoordinatePoint)
  public areaPolygon: CoordinatePoint[];

  public static repository() {
    return getRepository(Field);
  }

  public static create(props: {
    userId: string;
    name: string;
    culture: string;
    icon: string;
    color: string;
    areaPolygon: CoordinatePoint[];
  }): Field {
    const field = new Field();

    field.userId = props.userId;
    field.name = props.name;
    field.culture = props.culture;
    field.icon = props.icon;
    field.color = props.color;
    field.areaPolygon = props.areaPolygon;
    field.createdAt = dayjs().toISOString();

    return field;
  }
}
