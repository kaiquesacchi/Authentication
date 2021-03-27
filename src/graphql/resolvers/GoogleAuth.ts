import bcrypt from "bcrypt";

import { AuthenticationError, UserInputError } from "apollo-server-errors";
import { iApolloContext } from "../../pages/api/graphql";

import prisma from "../../../lib/prisma";

import { validateEmail, validateName } from "../utils/validators";
import { verifyIDToken } from "../utils/googleAuth";
import { setAuthCookie } from "../utils/authCookie";

interface iSignInWithGoogle {
  googleIDToken: string;
}

export async function signInWithGoogle(_: any, { googleIDToken }: iSignInWithGoogle, context: iApolloContext) {
  if (!googleIDToken) throw new AuthenticationError("Google IDToken was not provided");
  const payload = await verifyIDToken(googleIDToken);

  // Extracts useful information from the token. The googleID is an unique user identifier, and can be used as a
  // password.
  const { name, email, sub: googleID } = payload;

  // Validate all fields
  if (!name || !email) throw new AuthenticationError("Missing name or email");
  if (!googleID) throw new AuthenticationError("Failed to identify Google ID");
  validateName(name);
  validateEmail(email);

  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  /* ---------------------------------------------- User already exists --------------------------------------------- */
  if (user) {
    // Verifies if its the same unique Google ID.
    if (!user.googleID || !bcrypt.compareSync(googleID, user.googleID)) {
      throw new AuthenticationError("Wrong Google Account");
    }

    setAuthCookie(user.id, context);
    return user;
  }
  /* --------------------------------------------------- New user --------------------------------------------------- */
  const hashedGoogleID = await bcrypt.hash(googleID, 10);
  try {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        googleID: hashedGoogleID,
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
