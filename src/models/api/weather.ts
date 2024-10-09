export interface WeatherItem {
  value: number;
  unit: string;
  name: string;
  formatted: string;
}

export interface Weather {
  airPressureAtSeaLevel: WeatherItem;
  airTemperature: WeatherItem;
  cloudAreaFraction: WeatherItem;
  relativeHumidity: WeatherItem;
  windFromDirection: WeatherItem;
  windSpeed: WeatherItem;
  fogAreaFraction: WeatherItem;
  precipitationAmount1h: WeatherItem;
}
