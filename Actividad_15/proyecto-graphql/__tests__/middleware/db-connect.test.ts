/**
 * @jest-environment node
 */

import dbConnect from "../../middleware/db-connect";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("dbConnect", () => {
    let connection: MongoMemoryServer;

    afterEach(async () => {
        jest.clearAllMocks(); // Limpia mocks después de cada prueba
        if (connection) {
            await connection.stop(); // Detiene MongoMemoryServer
        }
        await mongoose.disconnect(); // Desconecta Mongoose explícitamente
    });

    afterAll(async () => {
        jest.restoreAllMocks(); // Restaura mocks al finalizar
    });

    test("calls MongoMemoryServer.create()", async () => {
        const spy = jest.spyOn(MongoMemoryServer, "create");
        connection = await dbConnect();
        expect(spy).toHaveBeenCalled();
    });

    test("calls mongoose.disconnect()", async () => {
        const spy = jest.spyOn(mongoose, "disconnect");
        connection = await dbConnect();
        await mongoose.disconnect(); // Llama manualmente para simular la desconexión
        expect(spy).toHaveBeenCalled();
    });

    test("calls mongoose.connect()", async () => {
        const spy = jest.spyOn(mongoose, "connect");
        connection = await dbConnect();
        const MONGO_URI = connection.getUri();
        expect(spy).toHaveBeenCalledWith(MONGO_URI, { dbName: "Weather" });
    });
});
