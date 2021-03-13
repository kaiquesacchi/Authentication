import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    password: String
  }

  type Query {
    getUser(id: String!): User!
    getUsers: [User]
  }
`;
