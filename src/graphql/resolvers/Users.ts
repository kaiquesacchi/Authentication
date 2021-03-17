import prisma from "../../../lib/prisma";
import { iApolloContext } from "../../pages/api/graphql";

interface iGetUser {
  id: string;
}
export async function getUser(_: any, args: iGetUser, context: iApolloContext) {
  if (!context.user?.id) return null;
  return await prisma.users.findUnique({
    where: {
      id: Number(args.id) || -1,
    },
  });
}

export async function getUsers(_parent: any, _args: any, context: iApolloContext) {
  if (!context.user?.id) return null;
  return await prisma.users.findMany();
}
