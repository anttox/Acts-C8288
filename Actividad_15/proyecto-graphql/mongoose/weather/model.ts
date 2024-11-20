import mongoose, { Schema } from "mongoose";
import { WeatherInterface } from "./interface";

const WeatherSchema = new Schema<WeatherInterface>({
  zip: { type: String, required: true, unique: true },
  weather: { type: String, required: true },
  tempC: { type: String, required: true },
  tempF: { type: String, required: true },
  friends: { type: [String], default: [] },
});

export default mongoose.models.Weather || mongoose.model<WeatherInterface>("Weather", WeatherSchema);
