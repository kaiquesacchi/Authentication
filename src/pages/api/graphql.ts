import { ApolloServer } from "apollo-server-micro";

import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";

const apolloServer = new ApolloServer({ typeDefs, resolvers });

// Lets the Apollo Server handle the parsing.
export const config = {
  api: {
    bodyParser: false,
  },
};

// Points the Apollo server to the endpoint.
export default apolloServer.createHandler({ path: "/api/graphql" });
