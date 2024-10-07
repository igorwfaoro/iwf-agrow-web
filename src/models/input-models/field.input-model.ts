import { IsNotEmpty } from 'class-validator';
import { CoordinatePoint } from '../documents/field';

export class FieldInputModel {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public culture: string;

  @IsNotEmpty()
  public icon: string;

  @IsNotEmpty()
  public color: string;

  @IsNotEmpty()
  public areaPolygon: CoordinatePoint[];
}
