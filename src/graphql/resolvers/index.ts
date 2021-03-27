import { signIn, signUp, signOut } from "./Auth";
import { getMe, getUser, getUsers } from "./Users";
import { signInWithGoogle } from "./GoogleAuth";

export const resolvers = {
  Query: {
    getMe,
    getUser,
    getUsers,
  },
  Mutation: {
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  },
};
