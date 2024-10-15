import { CoordinatePoint } from '../common/coordinate-point';
import { Weather } from './weather';

export interface Field {
  id: string;
  name: string;
  culture: string;
  color: string;
  coordinatePoint: CoordinatePoint;
  weather: Weather;
  lastWeatherUpdate: string;
  createdAt: string;
}
