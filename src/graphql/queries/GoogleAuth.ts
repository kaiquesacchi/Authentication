import { gql } from "@apollo/client";

export const MUTATION_SIGN_IN_WITH_GOOGLE = gql`
  mutation($googleIDToken: String!) {
    signInWithGoogle(googleIDToken: $googleIDToken) {
      id
      name
      email
    }
  }
`;

export interface iSignInWithGoogle {
  signInWithGoogle: {
    id: number;
    name: string;
    email: string;
  };
}
