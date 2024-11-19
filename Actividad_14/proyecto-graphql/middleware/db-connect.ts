import mongoose from "mongoose";

// Verificar en que etorno trabajremos si es produccion o desarrollo
const ENVIRONMENT = process.env.NODE_ENV || "development";

// Seleccionar la URI correspondiente
const MONGO_URI =
  ENVIRONMENT === "production"
    ? process.env.MONGO_URI // URI para produccion
    : process.env.MONGO_URI_DEV; // URI para desarrollo

if (!MONGO_URI) {
  throw new Error(
    `Por favor, define la variable ${
      ENVIRONMENT === "production" ? "MONGO_URI" : "MONGO_URI_DEV"
    } en el archivo .env.local`
  );
}

// Cache global para la conexión
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    console.log("Usando conexión MongoDB existente");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Estableciendo nueva conexión con MongoDB...");
    cached.promise = mongoose
      .connect(MONGO_URI, { bufferCommands: false })
      .then((mongoose) => {
        console.log("Conexión a MongoDB exitosa");
        return mongoose;
      })
      .catch((error) => {
        console.error("Error al conectar con MongoDB:", error.message);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("Error al establecer la conexión con MongoDB:", error.message);
    throw new Error("No se pudo conectar a la base de datos MongoDB");
  }
};

export default dbConnect;
