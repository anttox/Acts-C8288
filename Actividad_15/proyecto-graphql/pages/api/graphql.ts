import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { resolvers } from "../../graphql/resolvers";
import { typeDefs } from "../../graphql/schema";
import dbConnect from "../../middleware/db-connect";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

const allowCors = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  const allowedOrigins = ["http://localhost:3000", "https://tu-dominio.com"];
  const origin = req.headers.origin;

  if (origin && !allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", "null");
  } else {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  }

  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  return await fn(req, res);
};

const connectDB = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  return await fn(req, res);
};

export default connectDB(allowCors(handler));
