import { UserInputError } from "apollo-server-errors";
import prisma from "../../../lib/prisma";
import { iApolloContext } from "../../pages/api/graphql";
import { isAuthenticated } from "../utils/authCookie";

interface iGetUser {
  id: string;
}
export async function getUser(_: any, args: iGetUser, context: iApolloContext) {
  isAuthenticated(context);
  const id = Number(args.id);
  if (isNaN(id)) throw new UserInputError("ID string must represent an Integer");
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  });
  if (!user) throw new UserInputError("User not found.");
  return user;
}

export async function getUsers(_parent: any, _args: any, context: iApolloContext) {
  isAuthenticated(context);
  return await prisma.users.findMany();
}

export async function getMe(_parent: any, _args: any, context: iApolloContext) {
  const id = isAuthenticated(context);

  return await prisma.users.findUnique({
    where: {
      id: Number(id),
    },
  });
}
