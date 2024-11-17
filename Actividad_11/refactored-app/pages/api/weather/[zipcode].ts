/*
// Parte 1
import type { NextApiRequest, NextApiResponse } from "next";

type WeatherDetailType = {
    zipcode: string; // Codigo postal (recibido)
    weather: string; // Estado del clima
    temp?: number; // Temperatura 
};

// Ruta dinamica donde se retorna datos meteorologicos segun el codigo postal
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<NextApiResponse<WeatherDetailType> | void> {
    const { zipcode } = req.query;

    // Comprobar que el codigo postal es valido
    if (!zipcode || typeof zipcode !== "string") {
        return res.status(400).json({ error: "El formato del codigo postal es invalido" });
    }

    if (zipcode.length !== 5 || isNaN(Number(zipcode))) {
        // Crear una validacion de que el codigo postal debe ser de 5 digitos numericos
        return res.status(422).json({
            error: "El codigo postal debe ser un numero de 5 digitos",
        });
    }

    return res.status(200).json({
        zipcode,
        weather: "sunny",
        temp: 35, 
    });
}
*/
// Parte 4
import type { NextApiRequest, NextApiResponse } from "next";

type WeatherDetailType = {
    zipcode: string; // Codigo postal (recibido)
    weather: string; // Estado del clima
    temp: number; // Temperatura
    unit: string; // Unidad de temperatura (Celsius o Fahrenheit)
};

// Ruta dinamica donde se retornan datos meteorologicos según el codigo postal
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<NextApiResponse<WeatherDetailType> | void> {
    const { zipcode, tempUnit } = req.query;

    // Comprobar que el código postal es valido
    if (!zipcode || typeof zipcode !== "string") {
        return res.status(400).json({
            error: "El formato del codigo postal es invalido",
        });
    }

    if (zipcode.length !== 5 || isNaN(Number(zipcode))) {
        return res.status(422).json({
            error: "El código postal debe ser un número de 5 dígitos",
        });
    }

    // Determinar la temperatura y su unidad
    let temperature = 35; // Valor base en Celsius
    let unit = "Celsius";

    if (tempUnit === "imperial") {
        temperature = Math.round((temperature * 9) / 5 + 32); // Convertimos a Fahrenheit
        unit = "Fahrenheit";
    } else if (tempUnit === "metric" || !tempUnit) {
        unit = "Celsius"; // Usar Celsius como estandar
    } else {
        // Validar tempUnit si es invalido
        return res.status(400).json({
            error: "La unidad de temperatura no es valida. Use 'metric' o 'imperial'",
        });
    }

    return res.status(200).json({
        zipcode,
        weather: "sunny",
        temp: temperature,
        unit,
    });
}


