/**
 * @jest-environment node
 */
import { WeatherInterface } from "../../../mongoose/weather/interface";
import {
    findByZip,
    updateByZip,
    deleteByZip,
} from "../../../mongoose/weather/services";

import WeatherModel from "../../../mongoose/weather/model";

jest.mock("../../../mongoose/weather/model");

describe("Weather Services", () => {
    const doc: WeatherInterface = {
        _id: "mockId",
        zip: "test",
        weather: "weather",
        tempC: "00",
        tempF: "01",
        friends: [],
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("findByZip", () => {
        test("should return true when zip is found", async () => {
            (WeatherModel.findOne as jest.Mock).mockResolvedValueOnce(doc);
            const result = await findByZip(doc.zip);
            expect(result).toEqual(doc);
        });
    });

    describe("updateByZip", () => {
        test("should return true when zip is updated", async () => {
            (WeatherModel.updateOne as jest.Mock).mockResolvedValueOnce({ modifiedCount: 1 });
            const result = await updateByZip(doc.zip, doc);
            expect(result).toEqual({ modifiedCount: 1 });
        });
    });

    describe("deleteByZip", () => {
        test("should return true when zip is deleted", async () => {
            (WeatherModel.deleteOne as jest.Mock).mockResolvedValueOnce({ deletedCount: 1 });
            const result = await deleteByZip(doc.zip);
            expect(result).toEqual({ deletedCount: 1 });
        });
    });
});
