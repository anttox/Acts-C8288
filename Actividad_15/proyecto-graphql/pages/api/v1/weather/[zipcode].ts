import type { NextApiRequest, NextApiResponse } from "next";

type WeatherResponse = {
    zip: string;
    weather: string;
    tempC: string;
    tempF: string;
    friends: string[];
};

const mockWeatherData: Record<string, WeatherResponse> = {
    "15551": {
        zip: "15551",
        weather: "Sunny",
        tempC: "28",
        tempF: "82.4",
        friends: ["15552", "15553"],
    },
    "20033": {
        zip: "20033",
        weather: "Rainy",
        tempC: "15",
        tempF: "59",
        friends: ["20044", "20055"],
    },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { zipcode } = req.query;

    // Si no se proporciona el parámetro zipcode
    if (!zipcode) {
        return res.status(400).json({ error: "Invalid zipcode parameter" });
    }

    if (typeof zipcode !== "string") {
        return res.status(400).json({ error: "Invalid zipcode parameter" });
    }

    const weatherData = mockWeatherData[zipcode];

    // Si el código postal no se encuentra
    if (!weatherData) {
        return res.status(404).json({ error: "Weather data not found for this zipcode" });
    }

    res.status(200).json(weatherData);
}
