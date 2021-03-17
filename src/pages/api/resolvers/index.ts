import { signIn, signUp } from "./Auth";
import { getUser, getUsers } from "./Users";

export const resolvers = {
  Query: {
    getUser,
    getUsers,
    signIn,
  },
  Mutation: {
    signUp,
  },
};
