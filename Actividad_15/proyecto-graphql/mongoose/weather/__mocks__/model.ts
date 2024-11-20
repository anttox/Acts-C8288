import { WeatherInterface } from "../interface";

const WeatherModel = {
  create: jest.fn((newData: WeatherInterface) => Promise.resolve(true)),
  findOne: jest.fn((query: { zip: string }) => Promise.resolve({ zip: query.zip })),
  updateOne: jest.fn(
    (query: { zip: string }, newData: WeatherInterface) =>
      Promise.resolve({ modifiedCount: 1 })
  ),
  deleteOne: jest.fn((query: { zip: string }) => Promise.resolve({ deletedCount: 1 })),
};

export default WeatherModel;
