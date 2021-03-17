import prisma from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import { iApolloContext } from "../../pages/api/graphql";

interface iSignIn {
  email: string;
  password: string;
}
export async function signIn(_: any, { email, password }: iSignIn, context: iApolloContext) {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  // TODO: Will be hashed later.
  if (user?.password !== password) {
    return null;
  }
  let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
  context.cookies.set("auth-token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1 * 60 * 60 * 1000, // 12 Hour.
    secure: process.env.NODE_ENV === "production",
  });
  return user;
}

interface iSignUp extends iSignIn {
  name: string;
}
export async function signUp(_: any, { name, email, password }: iSignUp) {
  // TODO: Implement SignUp function.
  return null;
}
