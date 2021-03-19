import { UserInputError } from "apollo-server-errors";
import prisma from "../../../lib/prisma";
import { iApolloContext } from "../../pages/api/graphql";
import { checkAuth } from "../utils";

interface iGetUser {
  id: string;
}
export async function getUser(_: any, args: iGetUser, context: iApolloContext) {
  checkAuth(context);
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
  checkAuth(context);
  return await prisma.users.findMany();
}

export async function getMe(_parent: any, _args: any, context: iApolloContext) {
  const id = checkAuth(context);

  return await prisma.users.findUnique({
    where: {
      id: Number(id),
    },
  });
}
