import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    password: String
  }

  type Query {
    getMe: User!
    getUser(id: String!): User!
    getUsers: [User]
  }

  type Mutation {
    signIn(email: String!, password: String!): User!
    signUp(name: String!, email: String!, password: String!): User!
  }
`;
