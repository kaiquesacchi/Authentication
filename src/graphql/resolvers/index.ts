import { signIn, signUp } from "./Auth";
import { getMe, getUser, getUsers } from "./Users";

export const resolvers = {
  Query: {
    getMe,
    getUser,
    getUsers,
  },
  Mutation: {
    signIn,
    signUp,
  },
};
