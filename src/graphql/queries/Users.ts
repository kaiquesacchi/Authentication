import { gql } from "@apollo/client";

export const GET_ME = gql`
  query {
    getMe {
      name
      email
    }
  }
`;

export interface iGetMe {
  getMe: {
    name: string;
    email: string;
  };
}
