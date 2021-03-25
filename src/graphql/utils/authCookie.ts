import jwt from "jsonwebtoken";
import { iApolloContext } from "../../pages/api/graphql";
import { AuthenticationError } from "apollo-server-errors";

/**
 * Generates an Auth Token and sets it as a cookie through the context
 *
 * @param userID User's database index
 * @param context Apollo context
 *
 * @modifies context Sets authCookie to the Apollo Context
 */
export function setAuthCookie(userID: number, context: iApolloContext) {
  let token = jwt.sign({ id: userID }, process.env.JWT_SECRET!);
  context.cookies.set("auth-token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1 * 60 * 60 * 1000, // 1 Hour.
    secure: process.env.NODE_ENV === "production",
  });
}

export function removeAuthCookie(context: iApolloContext) {
  context.cookies.set("auth-token", "", {
    httpOnly: true,
    sameSite: "lax",
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
  });
}

/**
 * Checks if the user is Authenticated by searching for its ID on the context
 *
 * After receiving every request, the Apollo server will search for an 'auth-token' cookie.
 * If found, the user id will be retrieved from the token and added to the context.
 * This function only checks if the token has been found by the server (and added to the context object).
 *
 * @param context Apollo Request Context
 * @returns User ID if the user is authenticated
 * @throws AuthenticationError if user is not authenticated
 */
export function isAuthenticated(context: iApolloContext) {
  if (context.user?.id) return context.user?.id;
  throw new AuthenticationError("User is not authenticated");
}
