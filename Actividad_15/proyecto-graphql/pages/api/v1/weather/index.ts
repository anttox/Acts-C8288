import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    return res.status(400).json({ error: "Invalid zipcode parameter" });
}
