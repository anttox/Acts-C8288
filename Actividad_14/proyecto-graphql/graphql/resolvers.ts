import { WeatherInterface } from "../mongoose/weather/interface";
import { findByZip, updateByZip, deleteByZip } from "../mongoose/weather/services";

export const resolvers = {
  Query: {
    weather: async (_: any, { zip }: { zip: string }) => {
      try {
        console.log(`Consultando datos meteorológicos para el código postal: ${zip}`);
        const data = await findByZip(zip);

        if (!data) {
          console.warn(`No se encontraron datos para el código postal: ${zip}`);
          return [];
        }

        const friends = await Promise.all(
          data.friends.map(async (friendZip: string) => {
            const friendData = await findByZip(friendZip);
            return friendData || null;
          })
        );

        const validFriends = friends.filter((friend) => friend !== null);

        return [
          {
            ...data.toObject(),
            friends: validFriends,
          },
        ];
      } catch (error) {
        console.error("Error al obtener los datos meteorológicos:", error.message);
        throw new Error("No se pudo obtener los datos meteorológicos");
      }
    },
  },
  Mutation: {
    weather: async (_: any, { data }: { data: WeatherInterface }) => {
      try {
        console.log(`Actualizando datos meteorológicos para el código postal: ${data.zip}`);
        await updateByZip(data.zip, data);

        const updatedData = await findByZip(data.zip);

        if (!updatedData) {
          console.warn(`No se encontraron datos actualizados para el código postal: ${data.zip}`);
          throw new Error("No se logró actualizar los datos meteorológicos");
        }

        const friends = await Promise.all(
          updatedData.friends.map(async (friendZip: string) => {
            const friendData = await findByZip(friendZip);
            return friendData || null;
          })
        );

        const validFriends = friends.filter((friend) => friend !== null);

        return [
          {
            ...updatedData.toObject(),
            friends: validFriends,
          },
        ];
      } catch (error) {
        console.error("Error al actualizar los datos meteorológicos:", error.message);
        throw new Error("No se pudo actualizar los datos meteorológicos");
      }
    },
    deleteWeather: async (_: any, { zip }: { zip: string }) => {
      try {
        console.log(`Eliminando datos meteorológicos para el código postal: ${zip}`);
        await deleteByZip(zip);
        return `Datos eliminados correctamente para el código postal: ${zip}`;
      } catch (error) {
        console.error("Error al eliminar los datos meteorológicos:", error.message);
        throw new Error("No se pudo eliminar los datos meteorológicos");
      }
    },
  },
};
