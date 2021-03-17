import { ApolloServer } from "apollo-server-micro";
import jwt from "jsonwebtoken";
import Cookies from "cookies";

import { typeDefs } from "../../graphql/schemas";
import { resolvers } from "../../graphql/resolvers";

const verifyToken = (token: string | undefined) => {
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  } catch {
    return null;
  }
};

export interface iApolloContext {
  cookies: Cookies;
  user: { id: string } | null;
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }): iApolloContext => {
    const cookies = new Cookies(req, res);
    const token = cookies.get("auth-token");
    const user = verifyToken(token);
    return {
      cookies,
      user,
    };
  },
});

// Lets the Apollo Server handle the parsing.
export const config = {
  api: {
    bodyParser: false,
  },
};

// Points the Apollo server to the endpoint.
export default apolloServer.createHandler({ path: "/api/graphql" });
