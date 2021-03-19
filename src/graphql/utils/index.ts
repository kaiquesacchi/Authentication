import { AuthenticationError } from "apollo-server-errors";
import { iApolloContext } from "../../pages/api/graphql";

/**
 * Checks if the user is Authenticated by searching for its ID
 *
 * @param context Apollo Request Context
 * @returns UserID if user is authenticated
 * @throws AuthenticationError if user is not authenticated
 */
export function checkAuth(context: iApolloContext) {
  if (context.user?.id) return context.user?.id;
  throw new AuthenticationError("User is not authenticated");
}
