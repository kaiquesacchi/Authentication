import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  query($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export interface iSignIn {
  signIn: {
    id: number;
    name: string;
    email: string;
  };
}
