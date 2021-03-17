import prisma from "../../../../lib/prisma";

interface iGetUser {
  id: string;
}
export async function getUser(_: any, args: iGetUser) {
  return await prisma.users.findUnique({
    where: {
      id: Number(args.id) || -1,
    },
  });
}

export async function getUsers() {
  return await prisma.users.findMany();
}
