import bcrypt from "bcrypt";

import { iApolloContext } from "../../pages/api/graphql";
import { AuthenticationError, UserInputError } from "apollo-server-errors";

import prisma from "../../../lib/prisma";

import { removeAuthCookie, setAuthCookie } from "../utils/authCookie";
import { validateEmail, validateName, validatePassword } from "../utils/validators";

/* ------------------------------------------------------------------------------------------------------------------ */
/*                                                       Sign In                                                      */
/* ------------------------------------------------------------------------------------------------------------------ */

interface iSignIn {
  email: string;
  password: string;
}
export async function signIn(_: any, { email, password }: iSignIn, context: iApolloContext) {
  // Gets user database entry by email.
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  // Verifies the password.
  if (!user?.password || !bcrypt.compareSync(password, user.password)) {
    throw new AuthenticationError("Wrong username or password");
  }

  // SignIn authorized.
  setAuthCookie(user.id, context);
  return user;
}

/* ------------------------------------------------------------------------------------------------------------------ */
/*                                                       Sign Up                                                      */
/* ------------------------------------------------------------------------------------------------------------------ */

interface iSignUp extends iSignIn {
  name: string;
}
export async function signUp(_: any, { name, email, password }: iSignUp, context: iApolloContext) {
  // Validates all fields before attempting to save on the database.
  validateName(name);
  validateEmail(email);
  validatePassword(password);

  // The password must be hashed before being sent to the database.
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    setAuthCookie(user.id, context);
    return user;
  } catch (e) {
    switch (e.code) {
      case "P2002":
        throw new UserInputError("Email already registered");
      default:
        throw e;
    }
  }
}

/* ------------------------------------------------------------------------------------------------------------------ */
/*                                                      Sign Out                                                      */
/* ------------------------------------------------------------------------------------------------------------------ */

export async function signOut(_parent: any, _args: any, context: iApolloContext) {
  removeAuthCookie(context);
  return true;
}
