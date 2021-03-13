import users from "./users.json";

interface iGetUser {
  id: string;
}

async function getUser(_: any, args: iGetUser) {
  return users.filter((user) => user.id.toString() === args.id);
}

async function getUsers() {
  return users;
}

export const resolvers = {
  Query: {
    getUser: getUser,
    getUsers: getUsers,
  },
};
