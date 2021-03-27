import { OAuth2Client } from "google-auth-library";
import { ApolloError, AuthenticationError } from "apollo-server-errors";

/**
 * Verifies if the 'id_token' supposedly provided by Google OAuth is real
 *
 * Based on https://developers.google.com/identity/sign-in/web/backend-auth
 * @param googleIDToken 'id_token' provided by the Google OAuth success response
 * @throws ApolloError if the googleOAuthClientID cannot be found in env
 * @throws AuthenticationError if the 'id_token' cannot be verified
 * @returns TokenPayload
 */
export async function verifyIDToken(googleIDToken: string) {
  // Gets the clientID from env.
  const googleOAuthClientID = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;
  if (!googleOAuthClientID) throw new ApolloError("Google OAuth ClientID - Bad configuration");

  const client = new OAuth2Client(googleOAuthClientID);
  const ticket = await client.verifyIdToken({
    idToken: googleIDToken,
    audience: googleOAuthClientID,
  });
  const payload = ticket.getPayload();
  if (!payload) throw new AuthenticationError("Could not authenticate");

  return payload;
}
