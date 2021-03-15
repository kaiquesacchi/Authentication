import prisma from "../../../../lib/prisma";
import users from "./users.json";

interface iGetUser {
  id: string;
}
async function getUser(_: any, args: iGetUser) {
  return await prisma.users.findUnique({
    where: {
      id: Number(args.id) || -1,
    },
  });
}

async function getUsers() {
  return await prisma.users.findMany();
}

export const resolvers = {
  Query: {
    getUser: getUser,
    getUsers: getUsers,
  },
};
