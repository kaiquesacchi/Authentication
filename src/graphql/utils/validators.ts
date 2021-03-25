import { UserInputError } from "apollo-server-errors";

/**
 *  Checks if an user name would be accepted by the database.
 *
 * @param name User full name
 * @throws UserInputError if name is not a string or has less than 1 or more than 255 chars
 */
export function validateName(name: string) {
  if (typeof name !== "string") throw new UserInputError("'name' must be a string");
  if (name.length > 255 || name.length < 1)
    throw new UserInputError("'name' must have more than 0 and less than 256 characters");
}

/**
 *  Checks if an email would be accepted by the database.
 *
 * @param email User email
 * @throws UserInputError if email is not a string, has more than 255 chars or is an invalid email
 */
export function validateEmail(email: string) {
  if (typeof email !== "string") throw new UserInputError("'email' must be a string");
  if (email.length > 255) throw new UserInputError("'email' must have less than 256 characters");
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(email).toLowerCase())) throw new UserInputError("Invalid email");
}

/**
 *  Checks if a password would be accepted by the hash function.
 *
 * @param email User password
 * @throws UserInputError if password is not a string or is empty
 */
export function validatePassword(password: string) {
  if (typeof password !== "string") throw new UserInputError("'password' must be a string");
  if (password.length < 1) throw new UserInputError("'password' must have more than 0 characters");
}
