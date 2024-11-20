import { NextApiRequest, NextApiResponse } from "next";

export const authMiddleware = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== "Bearer HolaMundo") {
        res.status(401).json({ error: "No autorizado. Token inválido o ausente." });
        return;
    }
    next();
};
