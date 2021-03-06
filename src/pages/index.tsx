// React/NextJS
import React, { useCallback, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";

// NPM Packages
import { toast } from "react-toastify";

// Apollo/Queries
import { useMutation, useQuery } from "@apollo/client";
import { APOLLO_STATE_PROP_NAME, initializeApollo } from "../../lib/apolloClient";
import { MUTATION_SIGN_OUT } from "../graphql/queries/Auth";
import { GET_ME, iGetMe } from "../graphql/queries/Users";

// Components
import Divider from "../components/Divider/Divider";
import FocusBlock from "../components/_focusBlocks/Base/Base";
import Form from "../components/Form/Form";
import Button from "../components/_inputs/Button/Button";
import PageLayout from "../components/PageLayout/PageLayout";

export default function Home() {
  const router = useRouter();
  const [signOut, { client }] = useMutation(MUTATION_SIGN_OUT);
  const { data, error } = useQuery<iGetMe>(GET_ME);

  const handleSignOut = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        await signOut();
        await client.clearStore();
        router.push("/auth/signIn");
        toast.dark("Signed out Successfully");
      } catch {
        toast.error("Failed to Sign Out");
      }
    },
    [signOut, router, client]
  );

  useEffect(() => {
    if (!error || error.graphQLErrors.length === 0) return;
    if (error.graphQLErrors.some((e) => e.extensions?.code === "UNAUTHENTICATED")) {
      router.push("/auth/signIn");
    }
  }, [error]);
  return (
    <PageLayout>
      <FocusBlock center title="Auth Succeeded">
        <Form>
          <p>
            <strong>Name:</strong> {data?.getMe?.name}
          </p>
          <p>
            <strong>Email:</strong> {data?.getMe?.email}
          </p>
          <Divider />
          <Button accent="primary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Form>
      </FocusBlock>
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const apolloClient = initializeApollo(null, req.headers);
  try {
    await apolloClient.query<iGetMe>({
      query: GET_ME,
    });
  } catch {}
  return {
    props: { [APOLLO_STATE_PROP_NAME]: apolloClient.cache.extract() },
  };
};
