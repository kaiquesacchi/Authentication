import prisma from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import { iApolloContext } from "../../pages/api/graphql";
import { AuthenticationError, UserInputError } from "apollo-server-errors";
import { validateEmail, validateName, validatePassword } from "../utils";
import bcrypt from "bcrypt";

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

  if (!user?.password || !bcrypt.compareSync(password, user.password)) {
    throw new AuthenticationError("Wrong username or password");
  }

  let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
  context.cookies.set("auth-token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1 * 60 * 60 * 1000, // 1 Hour.
    secure: process.env.NODE_ENV === "production",
  });
  return user;
}

interface iSignUp extends iSignIn {
  name: string;
}
export async function signUp(_: any, { name, email, password }: iSignUp, context: iApolloContext) {
  validateName(name);
  validateEmail(email);
  validatePassword(password);

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
    context.cookies.set("auth-token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1 * 60 * 60 * 1000, // 1 Hour.
      secure: process.env.NODE_ENV === "production",
    });
    return user;
  } catch (e) {
    if (e.code === "P2002") throw new UserInputError("Email already registered");
    throw e;
  }
}

export async function signOut(_parent: any, _args: any, context: iApolloContext) {
  context.cookies.set("auth-token", "", {
    httpOnly: true,
    sameSite: "lax",
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
  });
  return true;
}
