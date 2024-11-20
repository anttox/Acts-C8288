export interface WeatherInterface {
  _id?: string; // Hacer _id opcional para facilitar las pruebas
  zip: string;
  weather: string;
  tempC: string;
  tempF: string;
  friends: string[];
}
