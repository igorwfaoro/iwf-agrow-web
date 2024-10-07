interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

type CoordinatePoint = [number, number];

interface Field {
  id: string;
  name: string;
  culture: string;
  icon: string;
  color: string;
  areaPolygon: CoordinatePoint[];
}

interface FieldMonitoring {
    id: string;
    fieldId: string;
    metric: string; // temperature
    condition: string; // <=20
}

interface FieldAlert {
    id: string;
    fieldId: string;
    metric: string; // temperature
    condition: string; // <=20
    createdAt: string;
}