import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import resolvers from "../../graphql/resolvers";
import { typeDefs } from "../../graphql/schema";
import { authMiddleware } from "../../graphql/authMiddleware";
import { NextApiRequest, NextApiResponse } from "next";

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

export default startServerAndCreateNextHandler(server, {
    context: async (req: NextApiRequest, res: NextApiResponse) => {
        authMiddleware(req, res, () => {});
        return {}; // Agrega más datos al contexto si es necesario
    },
});
