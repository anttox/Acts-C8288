import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const dbConnect = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, { dbName: "Weather" });

    console.log("Conexión a la base de datos en MongoMemoryServer exitosa");

    return mongoServer; // Agregar esta línea
};

export default dbConnect;
