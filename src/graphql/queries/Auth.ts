import { gql } from "@apollo/client";

export const MUTATION_SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
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

export const MUTATION_SIGN_UP = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export interface iSignUp {
  signUp: {
    id: number;
    name: string;
    email: string;
  };
}

export const MUTATION_SIGN_OUT = gql`
  mutation {
    signOut
  }
`;
