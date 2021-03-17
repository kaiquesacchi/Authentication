import prisma from "../../../../lib/prisma";

interface iSignIn {
  email: string;
  password: string;
}
export async function signIn(_: any, { email, password }: iSignIn) {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  // TODO: Will be hashed later.
  if (user?.password !== password) {
    return null;
  }

  // TODO: Set cookie.
  return user;
}

interface iSignUp extends iSignIn {
  name: string;
}
export async function signUp(_: any, { name, email, password }: iSignUp) {
  // TODO: Implement SignUp function.
  return null;
}
