import type { NextApiRequest, NextApiResponse } from "next";

type responseItemType = {
    id: string; // ID unico del usuario
    name: string; // Nombre del usuario
};

// Controlador 
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<NextApiResponse<responseItemType[]> | void> {
    const url = "https://www.usemodernfullstack.dev/api/v1/users";
    let data;

    try {
        const response = await fetch(url); // Solicitud a la API
        data = (await response.json()) as responseItemType[]; // Resuesta JSON
    } catch (err) {
        // Manejo de errores, devolvemos un error 500 si falla la solicitud
        return res.status(500);
    }

    // Mapeo de datos para seleccionar las propiedades necesarias
    const names = data.map((item) => {
        return { id: item.id, name: item.name }; 
    });

    // Devolvemos los datos mapeados como respuesta con un codigo 200
    return res.status(200).json(names);
}

