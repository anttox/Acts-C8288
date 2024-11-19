import { Document } from "mongoose";

export interface WeatherInterface extends Document {
  zip: string;
  weather: string;
  tempC: string;
  tempF: string;
  friends: string[];
}
