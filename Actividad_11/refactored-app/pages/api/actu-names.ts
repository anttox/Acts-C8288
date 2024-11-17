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
        const response = await fetch(url); // Solicitud a la API externa

        // Se valida si la respuesta de la API es exitosa
        if (!response.ok) {
            if (response.status === 404) {
                // Error 404: API no encontrada
                return res.status(404).json({ error: "La API no fue encontrada" });
            }
            // Error de conexion
            return res.status(502).json({ error: "Error al conectar con la API" });
        }

        data = (await response.json()) as responseItemType[];
    } catch (err) {
        // Manejo de errores internos, devolvemos un error 500
        return res.status(500).json({ error: "Error interno del servidor" });
    }

    // Mapeo de datos para seleccionar las propiedades necesarias
    const names = data.map((item) => {
        return { id: item.id, name: item.name }; 
    });

    // Devolvemos los datos mapeados como respuesta con un codigo 200
    return res.status(200).json(names);
}
