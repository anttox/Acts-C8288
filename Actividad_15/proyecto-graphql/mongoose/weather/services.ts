import WeatherModel from "./model";
import { WeatherInterface } from "./interface";

export const findByZip = async (zip: string): Promise<WeatherInterface | null> => {
    try {
        return await WeatherModel.findOne({ zip });
    } catch (error) {
        console.error(`Error al buscar por código postal ${zip}:`, (error as Error).message);
        throw new Error("Error al buscar datos meteorológicos");
    }
};

export const updateByZip = async (
    zip: string,
    data: Partial<WeatherInterface>
): Promise<{ modifiedCount: number }> => {
    try {
        return await WeatherModel.updateOne({ zip }, data);
    } catch (error) {
        console.error(`Error al actualizar datos para el código postal ${zip}:`, (error as Error).message);
        throw new Error("Error al actualizar datos meteorológicos");
    }
};

export const deleteByZip = async (zip: string): Promise<{ deletedCount: number }> => {
    try {
        return await WeatherModel.deleteOne({ zip });
    } catch (error) {
        console.error(`Error al eliminar datos para el código postal ${zip}:`, (error as Error).message);
        throw new Error("Error al eliminar datos meteorológicos");
    }
};
