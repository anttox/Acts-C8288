import WeatherModel from "./model";
import { WeatherInterface } from "./interface";

export const findByZip = async (zip: string): Promise<WeatherInterface | null> => {
  try {
    return await WeatherModel.findOne({ zip });
  } catch (error) {
    console.error(`Error al buscar por código postal ${zip}:`, error.message);
    throw new Error("Error al buscar datos meteorológicos");
  }
};

export const updateByZip = async (
  zip: string,
  data: Partial<WeatherInterface>
): Promise<WeatherInterface | null> => {
  try {
    return await WeatherModel.findOneAndUpdate({ zip }, data, { new: true, upsert: true });
  } catch (error) {
    console.error(`Error al actualizar datos para el código postal ${zip}:`, error.message);
    throw new Error("Error al actualizar datos meteorológicos");
  }
};

export const deleteByZip = async (zip: string): Promise<void> => {
  try {
    const result = await WeatherModel.findOneAndDelete({ zip });
    if (!result) {
      console.warn(`No se encontró un registro para el código postal ${zip} para eliminar.`);
      throw new Error("No se encontró el registro para eliminar");
    }
    console.log(`Registro eliminado correctamente para el código postal: ${zip}`);
  } catch (error) {
    console.error(`Error al eliminar datos para el código postal ${zip}:`, error.message);
    throw new Error("Error al eliminar datos meteorológicos");
  }
};
